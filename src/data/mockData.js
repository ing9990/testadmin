// src/data/mockData.js

// 카테고리 목록
export const categories = [
  '공지사항',
  '이벤트',
  '업데이트',
  '교육',
  '투자정보',
  '시장분석'
];

// 전문가 목록
export const experts = [
  '김전문가',
  '이분석가',
  '박투자가',
  '정애널리스트',
  '최컨설턴트'
];

// 공지사항 데이터 (기본 샘플)
export const notices = [
  {
    id: 1,
    title: '2025년 투자 전략 가이드',
    category: '투자정보',
    expert: '김전문가',
    date: '2025-06-01',
    views: 1250,
    meta: {
      title: '2025년 투자 전략 가이드 - 이토마토',
      description: '2025년 최신 투자 전략과 시장 분석 정보를 제공합니다.',
      keywords: '투자전략, 2025년, 시장분석, 포트폴리오'
    }
  },
  {
    id: 2,
    title: '주식 시장 분석 리포트',
    category: '시장분석',
    expert: '이분석가',
    date: '2025-05-28',
    views: 890,
    meta: {
      title: '주식 시장 분석 리포트 - 이토마토',
      description: '최신 주식 시장 동향과 전문가 분석을 확인하세요.',
      keywords: '주식시장, 분석리포트, 투자정보, 시장동향'
    }
  }
];

// 카테고리별 스타일
export const getCategoryStyle = (category) => {
  const styles = {
    '공지사항': {bg: '#EEF2FF', color: '#4F46E5'},
    '이벤트': {bg: '#F0FDF4', color: '#16A34A'},
    '업데이트': {bg: '#FEF3C7', color: '#D97706'},
    '교육': {bg: '#FDF2F8', color: '#DB2777'},
    '투자정보': {bg: '#F0F9FF', color: '#0EA5E9'},
    '시장분석': {bg: '#F3F4F6', color: '#6B7280'}
  };

  return styles[category] || {bg: '#F3F4F6', color: '#6B7280'};
};