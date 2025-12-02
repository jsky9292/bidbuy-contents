// pages/admin/discover.js
// ?ìƒ ê²€??ë°?? íƒ ?˜ì´ì§€ (ê°œì„ ??UI)

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

  // ìµœê·¼ ê²€??ê¸°ë¡ ë¡œë“œ
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

  // YouTube URL?ì„œ video ID ì¶”ì¶œ
  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchMode === 'youtube') {
      // YouTube URL ëª¨ë“œ: ë°”ë¡œ ê¸€ ?ì„±
      handleDirectGenerate();
    } else if (searchMode === 'web') {
      // ?¹ì‚¬?´íŠ¸/ë¸”ë¡œê·?URL ëª¨ë“œ: ???¤í¬?˜í•‘ ??ê¸€ ?ì„±
      handleWebUrlGenerate();
    } else {
      // ?¤ì›Œ??ëª¨ë“œ: ê¸°ì¡´ ê²€??      setLoading(true);
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
            videoDuration // ?ì¸ /ë¡±í¼/?„ì²´ ? íƒ
          }),
        });

        const data = await response.json();

        if (data.success) {
          setVideos(data.videos);
          if (data.videos.length === 0) {
            setError('ê²€??ê²°ê³¼ê°€ ?†ìŠµ?ˆë‹¤. ì¡°íšŒ???„í„°ë¥???¶”ê±°ë‚˜ ?¤ë¥¸ ?¤ì›Œ?œë? ?œë„?´ë³´?¸ìš”.');
          } else {
            saveSearchHistory(keyword);
          }
        } else {
          setError(data.error || 'ê²€??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤');
        }
      } catch (err) {
        setError('ê²€??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWebUrlGenerate = async () => {
    if (!webUrl.trim()) {
      setError('?¹ì‚¬?´íŠ¸ URL???…ë ¥?´ì£¼?¸ìš”.');
      return;
    }

    if (!confirm(`? ï¸ ?€?‘ê¶Œ ?•ì¸\n\n???¹ì‚¬?´íŠ¸???´ìš©??ì°¸ê³ ?˜ì—¬ ?„ì „???ˆë¡œ??ê¸€ë¡??¬ì‘?±í•©?ˆë‹¤.\n?ë³¸??ë³µì‚¬?˜ì? ?Šê³  AIê°€ ?ˆë¡­ê²??‘ì„±?©ë‹ˆ??\n\nê³„ì†?˜ì‹œê² ìŠµ?ˆê¹Œ?`)) {
      return;
    }

    setLoading(true);
    setError('');
    setProgressStatus('?” ?¹í˜?´ì? ë¶„ì„ ì¤?..');

    try {
      // 1. ??URL ë¶„ì„ ë°?ì½˜í…ì¸??ì„±
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: webUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setProgressStatus('?’¾ ë¸”ë¡œê·??€??ì¤?..');

        // 2. ?ì„±??ì½˜í…ì¸ ë? ?¬ìŠ¤?¸ë¡œ ?€??        const saveResponse = await fetch('/api/save-web-post', {
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
          alert(`??ë¸”ë¡œê·?ê¸€ ?ì„± ?„ë£Œ!\n\n?œëª©: ${data.data.title}\nì¹´í…Œê³ ë¦¬: ${data.data.category}\n\n? ï¸ ${data.copyrightNotice}\n\nê´€ë¦¬ì ?€?œë³´?œì—???•ì¸?˜ê³  ê²€? í•˜?¸ìš”.`);
          window.location.href = '/admin/dashboard';
        } else {
          setError(saveData.error || 'ê¸€ ?€??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤');
        }
      } else {
        setError(data.error || '?¹í˜?´ì? ë¶„ì„ ?¤íŒ¨');
      }
    } catch (error) {
      setError('?¤ë¥˜ ë°œìƒ: ' + error.message);
    } finally {
      setLoading(false);
      setProgressStatus('');
    }
  };

  const handleDirectGenerate = async () => {
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      setError('?¬ë°”ë¥?YouTube URL???…ë ¥?´ì£¼?¸ìš”. (?? https://youtube.com/watch?v=VIDEO_ID)');
      return;
    }

    if (!confirm(`???ìƒ?¼ë¡œ ë¸”ë¡œê·?ê¸€???ì„±?˜ì‹œê² ìŠµ?ˆê¹Œ?\n\n?ìƒ ID: ${videoId}`)) {
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
        body: JSON.stringify({ videoId }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`??ë¸”ë¡œê·?ê¸€ ?ì„± ?„ë£Œ!\n\n?œëª©: ${data.post.title}\n\nê´€ë¦¬ì ?€?œë³´?œì—???•ì¸?˜ê³  ê²€? í•˜?¸ìš”.`);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.error || 'ê¸€ ?ì„± ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤');
      }
    } catch (error) {
      setError('?¤ë¥˜ ë°œìƒ: ' + error.message);
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

  // ?´ë?ì§€ ?¤ì • ?íƒœ
  const [imageCount, setImageCount] = useState(3);
  const [thumbnailPromptInput, setThumbnailPromptInput] = useState('');
  const [imagePrompts, setImagePrompts] = useState(['', '', '', '', '']);

  // ?ì„± ì§„í–‰ ?íƒœ ëª¨ë‹¬
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [scriptSummary, setScriptSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  // ?¤í¬ë¦½íŠ¸ ë³´ê¸° ?¸ë“¤??  const handleViewScript = async (videoId, videoTitle) => {
    setCurrentVideoId(videoId);
    setCurrentVideoTitle(videoTitle);
    setShowScriptModal(true);
    setLoadingScript(true);
    setCurrentScript('');
    setScriptSummary('');
    // ?´ë?ì§€ ?¤ì • ì´ˆê¸°??    setThumbnailPromptInput('');
    setImagePrompts(['', '', '', '', '']);
    setImageCount(3);

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
        // ?ë§‰ ?†ìœ¼ë©??ìƒ ?•ë³´ë¡??€ì²?        const videoInfoResponse = await fetch('/api/get-video-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId })
        });

        const videoData = await videoInfoResponse.json();

        if (videoData.success) {
          setCurrentScript(`[?ë§‰ ?†ìŒ - ?ìƒ ?¤ëª…?¼ë¡œ ?€ì²?\n\n${videoData.description || '?ìƒ ?¤ëª…???†ìŠµ?ˆë‹¤.'}`);
        } else {
          setCurrentScript('?ë§‰??ê°€?¸ì˜¬ ???†ìŠµ?ˆë‹¤. ???ìƒ?€ ?ë§‰???†ê±°???ë§‰ ì¶”ì¶œ??ë¶ˆê??¥í•©?ˆë‹¤.');
        }
      }
    } catch (error) {
      setCurrentScript('?¤í¬ë¦½íŠ¸ ë¡œë“œ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤: ' + error.message);
    } finally {
      setLoadingScript(false);
    }
  };

  // ?¤í¬ë¦½íŠ¸ ?”ì•½ ?¸ë“¤??  const handleSummarizeScript = async () => {
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
        alert('?”ì•½ ?ì„± ?¤íŒ¨: ' + data.message);
      }
    } catch (error) {
      alert('?”ì•½ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤: ' + error.message);
    } finally {
      setSummarizing(false);
    }
  };

  // ëª¨ë‹¬?ì„œ ê¸€ ?ì„± (?´ë?ì§€ ?„ë¡¬?„íŠ¸ ?¬í•¨)
  const handleGenerateFromModal = async () => {
    if (!currentVideoId) return;

    setShowScriptModal(false);
    setShowProgressModal(true);
    setProgressStatus('?“„ ë¸”ë¡œê·?ê¸€ ?ì„± ì¤?..');
    setGenerating(currentVideoId);

    try {
      const validImagePrompts = imagePrompts.slice(0, imageCount).filter(p => p.trim());

      setProgressStatus('?¬ ?ìƒ ?•ë³´ ë¶„ì„ ì¤?..');

      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: currentVideoId,
          thumbnailPrompt: thumbnailPromptInput || undefined,
          imagePrompts: validImagePrompts.length > 0 ? validImagePrompts : undefined,
          imageCount: imageCount
        }),
      });

      setProgressStatus('??ìµœì¢… ì²˜ë¦¬ ì¤?..');
      const data = await response.json();

      if (data.success) {
        setProgressStatus('???„ë£Œ!');
        setTimeout(() => {
          setShowProgressModal(false);
          window.location.href = '/admin/dashboard';
        }, 1000);
      } else {
        setShowProgressModal(false);
        alert(`???ì„± ?¤íŒ¨\n\n${data.error}`);
      }
    } catch (error) {
      setShowProgressModal(false);
      alert(`???¤ë¥˜ ë°œìƒ\n\n${error.message}`);
    } finally {
      setGenerating(null);
    }
  };

  const handleGeneratePost = async (videoId, videoTitle) => {
    // ?¤í¬ë¦½íŠ¸ ëª¨ë‹¬ ?´ê¸° (?´ë?ì§€ ?¤ì • ?¬í•¨)
    handleViewScript(videoId, videoTitle);
  };

  // ê¸°ì¡´ ë°©ì‹ (promptë¡?ì§ì ‘ ?…ë ¥) - ???´ìƒ ?¬ìš© ?ˆí•¨
  const handleGeneratePostLegacy = async (videoId, videoTitle) => {
    const thumbnailPrompt = prompt(
      `"${videoTitle}"\n\në¸”ë¡œê·??¸ë„¤???´ë?ì§€ë¥??„í•œ ?„ë¡¬?„íŠ¸ë¥??…ë ¥?˜ì„¸??`,
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
        alert(`??ë¸”ë¡œê·?ê¸€ ?ì„± ?„ë£Œ!\n\n?œëª©: ${data.post.title}\n\nê´€ë¦¬ì ?€?œë³´?œì—???•ì¸?˜ê³  ê²€? í•˜?¸ìš”.`);
        // ?€?œë³´?œë¡œ ?´ë™
        window.location.href = '/admin/dashboard';
      } else {
        alert(`???ì„± ?¤íŒ¨\n\n${data.error}`);
      }
    } catch (error) {
      alert(`???¤ë¥˜ ë°œìƒ\n\n${error.message}`);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <Layout title="?ìƒ ê²€??>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ?¤ë” */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">?” ì½˜í…ì¸?ê²€??/h1>
              <p className="text-gray-600 mt-1">?¤ì›Œ?œë¡œ ê²€?‰í•˜ê±°ë‚˜ YouTube URL???…ë ¥?˜ì—¬ ë¸”ë¡œê·?ê¸€???ì„±?˜ì„¸??/p>
            </div>
            <Link href="/admin/dashboard">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors">
                ???€?œë³´??              </button>
            </Link>
          </div>

          {/* ê²€????*/}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* ê²€??ëª¨ë“œ ? íƒ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ê²€??ë°©ë²• ? íƒ
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
                    ?” ?¤ì›Œ??ê²€??                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('youtube')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                      searchMode === 'youtube'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ?¥ YouTube URL
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
                    ?Œ ?¹ì‚¬?´íŠ¸/ë¸”ë¡œê·?URL
                  </button>
                </div>
              </div>

              {/* ?¤ì›Œ??ê²€??ëª¨ë“œ */}
              {searchMode === 'keyword' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ê²€???¤ì›Œ??<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="?? ?¼í›„?¥ì…˜ ?…ì°°ë°©ë²•, ?¼ë³¸ì§êµ¬ ê´€?? ?¼ê·œ??êµ¬ë§¤?€??
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                    required
                  />

                  {/* ìµœê·¼ ê²€??*/}
                  {searchHistory.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">ìµœê·¼ ê²€??</span>
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

              {/* YouTube URL ì§ì ‘ ?…ë ¥ ëª¨ë“œ */}
              {searchMode === 'youtube' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL ?…ë ¥ <span className="text-red-500">*</span>
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
                    ?’¡ YouTube ?ìƒ URL???…ë ¥?˜ë©´ ë°”ë¡œ ë¸”ë¡œê·?ê¸€???ì„±?©ë‹ˆ??                  </p>
                </div>
              )}

              {/* ?¹ì‚¬?´íŠ¸/ë¸”ë¡œê·?URL ?…ë ¥ ëª¨ë“œ */}
              {searchMode === 'web' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ?¹ì‚¬?´íŠ¸/ë¸”ë¡œê·?URL ?…ë ¥ <span className="text-red-500">*</span>
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
                    ? ï¸ ?€?‘ê¶Œ ì¤€?? ?ë³¸??ë³µì‚¬?˜ì? ?Šê³  AIê°€ ?´ìš©??ì°¸ê³ ?˜ì—¬ ?„ì „???ˆë¡­ê²??¬ì‘?±í•©?ˆë‹¤
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ?’¡ ì§€?? ?¤ì´ë²?ë¸”ë¡œê·? ?¤ì´ë²??´ìŠ¤, ?°ìŠ¤? ë¦¬, ?¼ë°˜ ?¹ì‚¬?´íŠ¸
                  </p>
                </div>
              )}

              {/* ?„í„° ?¤ì • (?¤ì›Œ??ëª¨ë“œ?ì„œë§??œì‹œ) */}
              {searchMode === 'keyword' && (
                <>
                  {/* ?ìƒ ê¸¸ì´ ? íƒ */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ?ìƒ ê¸¸ì´ ? íƒ
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
                        ?“º ?„ì²´
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
                        ???ì¸  (&lt; 4ë¶?
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
                        ?¬ ë¡±í¼ (&gt; 20ë¶?
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      ?’¡ ?ì¸ ???Œê³ ë¦¬ì¦˜ ?°ë?ë¥?ë°›ì•„ ë°”ì´??ê°€?¥ì„±???’ìŠµ?ˆë‹¤
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ê²€??ê¸°ê°„
                      </label>
                      <select
                        value={periodDays}
                        onChange={(e) => setPeriodDays(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="7">ìµœê·¼ 7??/option>
                        <option value="30">ìµœê·¼ 30??/option>
                        <option value="90">ìµœê·¼ 90??/option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        ìµœê·¼ ?ìƒ?¼ìˆ˜ë¡??¸ë Œ?œì— ?í•©?©ë‹ˆ??                      </p>
                    </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ìµœì†Œ ì¡°íšŒ??                    </label>
                    <select
                      value={minViews}
                      onChange={(e) => setMinViews(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="0">?œí•œ ?†ìŒ</option>
                      <option value="1000">1,000???´ìƒ</option>
                      <option value="5000">5,000???´ìƒ</option>
                      <option value="10000">10,000???´ìƒ</option>
                      <option value="50000">50,000???´ìƒ</option>
                      <option value="100000">100,000???´ìƒ</option>
                      <option value="500000">500,000???´ìƒ</option>
                      <option value="1000000">1,000,000???´ìƒ</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      ì¡°íšŒ?˜ê? ?’ì? ?ìƒ?¼ìˆ˜ë¡??ˆì§ˆ??ì¢‹ìŠµ?ˆë‹¤
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ìµœë? ê²€??ê²°ê³¼ ??                    </label>
                    <select
                      value={maxResults}
                      onChange={(e) => setMaxResults(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="10">10ê°?/option>
                      <option value="20">20ê°?/option>
                      <option value="30">30ê°?/option>
                      <option value="50">50ê°?(ìµœë?)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      API ? ë‹¹???ˆì•½???„í•´ ?ì ˆ???˜ë? ? íƒ?˜ì„¸??                    </p>
                  </div>
                </div>
                </>
              )}

              {/* ê²€???•ë³´ */}
              <div className={`border-l-4 p-4 rounded-r-lg ${
                searchMode === 'web' ? 'bg-yellow-50 border-yellow-400' :
                searchMode === 'youtube' ? 'bg-red-50 border-red-400' :
                'bg-teal-50 border-teal-400'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-xl">
                      {searchMode === 'web' ? '? ï¸' : '?¹ï¸'}
                    </span>
                  </div>
                  <div className="ml-3">
                    {searchMode === 'keyword' ? (
                      <p className="text-sm text-teal-700">
                        <strong>ê²€??ì¡°ê±´:</strong> ? íƒ??ê¸°ê°„ ???…ë¡œ?œëœ ?ìƒ??ì¡°íšŒ???œìœ¼ë¡?ê²€?‰í•©?ˆë‹¤
                      </p>
                    ) : searchMode === 'youtube' ? (
                      <p className="text-sm text-red-700">
                        <strong>YouTube URL:</strong> ?ìƒ URL???…ë ¥?˜ë©´ ?´ë‹¹ ?ìƒ?¼ë¡œ ë°”ë¡œ ë¸”ë¡œê·?ê¸€???ì„±?©ë‹ˆ??                      </p>
                    ) : (
                      <p className="text-sm text-yellow-800">
                        <strong>?€?‘ê¶Œ ?ˆë‚´:</strong> AIê°€ ?ë³¸ ì½˜í…ì¸ ë? ì°¸ê³ ?˜ì—¬ ?„ì „???ˆë¡œ??ê¸€ë¡??¬ì‘?±í•©?ˆë‹¤. ?ë³¸??ë³µì‚¬?˜ì? ?Šìœ¼ë¯€ë¡??€?‘ê¶Œ ë¬¸ì œê°€ ?†ìŠµ?ˆë‹¤. ?? ì¶œì²˜???˜ë‹¨???œê¸°?©ë‹ˆ??
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ê²€???ì„± ë²„íŠ¼ */}
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
                    {searchMode === 'keyword' ? 'ê²€??ì¤?..' :
                     searchMode === 'web' ? '??ë¶„ì„ ë°?ê¸€ ?ì„± ì¤?..' : 'ê¸€ ?ì„± ì¤?..'}
                  </span>
                ) : (
                  searchMode === 'keyword' ? '?” ?ìƒ ê²€?? :
                  searchMode === 'web' ? '?Œ ?¹í˜?´ì? ë¶„ì„ ??ê¸€ ?ì„±' :
                  '?¥ YouTube ?ìƒ?¼ë¡œ ê¸€ ?ì„±'
                )}
              </button>
            </form>
          </div>

          {/* ?ëŸ¬ ë©”ì‹œì§€ */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-2xl">??/span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">ê²€???¤íŒ¨</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* ê²€??ê²°ê³¼ */}
          {videos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ê²€??ê²°ê³¼ <span className="text-teal-600">({videos.length}ê°?</span>
                </h2>
                <p className="text-sm text-gray-500">
                  ì¡°íšŒ???œìœ¼ë¡??•ë ¬??                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <div key={video.video_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
                    {/* ?œìœ„ ë°°ì? */}
                    {index < 3 && (
                      <div className="absolute mt-3 ml-3 z-10">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-300 text-gray-900' :
                          'bg-orange-400 text-orange-900'
                        }`}>
                          {index === 0 ? '?¥‡' : index === 1 ? '?¥ˆ' : '?¥‰'} #{index + 1}
                        </span>
                      </div>
                    )}

                    {/* ?¸ë„¤??*/}
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
                      {/* ?œëª© */}
                      <h3 className="font-bold text-base mb-3 line-clamp-2 text-gray-900 h-12">
                        {video.title}
                      </h3>

                      {/* ë©”í? ?•ë³´ */}
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="mr-2">?“º</span>
                          {video.channel_name}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <span className="mr-1">?‘ï¸?/span>
                            {video.view_count.toLocaleString()}
                          </span>
                          <span className="text-gray-600 flex items-center">
                            <span className="mr-1">?‘</span>
                            {video.like_count.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* ë°”ì´??ë¶„ì„ ê²°ê³¼ */}
                      <div className="flex-grow">
                      {video.viral_analysis && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-purple-700">?”¥ ë°”ì´??ë¶„ì„</span>
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

                      {/* ?¡ì…˜ ë²„íŠ¼ */}
                      <div className="flex gap-2 mt-auto">
                        <a
                          href={`https://youtube.com/watch?v=${video.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center text-sm"
                        >
                          ?ìƒ ë³´ê¸°
                        </a>
                        <button
                          onClick={() => handleViewScript(video.video_id, video.title)}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
                        >
                          ?¤í¬ë¦½íŠ¸ ë³´ê¸°
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ê²€??ê²°ê³¼ ?†ìŒ */}
          {!loading && videos.length === 0 && !error && keyword === '' && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
              <div className="text-6xl mb-4">?”</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">?ìƒ??ê²€?‰í•´ë³´ì„¸??/h3>
              <p className="text-gray-600">
                ?¤ì›Œ?œë? ?…ë ¥?˜ê³  ê²€??ë²„íŠ¼???´ë¦­?˜ì„¸??              </p>
            </div>
          )}
        </div>
      </div>

      {/* ?¤í¬ë¦½íŠ¸ ëª¨ë‹¬ */}
      {showScriptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* ëª¨ë‹¬ ?¤ë” */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">?“„ ?ìƒ ?¤í¬ë¦½íŠ¸</h2>
                <button
                  onClick={() => setShowScriptModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  Ã—
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{currentVideoTitle}</p>
            </div>

            {/* ëª¨ë‹¬ ë³¸ë¬¸ */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* ?¤í¬ë¦½íŠ¸ ?¹ì…˜ */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">?“ ?ìƒ ?¤í¬ë¦½íŠ¸</h3>
                  {!loadingScript && currentScript && (
                    <button
                      onClick={handleSummarizeScript}
                      disabled={summarizing}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg disabled:bg-gray-400"
                    >
                      {summarizing ? '?”ì•½ ì¤?..' : '?“Œ ?œê°„ë³??”ì•½'}
                    </button>
                  )}
                </div>
                {loadingScript ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                    <p className="text-gray-600">?¤í¬ë¦½íŠ¸ë¥?ë¶ˆëŸ¬?¤ëŠ” ì¤?..</p>
                  </div>
                ) : (
                  <>
                    {scriptSummary && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">?±ï¸ ?œê°„ë³??”ì•½</h4>
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

              {/* ?´ë?ì§€ ?¤ì • ?¹ì…˜ */}
              {!loadingScript && currentScript && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">?–¼ï¸??´ë?ì§€ ?¤ì •</h3>

                  {/* ?¸ë„¤???„ë¡¬?„íŠ¸ */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ?¸ë„¤???´ë?ì§€ ?„ë¡¬?„íŠ¸
                    </label>
                    <input
                      type="text"
                      value={thumbnailPromptInput}
                      onChange={(e) => setThumbnailPromptInput(e.target.value)}
                      placeholder="?? ?¼ë³¸ ?¼í•‘ëª??í’ˆ ë°°ì†¡, ?¼í›„?¥ì…˜ ?™ì°° ?í’ˆ"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">ë¹„ì›Œ?ë©´ AIê°€ ?ë™ ?ì„±?©ë‹ˆ??/p>
                  </div>

                  {/* ë³¸ë¬¸ ?´ë?ì§€ ê°œìˆ˜ */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ë³¸ë¬¸ ?´ë?ì§€ ê°œìˆ˜: {imageCount}??                    </label>
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

                  {/* ë³¸ë¬¸ ?´ë?ì§€ ?„ë¡¬?„íŠ¸??*/}
                  {imageCount > 0 && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        ë³¸ë¬¸ ?´ë?ì§€ ?„ë¡¬?„íŠ¸ (? íƒ)
                      </label>
                      {[...Array(imageCount)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 w-16">?´ë?ì§€ {idx + 1}</span>
                          <input
                            type="text"
                            value={imagePrompts[idx] || ''}
                            onChange={(e) => {
                              const newPrompts = [...imagePrompts];
                              newPrompts[idx] = e.target.value;
                              setImagePrompts(newPrompts);
                            }}
                            placeholder={`ë³¸ë¬¸ ${idx + 1}ë²ˆì§¸ ?´ë?ì§€ ?„ë¡¬?„íŠ¸`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-gray-500">ë¹„ì›Œ?ë©´ AIê°€ ê¸€ ?´ìš©??ë§ê²Œ ?ë™ ?ì„±?©ë‹ˆ??/p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ëª¨ë‹¬ ?¸í„° */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowScriptModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  ?«ê¸°
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
                  {generating ? '?ì„± ì¤?..' : `ê¸€ ?ì„± (?´ë?ì§€ ${imageCount}??`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ?ì„± ì§„í–‰ ?íƒœ ëª¨ë‹¬ */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">ë¸”ë¡œê·?ê¸€ ?ì„± ì¤?/h3>
            <p className="text-lg text-teal-600 font-medium mb-4">{progressStatus}</p>
            <p className="text-sm text-gray-500">? ì‹œë§?ê¸°ë‹¤?¤ì£¼?¸ìš”...</p>
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <p className="text-xs text-gray-600">
                ?“ ê¸€ ?‘ì„± ???–¼ï¸??´ë?ì§€ ?ì„± ???’¾ ?€??              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
