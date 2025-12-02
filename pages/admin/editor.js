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
      }
    } catch (err) {
      console.error('?�스??로드 ?�패:', err);
      alert('?�스?��? 불러?????�습?�다.');
    }
  };

  // base64 ?��?지�?URL�?변??  const convertBase64ToUrl = async (contentHtml) => {
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
        console.error('base64 변???�패:', err);
      }
    }

    return newContent;
  };

  const savePost = async () => {
    setSaving(true);
    try {
      // base64 ?��?지가 ?�으�?먼�? URL�?변??      const processedContent = await convertBase64ToUrl(content);

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
        alert('???�?�되?�습?�다!');
        router.push('/admin/dashboard');
      } else {
        alert('?�???�패: ' + data.message);
      }
    } catch (err) {
      console.error('?�???�패:', err);
      alert('?�??�??�류가 발생?�습?�다.');
    } finally {
      setSaving(false);
    }
  };

  const regenerateThumbnail = async () => {
    if (!confirm('?�네?�을 ?�시 ?�성?�시겠습?�까?')) return;

    const prompt = window.prompt('?�네???�롬?�트�??�력?�세??(?�어):', '');
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
        alert('???�네?�이 ?�성?�었?�니??');
      } else {
        alert('?�성 ?�패: ' + data.message);
      }
    } catch (err) {
      alert('?�네???�성 ?�패');
    } finally {
      setSaving(false);
    }
  };

  // 본문 ?��?지 ?�생??  const regenerateContentImages = async () => {
    // 본문?�서 picsum ?�는 깨진 ?��?지 찾기
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const matches = [...content.matchAll(imgRegex)];

    if (matches.length === 0) {
      alert('본문???��?지가 ?�습?�다.');
      return;
    }

    const picsumImages = matches.filter(m =>
      m[1].includes('picsum.photos') ||
      m[1].includes('placeholder') ||
      m[1].includes('via.placeholder')
    );

    if (picsumImages.length === 0) {
      if (!confirm(`본문??${matches.length}개의 ?��?지가 ?�습?�다. 모든 ?��?지�?AI�??�로 ?�성?�시겠습?�까?`)) {
        return;
      }
    } else {
      if (!confirm(`${picsumImages.length}개의 ?�시 ?��?지�?AI�??�로 ?�성?�시겠습?�까?`)) {
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

        // ?��?지�??�롬?�트 ?�성
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
          console.error(`?��?지 ${i + 1} ?�성 ?�패:`, err);
        }
      }

      setContent(newContent);
      alert(`??${successCount}개의 본문 ?��?지가 ?�생?�되?�습?�다!`);
    } catch (err) {
      alert('?��?지 ?�생??�??�류: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 �?..</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">?�️ ?�스???�집</h1>
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
              {saving ? '?�??�?..' : '?�� ?�??}
            </button>
          </div>
        </div>

        {/* ?�네???�션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">?���??�네???��?지</h2>
          <div className="mb-4">
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="?�네??
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
              placeholder="?�네??URL"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={regenerateThumbnail}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              ?�� AI ?�생??            </button>
          </div>
        </div>

        {/* ?�목 ?�션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">?�� ?�목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-lg font-medium"
            placeholder="블로�??�목"
          />
        </div>

        {/* 카테고리 ?�션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">?�� 카테고리</h2>
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

        {/* 메�? ?�명 ?�션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">?�� 메�? ?�명 (SEO)</h2>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            placeholder="SEO??메�? ?�명 (130-150??"
          />
          <p className="text-sm text-gray-500 mt-2">
            ?�재 {metaDescription.length}??/ 권장 130-150??          </p>
        </div>

        {/* 본문 ?�디??*/}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">?�� 본문 ?�용</h2>
            <button
              onClick={regenerateContentImages}
              disabled={saving}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
            >
              ?���?본문 ?��?지 AI ?�생??            </button>
          </div>
          <TiptapEditor content={content} onChange={setContent} />
          <p className="text-sm text-gray-500 mt-4">
            ?�� ?�이�?블로그처???�집?�세?? ?��?지, 링크, ?? ?�영?? ?�식 모두 가?�합?�다.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
