// components/PostCard.js
// 토스/뱅크샐러드 스타일 포스트 카드

import Link from 'next/link';

export default function PostCard({ post }) {
  const dateToShow = post.published_at || post.created_at || new Date().toISOString();
  const formattedDate = new Date(dateToShow).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all h-full">
        {/* 썸네일 */}
        {post.thumbnail_url && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* 컨텐츠 */}
        <div className="p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors leading-snug">
            {post.title}
          </h2>

          {post.meta_description && (
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
              {post.meta_description}
            </p>
          )}

          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
            <span>{formattedDate}</span>
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{(post.view_count || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
