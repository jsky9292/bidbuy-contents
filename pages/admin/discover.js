// pages/admin/discover.js
// ?�상 검??�??�택 ?�이지 (개선??UI)

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Discover() {
  const [searchMode, setSearchMode] = useState('keyword'); // 'keyword', 'youtube', or 'web'
  const [keyword, setKeyword] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [minViews, setMinViews] = useState(10000);
  const [maxResults, setMaxResults] = useState(20);
  const [periodDays, setPeriodDays] = useState(30);
  const [videoDuration, setVideoDuration] = useState('any'); // 'short', 'long', 'any'
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // 최근 검??기록 로드
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history.slice(0, 5));
  }, []);

  const saveSearchHistory = (kw) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [kw, ...history.filter(h => h !== kw)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory.slice(0, 5));
  };

  // YouTube URL에서 video ID 추출 (모든 형식 지원: Shorts, 일반, 모바일 등)
  const extractVideoId = (url) => {
    const cleanUrl = url.trim();
    // 이미 video ID만 입력한 경우 (11자리)
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
      return cleanUrl;
    }
    const patterns = [
      // Shorts URL - https://www.youtube.com/shorts/gCTd6Q0jX8w
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      // 일반 watch URL
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
      // 짧은 URL
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      // embed/v/live URL
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
      // 모바일 URL
      /m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchMode === 'youtube') {
      // YouTube URL 모드: 바로 글 ?�성
      handleDirectGenerate();
    } else if (searchMode === 'web') {
      // ?�사?�트/블로�?URL 모드: ???�크?�핑 ??글 ?�성
      handleWebUrlGenerate();
    } else {
      // ?�워??모드: 기존 검??      setLoading(true);
      setError('');
      setVideos([]);

      try {
        const response = await fetch('/api/search-videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword,
            minViews: parseInt(minViews),
            maxResults: parseInt(maxResults),
            periodDays: parseInt(periodDays),
            videoDuration // ?�츠/롱폼/?�체 ?�택
          }),
        });

        const data = await response.json();

        if (data.success) {
          setVideos(data.videos);
          if (data.videos.length === 0) {
            setError('검??결과가 ?�습?�다. 조회???�터�???��거나 ?�른 ?�워?��? ?�도?�보?�요.');
          } else {
            saveSearchHistory(keyword);
          }
        } else {
          setError(data.error || '검??�??�류가 발생?�습?�다');
        }
      } catch (err) {
        setError('검??�??�류가 발생?�습?�다: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWebUrlGenerate = async () => {
    if (!webUrl.trim()) {
      setError('?�사?�트 URL???�력?�주?�요.');
      return;
    }

    if (!confirm(`?�️ ?�?�권 ?�인\n\n???�사?�트???�용??참고?�여 ?�전???�로??글�??�작?�합?�다.\n?�본??복사?��? ?�고 AI가 ?�롭�??�성?�니??\n\n계속?�시겠습?�까?`)) {
      return;
    }

    setLoading(true);
    setError('');
    setProgressStatus('?�� ?�페?��? 분석 �?..');

    try {
      // 1. ??URL 분석 �?콘텐�??�성
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: webUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setProgressStatus('?�� 블로�??�??�?..');

        // 2. ?�성??콘텐츠�? ?�스?�로 ?�??        const saveResponse = await fetch('/api/save-web-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.data.title,
            content: data.data.content,
            meta_description: data.data.meta_description,
            keywords: data.data.keywords,
            category: data.data.category,
            thumbnail_url: data.data.thumbnail_url,
            thumbnail_prompt: data.data.thumbnail_prompt,
            image_prompts: data.data.image_prompts,
            source_url: data.data.source.url,
            source_note: data.data.source.note
          }),
        });

        const saveData = await saveResponse.json();

        if (saveData.success) {
          alert(`??블로�?글 ?�성 ?�료!\n\n?�목: ${data.data.title}\n카테고리: ${data.data.category}\n\n?�️ ${data.copyrightNotice}\n\n관리자 ?�?�보?�에???�인?�고 검?�하?�요.`);
          window.location.href = '/admin/dashboard';
        } else {
          setError(saveData.error || '글 ?�??�??�류가 발생?�습?�다');
        }
      } else {
        setError(data.error || '?�페?��? 분석 ?�패');
      }
    } catch (error) {
      setError('?�류 발생: ' + error.message);
    } finally {
      setLoading(false);
      setProgressStatus('');
    }
  };

  const handleDirectGenerate = async () => {
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      setError('?�바�?YouTube URL???�력?�주?�요. (?? https://youtube.com/watch?v=VIDEO_ID)');
      return;
    }

    const categoryLabel = categories.find(c => c.value === selectedCategory)?.label || selectedCategory;
    if (!confirm(`???�상?�로 블로�?글???�성?�시겠습?�까?\n\n?�상 ID: ${videoId}\n카테고리: ${categoryLabel}`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId, category: selectedCategory }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`??블로�?글 ?�성 ?�료!\n\n?�목: ${data.post.title}\n\n관리자 ?�?�보?�에???�인?�고 검?�하?�요.`);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.error || '글 ?�성 �??�류가 발생?�습?�다');
      }
    } catch (error) {
      setError('?�류 발생: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const [generating, setGenerating] = useState(null);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [currentScript, setCurrentScript] = useState('');
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');
  const [loadingScript, setLoadingScript] = useState(false);

  // ?��?지 ?�정 ?�태
  const [imageCount, setImageCount] = useState(3);
  const [thumbnailPromptInput, setThumbnailPromptInput] = useState('');
  const [imagePrompts, setImagePrompts] = useState(['', '', '', '', '']);

  // 카테고리 ?�택 ?�태
  const [selectedCategory, setSelectedCategory] = useState('travel');
  const categories = [
    { value: 'travel', label: '?�� ?�본?�행' },
    { value: 'food', label: '?�� ?�본?�식/맛집' },
    { value: 'shopping', label: '?�� ?�핑/구매?�?? },
    { value: 'culture', label: '?�� ?�본문화' },
    { value: 'living', label: '?�� ?�본?�활' },
    { value: 'news', label: '?�� ?�본?�스/?�렌?? },
  ];

  // ?�성 진행 ?�태 모달
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [scriptSummary, setScriptSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  // ?�크립트 보기 ?�들??  const handleViewScript = async (videoId, videoTitle) => {
    setCurrentVideoId(videoId);
    setCurrentVideoTitle(videoTitle);
    setShowScriptModal(true);
    setLoadingScript(true);
    setCurrentScript('');
    setScriptSummary('');
    // ?��?지 ?�정 초기??    setThumbnailPromptInput('');
    setImagePrompts(['', '', '', '', '']);
    setImageCount(3);
    setSelectedCategory('travel');

    try {
      const response = await fetch('/api/get-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
      });

      const data = await response.json();

      if (data.success && data.transcript) {
        setCurrentScript(data.transcript);
      } else {
        // ?�막 ?�으�??�상 ?�보�??��?        const videoInfoResponse = await fetch('/api/get-video-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId })
        });

        const videoData = await videoInfoResponse.json();

        if (videoData.success) {
          setCurrentScript(`[?�막 ?�음 - ?�상 ?�명?�로 ?��?\n\n${videoData.description || '?�상 ?�명???�습?�다.'}`);
        } else {
          setCurrentScript('?�막??가?�올 ???�습?�다. ???�상?� ?�막???�거???�막 추출??불�??�합?�다.');
        }
      }
    } catch (error) {
      setCurrentScript('?�크립트 로드 �??�류가 발생?�습?�다: ' + error.message);
    } finally {
      setLoadingScript(false);
    }
  };

  // ?�크립트 ?�약 ?�들??  const handleSummarizeScript = async () => {
    setSummarizing(true);
    try {
      const response = await fetch('/api/summarize-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: currentScript,
          videoTitle: currentVideoTitle
        })
      });

      const data = await response.json();

      if (data.success) {
        setScriptSummary(data.summary);
      } else {
        alert('?�약 ?�성 ?�패: ' + data.message);
      }
    } catch (error) {
      alert('?�약 �??�류가 발생?�습?�다: ' + error.message);
    } finally {
      setSummarizing(false);
    }
  };

  // 모달?�서 글 ?�성 (?��?지 ?�롬?�트 ?�함)
  const handleGenerateFromModal = async () => {
    if (!currentVideoId) return;

    setShowScriptModal(false);
    setShowProgressModal(true);
    setProgressStatus('?�� 블로�?글 ?�성 �?..');
    setGenerating(currentVideoId);

    try {
      const validImagePrompts = imagePrompts.slice(0, imageCount).filter(p => p.trim());

      setProgressStatus('?�� ?�상 ?�보 분석 �?..');

      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: currentVideoId,
          thumbnailPrompt: thumbnailPromptInput || undefined,
          imagePrompts: validImagePrompts.length > 0 ? validImagePrompts : undefined,
          imageCount: imageCount,
          category: selectedCategory
        }),
      });

      setProgressStatus('??최종 처리 �?..');
      const data = await response.json();

      if (data.success) {
        setProgressStatus('???�료!');
        setTimeout(() => {
          setShowProgressModal(false);
          window.location.href = '/admin/dashboard';
        }, 1000);
      } else {
        setShowProgressModal(false);
        alert(`???�성 ?�패\n\n${data.error}`);
      }
    } catch (error) {
      setShowProgressModal(false);
      alert(`???�류 발생\n\n${error.message}`);
    } finally {
      setGenerating(null);
    }
  };

  const handleGeneratePost = async (videoId, videoTitle) => {
    // ?�크립트 모달 ?�기 (?��?지 ?�정 ?�함)
    handleViewScript(videoId, videoTitle);
  };

  // 기존 방식 (prompt�?직접 ?�력) - ???�상 ?�용 ?�함
  const handleGeneratePostLegacy = async (videoId, videoTitle) => {
    const thumbnailPrompt = prompt(
      `"${videoTitle}"\n\n블로�??�네???��?지�??�한 ?�롬?�트�??�력?�세??`,
      ''
    );

    if (thumbnailPrompt === null) return;

    setGenerating(videoId);

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          thumbnailPrompt: thumbnailPrompt || undefined
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`??블로�?글 ?�성 ?�료!\n\n?�목: ${data.post.title}\n\n관리자 ?�?�보?�에???�인?�고 검?�하?�요.`);
        // ?�?�보?�로 ?�동
        window.location.href = '/admin/dashboard';
      } else {
        alert(`???�성 ?�패\n\n${data.error}`);
      }
    } catch (error) {
      alert(`???�류 발생\n\n${error.message}`);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <Layout title="?�상 검??>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ?�더 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">?�� 콘텐�?검??/h1>
              <p className="text-gray-600 mt-1">?�워?�로 검?�하거나 YouTube URL???�력?�여 블로�?글???�성?�세??/p>
            </div>
            <Link href="/admin/dashboard">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors">
                ???�?�보??              </button>
            </Link>
          </div>

          {/* 검????*/}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* 검??모드 ?�택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  검??방법 ?�택
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchMode('keyword')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                      searchMode === 'keyword'
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ?�� ?�워??검??                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('youtube')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                      searchMode === 'youtube'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ?�� YouTube URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('web')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                      searchMode === 'web'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ?�� ?�사?�트/블로�?URL
                  </button>
                </div>
              </div>

              {/* ?�워??검??모드 */}
              {searchMode === 'keyword' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    검???�워??<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="?? ?�해?�정??비용, ?�동차보??�?��"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                    required
                  />

                  {/* 최근 검??*/}
                  {searchHistory.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">최근 검??</span>
                      {searchHistory.map((kw, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setKeyword(kw)}
                          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* YouTube URL 직접 ?�력 모드 */}
              {searchMode === 'youtube' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL ?�력 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="?? https://www.youtube.com/watch?v=VIDEO_ID"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      ?�� YouTube ?�상 URL???�력?�면 바로 블로�?글???�성?�니??                    </p>
                  </div>

                  {/* 카테고리 ?�택 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 ?�택
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            selectedCategory === cat.value
                              ? 'bg-red-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ?�사?�트/블로�?URL ?�력 모드 */}
              {searchMode === 'web' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ?�사?�트/블로�?URL ?�력 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={webUrl}
                    onChange={(e) => setWebUrl(e.target.value)}
                    placeholder="?? https://blog.naver.com/..., https://news.naver.com/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    required
                  />
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    ?�️ ?�?�권 준?? ?�본??복사?��? ?�고 AI가 ?�용??참고?�여 ?�전???�롭�??�작?�합?�다
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ?�� 지?? ?�이�?블로�? ?�이�??�스, ?�스?�리, ?�반 ?�사?�트
                  </p>
                </div>
              )}

              {/* ?�터 ?�정 (?�워??모드?�서�??�시) */}
              {searchMode === 'keyword' && (
                <>
                  {/* ?�상 길이 ?�택 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ?�상 길이 ?�택
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setVideoDuration('any')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                          videoDuration === 'any'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ?�� ?�체
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoDuration('short')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                          videoDuration === 'short'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ???�츠 (&lt; 4�?
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoDuration('long')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                          videoDuration === 'long'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ?�� 롱폼 (&gt; 20�?
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      ?�� ?�츠???�고리즘 ?��?�?받아 바이??가?�성???�습?�다
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        검??기간
                      </label>
                      <select
                        value={periodDays}
                        onChange={(e) => setPeriodDays(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="7">최근 7??/option>
                        <option value="30">최근 30??/option>
                        <option value="90">최근 90??/option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        최근 ?�상?�수�??�렌?�에 ?�합?�니??                      </p>
                    </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최소 조회??                    </label>
                    <select
                      value={minViews}
                      onChange={(e) => setMinViews(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="0">?�한 ?�음</option>
                      <option value="1000">1,000???�상</option>
                      <option value="5000">5,000???�상</option>
                      <option value="10000">10,000???�상</option>
                      <option value="50000">50,000???�상</option>
                      <option value="100000">100,000???�상</option>
                      <option value="500000">500,000???�상</option>
                      <option value="1000000">1,000,000???�상</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      조회?��? ?��? ?�상?�수�??�질??좋습?�다
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최�? 검??결과 ??                    </label>
                    <select
                      value={maxResults}
                      onChange={(e) => setMaxResults(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="10">10�?/option>
                      <option value="20">20�?/option>
                      <option value="30">30�?/option>
                      <option value="50">50�?(최�?)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      API ?�당???�약???�해 ?�절???��? ?�택?�세??                    </p>
                  </div>
                </div>
                </>
              )}

              {/* 검???�보 */}
              <div className={`border-l-4 p-4 rounded-r-lg ${
                searchMode === 'web' ? 'bg-yellow-50 border-yellow-400' :
                searchMode === 'youtube' ? 'bg-red-50 border-red-400' :
                'bg-teal-50 border-teal-400'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-xl">
                      {searchMode === 'web' ? '?�️' : '?�️'}
                    </span>
                  </div>
                  <div className="ml-3">
                    {searchMode === 'keyword' ? (
                      <p className="text-sm text-teal-700">
                        <strong>검??조건:</strong> ?�택??기간 ???�로?�된 ?�상??조회???�으�?검?�합?�다
                      </p>
                    ) : searchMode === 'youtube' ? (
                      <p className="text-sm text-red-700">
                        <strong>YouTube URL:</strong> ?�상 URL???�력?�면 ?�당 ?�상?�로 바로 블로�?글???�성?�니??                      </p>
                    ) : (
                      <p className="text-sm text-yellow-800">
                        <strong>?�?�권 ?�내:</strong> AI가 ?�본 콘텐츠�? 참고?�여 ?�전???�로??글�??�작?�합?�다. ?�본??복사?��? ?�으므�??�?�권 문제가 ?�습?�다. ?? 출처???�단???�기?�니??
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 검???�성 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white text-lg transition-colors ${
                  loading ? 'bg-gray-400 cursor-not-allowed' :
                  searchMode === 'web' ? 'bg-green-600 hover:bg-green-700' :
                  searchMode === 'youtube' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {searchMode === 'keyword' ? '검??�?..' :
                     searchMode === 'web' ? '??분석 �?글 ?�성 �?..' : '글 ?�성 �?..'}
                  </span>
                ) : (
                  searchMode === 'keyword' ? '?�� ?�상 검?? :
                  searchMode === 'web' ? '?�� ?�페?��? 분석 ??글 ?�성' :
                  '?�� YouTube ?�상?�로 글 ?�성'
                )}
              </button>
            </form>
          </div>

          {/* ?�러 메시지 */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-2xl">??/span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">검???�패</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* 검??결과 */}
          {videos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  검??결과 <span className="text-teal-600">({videos.length}�?</span>
                </h2>
                <p className="text-sm text-gray-500">
                  조회???�으�??�렬??                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <div key={video.video_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
                    {/* ?�위 배�? */}
                    {index < 3 && (
                      <div className="absolute mt-3 ml-3 z-10">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-300 text-gray-900' :
                          'bg-orange-400 text-orange-900'
                        }`}>
                          {index === 0 ? '?��' : index === 1 ? '?��' : '?��'} #{index + 1}
                        </span>
                      </div>
                    )}

                    {/* ?�네??*/}
                    <div className="relative">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <p className="text-white text-xs font-medium">
                          {new Date(video.published_at).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      {/* ?�목 */}
                      <h3 className="font-bold text-base mb-3 line-clamp-2 text-gray-900 h-12">
                        {video.title}
                      </h3>

                      {/* 메�? ?�보 */}
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="mr-2">?��</span>
                          {video.channel_name}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <span className="mr-1">?���?/span>
                            {video.view_count.toLocaleString()}
                          </span>
                          <span className="text-gray-600 flex items-center">
                            <span className="mr-1">?��</span>
                            {video.like_count.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* 바이??분석 결과 */}
                      <div className="flex-grow">
                      {video.viral_analysis && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-purple-700">?�� 바이??분석</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              video.viral_analysis.viral_score >= 80 ? 'bg-red-500 text-white' :
                              video.viral_analysis.viral_score >= 60 ? 'bg-orange-500 text-white' :
                              video.viral_analysis.viral_score >= 40 ? 'bg-yellow-500 text-gray-900' :
                              'bg-gray-400 text-white'
                            }`}>
                              {video.viral_analysis.viral_score}??                            </span>
                          </div>
                          <div className="text-xs text-purple-900 mb-2">
                            <strong>{video.viral_analysis.rating}</strong>
                          </div>
                          {video.viral_analysis.factors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {video.viral_analysis.factors.slice(0, 3).map((factor, idx) => (
                                <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      </div>

                      {/* ?�션 버튼 */}
                      <div className="flex gap-2 mt-auto">
                        <a
                          href={`https://youtube.com/watch?v=${video.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center text-sm"
                        >
                          ?�상 보기
                        </a>
                        <button
                          onClick={() => handleViewScript(video.video_id, video.title)}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
                        >
                          ?�크립트 보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 검??결과 ?�음 */}
          {!loading && videos.length === 0 && !error && keyword === '' && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
              <div className="text-6xl mb-4">?��</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">?�상??검?�해보세??/h3>
              <p className="text-gray-600">
                ?�워?��? ?�력?�고 검??버튼???�릭?�세??              </p>
            </div>
          )}
        </div>
      </div>

      {/* ?�크립트 모달 */}
      {showScriptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* 모달 ?�더 */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">?�� ?�상 ?�크립트</h2>
                <button
                  onClick={() => setShowScriptModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{currentVideoTitle}</p>
            </div>

            {/* 모달 본문 */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* ?�크립트 ?�션 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">?�� ?�상 ?�크립트</h3>
                  {!loadingScript && currentScript && (
                    <button
                      onClick={handleSummarizeScript}
                      disabled={summarizing}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg disabled:bg-gray-400"
                    >
                      {summarizing ? '?�약 �?..' : '?�� ?�간�??�약'}
                    </button>
                  )}
                </div>
                {loadingScript ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                    <p className="text-gray-600">?�크립트�?불러?�는 �?..</p>
                  </div>
                ) : (
                  <>
                    {scriptSummary && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">?�️ ?�간�??�약</h4>
                        <pre className="whitespace-pre-wrap text-sm text-yellow-900 leading-relaxed font-sans">
                          {scriptSummary}
                        </pre>
                      </div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-sans">
                        {currentScript}
                      </pre>
                    </div>
                  </>
                )}
              </div>

              {/* 카테고리 ?�택 ?�션 */}
              {!loadingScript && currentScript && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">?�� 카테고리 ?�택</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          selectedCategory === cat.value
                            ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ?��?지 ?�정 ?�션 */}
              {!loadingScript && currentScript && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">?���??��?지 ?�정</h3>

                  {/* ?�네???�롬?�트 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ?�네???��?지 ?�롬?�트
                    </label>
                    <input
                      type="text"
                      value={thumbnailPromptInput}
                      onChange={(e) => setThumbnailPromptInput(e.target.value)}
                      placeholder="?? 보험 ?�담?�는 ?�문가 ?��?지, 밝�? ?�피??배경"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">비워?�면 AI가 ?�동 ?�성?�니??/p>
                  </div>

                  {/* 본문 ?��?지 개수 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      본문 ?��?지 개수: {imageCount}??                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={imageCount}
                      onChange={(e) => setImageCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0??/span>
                      <span>5??/span>
                    </div>
                  </div>

                  {/* 본문 ?��?지 ?�롬?�트??*/}
                  {imageCount > 0 && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        본문 ?��?지 ?�롬?�트 (?�택)
                      </label>
                      {[...Array(imageCount)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 w-16">?��?지 {idx + 1}</span>
                          <input
                            type="text"
                            value={imagePrompts[idx] || ''}
                            onChange={(e) => {
                              const newPrompts = [...imagePrompts];
                              newPrompts[idx] = e.target.value;
                              setImagePrompts(newPrompts);
                            }}
                            placeholder={`본문 ${idx + 1}번째 ?��?지 ?�롬?�트`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-gray-500">비워?�면 AI가 글 ?�용??맞게 ?�동 ?�성?�니??/p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 모달 ?�터 */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowScriptModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  ?�기
                </button>
                <button
                  onClick={handleGenerateFromModal}
                  disabled={loadingScript || !currentScript || generating}
                  className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                    loadingScript || !currentScript || generating
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {generating ? '?�성 �?..' : `글 ?�성 (?��?지 ${imageCount}??`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ?�성 진행 ?�태 모달 */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">블로�?글 ?�성 �?/h3>
            <p className="text-lg text-teal-600 font-medium mb-4">{progressStatus}</p>
            <p className="text-sm text-gray-500">?�시�?기다?�주?�요...</p>
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <p className="text-xs text-gray-600">
                ?�� 글 ?�성 ???���??��?지 ?�성 ???�� ?�??              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

