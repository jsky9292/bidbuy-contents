// pages/admin/posts.js
// ?¨Ïä§??Í¥ÄÎ¶??òÏù¥ÏßÄ

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const categoryLabels = {
  auto: '?êÎèôÏ∞®Î≥¥??,
  health: '?§ÏÜêÎ≥¥Ìóò',
  life: '?ùÎ™ÖÎ≥¥Ìóò',
  property: '?¨Î¨ºÎ≥¥Ìóò',
  dispute: 'Î∂ÑÏüÅ?¥Í≤∞',
  cases: '?§Ï†ú?¨Î?',
  tools: 'Î≥¥ÌóòÍ∏àÏßÑ??,
};

export default function PostsManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts/list');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('?¨Ïä§??Ï°∞Ìöå ?§Î•ò:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost({ ...post });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/posts/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          postId: editingPost.id,
          title: editingPost.title,
          content: editingPost.content,
          meta_description: editingPost.meta_description,
          category: editingPost.category,
          thumbnail_url: editingPost.thumbnail_url,
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('?Ä?•Îêò?àÏäµ?àÎã§.');
        setShowModal(false);
        fetchPosts();
      } else {
        alert('?§Î•ò: ' + data.error);
      }
    } catch (error) {
      alert('?Ä??Ï§??§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§.');
    }
  };

  const handleDelete = async (post) => {
    if (!confirm(`"${post.title}" ?¨Ïä§?∏Î? ??†ú?òÏãúÍ≤†Ïäµ?àÍπå?`)) return;

    try {
      const res = await fetch('/api/posts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug })
      });

      const data = await res.json();
      if (data.success) {
        alert('??†ú?òÏóà?µÎãà??');
        fetchPosts();
      } else {
        alert('?§Î•ò: ' + data.error);
      }
    } catch (error) {
      alert('??†ú Ï§??§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§.');
    }
  };

  const regenerateThumbnail = () => {
    if (!editingPost) return;
    const siteUrl = 'https://youtubeblog-rho.vercel.app';
    const newUrl = `${siteUrl}/api/og?title=${encodeURIComponent(editingPost.title)}`;
    setEditingPost({ ...editingPost, thumbnail_url: newUrl });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <>
      <Head>
        <title>?¨Ïä§??Í¥ÄÎ¶?| Î≥¥Îã¥</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* ?§Îçî */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin/dashboard">
                  <span className="text-gray-500 hover:text-gray-700 cursor-pointer">???Ä?úÎ≥¥??/span>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">?¨Ïä§??Í¥ÄÎ¶?/h1>
              </div>
              <div className="text-sm text-gray-500">
                Ï¥?{posts.length}Í∞?              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center">
              <p className="text-gray-500">?¨Ïä§?∏Í? ?ÜÏäµ?àÎã§.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">?∏ÎÑ§??/th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">?úÎ™©</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ïπ¥ÌÖåÍ≥†Î¶¨</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">?ÅÌÉú</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">?†Ïßú</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">?°ÏÖò</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {post.thumbnail_url ? (
                            <img
                              src={post.thumbnail_url}
                              alt=""
                              className="w-20 h-12 object-cover rounded"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                              ?ÜÏùå
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 max-w-xs truncate">{post.title}</div>
                          <div className="text-xs text-gray-400 truncate">{post.slug}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {categoryLabels[post.category] || post.category}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'published' ? 'bg-green-100 text-green-700' :
                            post.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {post.status === 'published' ? 'Î∞úÌñâ?? : post.status === 'draft' ? '?ÑÏãú?Ä?? : post.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(post.published_at || post.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="px-3 py-1 bg-teal-50 text-teal-600 rounded text-sm hover:bg-teal-100"
                            >
                              ?òÏ†ï
                            </button>
                            <a
                              href={`/posts/${post.slug}`}
                              target="_blank"
                              className="px-3 py-1 bg-gray-50 text-gray-600 rounded text-sm hover:bg-gray-100"
                            >
                              Î≥¥Í∏∞
                            </a>
                            <button
                              onClick={() => handleDelete(post)}
                              className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100"
                            >
                              ??†ú
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ?òÏ†ï Î™®Îã¨ */}
      {showModal && editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">?¨Ïä§???òÏ†ï</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  √ó
                </button>
              </div>

              <div className="space-y-4">
                {/* ?úÎ™© */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">?úÎ™©</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* ?§Î™Ö */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Î©îÌ? ?§Î™Ö</label>
                  <textarea
                    value={editingPost.meta_description || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, meta_description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Ïπ¥ÌÖåÍ≥†Î¶¨ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ïπ¥ÌÖåÍ≥†Î¶¨</label>
                  <select
                    value={editingPost.category || 'life'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* ?∏ÎÑ§??*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">?∏ÎÑ§??URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingPost.thumbnail_url || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, thumbnail_url: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                    <button
                      onClick={regenerateThumbnail}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                    >
                      ?êÎèô?ùÏÑ±
                    </button>
                  </div>
                  {editingPost.thumbnail_url && (
                    <img
                      src={editingPost.thumbnail_url}
                      alt="?∏ÎÑ§??ÎØ∏Î¶¨Î≥¥Í∏∞"
                      className="mt-2 w-full max-w-xs rounded border"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>

                {/* Î≥∏Î¨∏ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Î≥∏Î¨∏ (HTML)</label>
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={10}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600"
                >
                  ?Ä??                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                >
                  Ï∑®ÏÜå
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
