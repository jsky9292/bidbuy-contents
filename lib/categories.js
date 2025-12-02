// lib/categories.js
// 비드바이콘텐츠 - 일본 정보 블로그 카테고리 시스템

export const categories = [
  {
    id: 'all',
    name: '전체',
    slug: 'all',
    description: '모든 일본 관련 정보',
    icon: '📋',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80'
  },
  {
    id: 'travel',
    name: '일본여행',
    slug: 'travel',
    description: '일본 여행 정보, 맛집, 관광지, 숙소',
    icon: '✈️',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80'
  },
  {
    id: 'exchange',
    name: '환율정보',
    slug: 'exchange',
    description: '엔화 환율, 환전 팁, 경제 동향',
    icon: '💴',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80'
  },
  {
    id: 'proxy',
    name: '구매대행',
    slug: 'proxy',
    description: '일본 구매대행 방법, 야후옥션, 메루카리',
    icon: '🛒',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&q=80'
  },
  {
    id: 'shopping',
    name: '일본쇼핑',
    slug: 'shopping',
    description: '일본 쇼핑 정보, 면세, 인기 상품',
    icon: '🛍️',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'
  },
  {
    id: 'culture',
    name: '일본문화',
    slug: 'culture',
    description: '일본 문화, 애니메이션, 음식, 생활',
    icon: '🎌',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80'
  },
  {
    id: 'news',
    name: '일본뉴스',
    slug: 'news',
    description: '일본 최신 뉴스, 트렌드, 이슈',
    icon: '📰',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80'
  },
  {
    id: 'tips',
    name: '꿀팁',
    slug: 'tips',
    description: '일본 생활 꿀팁, 절약법, 유용한 정보',
    icon: '💡',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80'
  }
];

/**
 * 카테고리 ID로 카테고리 정보 가져오기
 */
export function getCategoryById(id) {
  return categories.find(cat => cat.id === id) || categories[0];
}

/**
 * 카테고리 slug로 카테고리 정보 가져오기
 */
export function getCategoryBySlug(slug) {
  return categories.find(cat => cat.slug === slug) || categories[0];
}

/**
 * 모든 카테고리 목록 (전체 제외)
 */
export function getAllCategories() {
  return categories.filter(cat => cat.id !== 'all');
}
