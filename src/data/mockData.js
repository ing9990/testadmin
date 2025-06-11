// 카테고리 데이터
export const categories = ['공지', '이벤트', '강연방송', '아카데미', '신규오픈'];

// 전문가 데이터
export const experts = ['신상원 전문가', '이종혁 전문가', '금산 전문가', '김형일 전문가', '이관욱 전문가'];

// 공지사항 데이터
export const notices = [
  {
    id: 3216,
    title: '[중요공지] 이토마토 전문가 사칭사례 공유 및 피해예방 대책을 알려드립니다.',
    category: '공지',
    expert: null,
    date: '2025-06-10',
    views: 33307,
    meta: {
      title: '이토마토 전문가 사칭사례 공유 및 피해예방 | 이토마토',
      description: '이토마토 전문가 사칭사례와 피해예방 대책에 대해 안내드립니다.',
      keywords: '전문가, 사칭, 피해예방, 주의사항'
    }
  },
  {
    id: 3215,
    title: '[공지] 토마토 그룹 ONE - ID 전환 방법 안내(신규)',
    category: '공지',
    expert: null,
    date: '2025-06-08',
    views: 38329,
    meta: {
      title: '토마토 그룹 ONE ID 전환 방법 안내 | 이토마토',
      description: '토마토 그룹 ONE으로 ID 전환하는 방법을 안내해드립니다.',
      keywords: '토마토그룹, ONE, ID전환, 신규'
    }
  },
  {
    id: 3214,
    title: '[공지] 이토마토 비밀번호 찾기 방법 안내',
    category: '공지',
    expert: null,
    date: '2025-06-05',
    views: 31354,
    meta: {
      title: '이토마토 비밀번호 찾기 방법 | 이토마토',
      description: '이토마토 계정의 비밀번호를 찾는 방법을 안내해드립니다.',
      keywords: '비밀번호, 찾기, 계정, 로그인'
    }
  },
  {
    id: 3211,
    title: '[공지] 25년 6월 무이자 할부 이벤트',
    category: '이벤트',
    expert: null,
    date: '2025-06-03',
    views: 234,
    meta: {
      title: '25년 6월 무이자 할부 이벤트 | 이토마토',
      description: '2025년 6월 무이자 할부 이벤트를 진행합니다.',
      keywords: '무이자할부, 이벤트, 6월, 혜택'
    }
  },
  {
    id: 3210,
    title: '[이벤트] 신상원 전문가와 함께 하는 투자 여행 무료 이벤트! (~6.15 신청 마감)',
    category: '이벤트',
    expert: '신상원 전문가',
    date: '2025-06-02',
    views: 804,
    meta: {
      title: '신상원 전문가 투자 여행 무료 이벤트 | 이토마토',
      description: '신상원 전문가와 함께하는 투자 여행 무료 이벤트에 참여하세요.',
      keywords: '신상원, 전문가, 투자여행, 무료이벤트'
    }
  },
  {
    id: 3209,
    title: '[강연방송] 이종혁 전문가의 6월 야간 강연방송 (6/10, 12)',
    category: '강연방송',
    expert: '이종혁 전문가',
    date: '2025-06-01',
    views: 296,
    meta: {
      title: '이종혁 전문가 6월 야간 강연방송 | 이토마토',
      description: '이종혁 전문가의 6월 야간 강연방송 일정을 확인하세요.',
      keywords: '이종혁, 전문가, 강연방송, 야간'
    }
  },
  {
    id: 3208,
    title: '[아카데미] 금산 전문가의 "6월 종목 추천 아카데미" 6/19(목) 개강',
    category: '아카데미',
    expert: '금산 전문가',
    date: '2025-05-30',
    views: 213,
    meta: {
      title: '금산 전문가 6월 종목 추천 아카데미 | 이토마토',
      description: '금산 전문가의 6월 종목 추천 아카데미 강의를 소개합니다.',
      keywords: '금산, 전문가, 아카데미, 종목추천'
    }
  },
  {
    id: 3207,
    title: '[이벤트] 김형일 전문가의 생방송 서비스 2주 무료 체험 이벤트 (~ 5/30 금)',
    category: '이벤트',
    expert: '김형일 전문가',
    date: '2025-05-28',
    views: 850,
    meta: {
      title: '김형일 전문가 생방송 무료 체험 이벤트 | 이토마토',
      description: '김형일 전문가의 생방송 서비스를 2주간 무료로 체험해보세요.',
      keywords: '김형일, 전문가, 생방송, 무료체험'
    }
  }
];

// 카테고리별 스타일링
export const getCategoryStyle = (category) => {
  const styles = {
    '공지': {bg: '#fef3c7', color: '#92400e'},
    '이벤트': {bg: '#dcfce7', color: '#166534'},
    '강연방송': {bg: '#dbeafe', color: '#1e40af'},
    '아카데미': {bg: '#f3e8ff', color: '#6b21a8'},
    '신규오픈': {bg: '#fed7d7', color: '#c53030'}
  };
  return styles[category] || {bg: '#f3f4f6', color: '#4a5568'};
};