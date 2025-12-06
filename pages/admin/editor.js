import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import TiptapEditor from '../../components/TiptapEditor';
import { getAllCategories } from '../../lib/categories';

export default function PostEditor() {
  const router = useRouter();
  const { id, slug } = router.query;

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [category, setCategory] = useState('life');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [places, setPlaces] = useState([]);

  // 본문에서 장소 정보 추출
  const extractPlaces = (html) => {
    const placeRegex = /<div[^>]*>[\s\S]*?<h4[^>]*>📍\s*([^<]+)<\/h4>[\s\S]*?📌\s*주소:\s*([^<]+)[\s\S]*?<iframe[^>]*src="[^"]*q=([^"&]+)"[^>]*>/g;
    const found = [];
    let match;
    while ((match = placeRegex.exec(html)) !== null) {
      found.push({
        name: match[1].trim(),
        address: decodeURIComponent(match[3].replace(/\+/g, ' ')),
        original: match[0]
      });
    }
    return found;
  };

  // 장소 주소 업데이트
  const updatePlaceAddress = (index, newAddress) => {
    const newPlaces = [...places];
    newPlaces[index].address = newAddress;
    setPlaces(newPlaces);

    // 본문 HTML에서 해당 장소의 iframe 주소 업데이트
    let newContent = content;
    const encodedAddress = encodeURIComponent(newPlaces[index].name + ' ' + newAddress);

    // iframe src의 q= 파라미터 업데이트
    const iframeRegex = new RegExp(
      `(<iframe[^>]*src="https://www.google.com/maps/embed/v1/place\\?key=[^"]*&q=)[^"&]+("[^>]*>)`,
      'g'
    );

    let count = 0;
    newContent = newContent.replace(iframeRegex, (match, prefix, suffix) => {
      if (count === index) {
        count++;
        return prefix + encodedAddress + suffix;
      }
      count++;
      return match;
    });

    setContent(newContent);
  };

  useEffect(() => {
    if (id || slug) {
      loadPost();
    }
  }, [id, slug]);

  const loadPost = async () => {
    try {
      const query = id ? `id=${id}` : `slug=${slug}`;
      const res = await fetch(`/api/posts/get?${query}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
        setTitle(data.post.title);
        setContent(data.post.content);
        setMetaDescription(data.post.meta_description || '');
        setCategory(data.post.category || 'life');
        setThumbnailUrl(data.post.thumbnail_url || '');
        // 장소 정보 추출
        const foundPlaces = extractPlaces(data.post.content);
        setPlaces(foundPlaces);
      }
    } catch (err) {
      console.error('포스트 로드 실패:', err);
      alert('포스트를 불러올 수 없습니다.');
    }
  };

  // base64 이미지를 URL로 변환
  const convertBase64ToUrl = async (contentHtml) => {
    const base64Regex = /<img[^>]+src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
    const matches = [...contentHtml.matchAll(base64Regex)];

    if (matches.length === 0) return contentHtml;

    let newContent = contentHtml;

    for (const match of matches) {
      try {
        const base64Data = match[1];
        const res = await fetch('/api/upload-base64', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data })
        });
        const data = await res.json();
        if (data.success && data.url) {
          newContent = newContent.replace(base64Data, data.url);
        }
      } catch (err) {
        console.error('base64 변환 실패:', err);
      }
    }

    return newContent;
  };

  const savePost = async () => {
    setSaving(true);
    try {
      // base64 이미지가 있으면 먼저 URL로 변환
      const processedContent = await convertBase64ToUrl(content);

      const res = await fetch('/api/posts/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: post.id,
          title,
          content: processedContent,
          meta_description: metaDescription,
          category,
          thumbnail_url: thumbnailUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ 저장되었습니다!');
        router.push('/admin/dashboard');
      } else {
        alert('저장 실패: ' + data.message);
      }
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const regenerateThumbnail = async () => {
    if (!confirm('썸네일을 다시 생성하시겠습니까?')) return;

    const prompt = window.prompt('썸네일 프롬프트를 입력하세요 (영어):', '');
    if (!prompt) return;

    setSaving(true);
    try {
      const res = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postTitle: title, thumbnailPrompt: prompt })
      });
      const data = await res.json();
      if (data.success) {
        setThumbnailUrl(data.imageUrl);
        alert('✅ 썸네일이 생성되었습니다!');
      } else {
        alert('생성 실패: ' + data.message);
      }
    } catch (err) {
      alert('썸네일 생성 실패');
    } finally {
      setSaving(false);
    }
  };

  // 본문 이미지 재생성
  const regenerateContentImages = async () => {
    // 본문에서 picsum 또는 깨진 이미지 찾기
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const matches = [...content.matchAll(imgRegex)];

    if (matches.length === 0) {
      alert('본문에 이미지가 없습니다.');
      return;
    }

    const picsumImages = matches.filter(m =>
      m[1].includes('picsum.photos') ||
      m[1].includes('placeholder') ||
      m[1].includes('via.placeholder')
    );

    if (picsumImages.length === 0) {
      if (!confirm(`본문에 ${matches.length}개의 이미지가 있습니다. 모든 이미지를 AI로 새로 생성하시겠습니까?`)) {
        return;
      }
    } else {
      if (!confirm(`${picsumImages.length}개의 임시 이미지를 AI로 새로 생성하시겠습니까?`)) {
        return;
      }
    }

    setSaving(true);
    let newContent = content;
    let successCount = 0;

    try {
      const imagesToReplace = picsumImages.length > 0 ? picsumImages : matches;

      for (let i = 0; i < imagesToReplace.length; i++) {
        const match = imagesToReplace[i];
        const oldSrc = match[1];

        // 이미지별 프롬프트 생성
        const imagePrompt = `Professional blog image for article about: ${title}, image ${i + 1} of ${imagesToReplace.length}, photorealistic, high quality, modern style, no text`;

        try {
          const res = await fetch('/api/generate-thumbnail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              postTitle: title,
              thumbnailPrompt: imagePrompt
            })
          });

          const data = await res.json();
          if (data.success && data.imageUrl) {
            newContent = newContent.replace(oldSrc, data.imageUrl);
            successCount++;
          }
        } catch (err) {
          console.error(`이미지 ${i + 1} 생성 실패:`, err);
        }
      }

      setContent(newContent);
      alert(`✅ ${successCount}개의 본문 이미지가 재생성되었습니다!`);
    } catch (err) {
      alert('이미지 재생성 중 오류: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">✏️ 포스트 편집</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              취소
            </button>
            <button
              onClick={savePost}
              disabled={saving}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
            >
              {saving ? '저장 중...' : '💾 저장'}
            </button>
          </div>
        </div>

        {/* 썸네일 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🖼️ 썸네일 이미지</h2>
          <div className="mb-4">
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="썸네일"
                className="w-full max-w-2xl rounded-lg border shadow-sm"
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/1280/720?random=' + post.id;
                }}
              />
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="썸네일 URL"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={regenerateThumbnail}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              🎨 AI 재생성
            </button>
          </div>
        </div>

        {/* 제목 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📝 제목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-lg font-medium"
            placeholder="블로그 제목"
          />
        </div>

        {/* 카테고리 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📂 카테고리</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          >
            {getAllCategories().map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 메타 설명 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🔍 메타 설명 (SEO)</h2>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            placeholder="SEO용 메타 설명 (130-150자)"
          />
          <p className="text-sm text-gray-500 mt-2">
            현재 {metaDescription.length}자 / 권장 130-150자
          </p>
        </div>

        {/* 장소 정보 편집 (있을 경우에만 표시) */}
        {places.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">📍 장소 정보 편집</h2>
            <p className="text-sm text-gray-500 mb-4">
              주소를 수정하면 지도가 자동으로 업데이트됩니다.
            </p>
            <div className="space-y-4">
              {places.map((place, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="font-medium text-gray-900 mb-2">
                    {place.name}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={place.address}
                      onChange={(e) => updatePlaceAddress(index, e.target.value)}
                      placeholder="주소 입력 (예: 도쿄 시부야구 1-2-3)"
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      🗺️ 확인
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 본문 에디터 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📄 본문 내용</h2>
            <button
              onClick={regenerateContentImages}
              disabled={saving}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
            >
              🖼️ 본문 이미지 AI 재생성
            </button>
          </div>
          <TiptapEditor content={content} onChange={setContent} />
          <p className="text-sm text-gray-500 mt-4">
            💡 네이버 블로그처럼 편집하세요. 이미지, 링크, 표, 동영상, 서식 모두 가능합니다.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
