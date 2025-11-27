// lib/categories.js
// 보담 - 보험 전문 블로그 카테고리 시스템

export const categories = [
  {
    id: 'all',
    name: '전체',
    slug: 'all',
    description: '모든 보험 정보',
    icon: '📋'
  },
  {
    id: 'auto',
    name: '자동차보험',
    slug: 'auto',
    description: '자동차 사고처리, 보험금 청구, 과실비율',
    icon: '🚗'
  },
  {
    id: 'health',
    name: '실손보험',
    slug: 'health',
    description: '실손의료비 청구, 보장범위, 병원비',
    icon: '🏥'
  },
  {
    id: 'life',
    name: '생명/건강보험',
    slug: 'life',
    description: '암보험, 진단비, 후유장해, 사망보험금',
    icon: '💰'
  },
  {
    id: 'property',
    name: '재물/화재보험',
    slug: 'property',
    description: '주택화재, 상가, 풍수재, 도난',
    icon: '🏠'
  },
  {
    id: 'dispute',
    name: '분쟁해결',
    slug: 'dispute',
    description: '보험사 거절 대응, 금감원 민원, 소송',
    icon: '⚖️'
  },
  {
    id: 'cases',
    name: '실제사례',
    slug: 'cases',
    description: '청구 성공후기, 역전사례, 수령금액',
    icon: '📝'
  },
  {
    id: 'tools',
    name: '보험금진단',
    slug: 'tools',
    description: '자가진단 퀴즈, 체크리스트, 계산기',
    icon: '📊'
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
