// 이벤트 데이터
export const events = [
  {
    id: 1,
    name: '신상원 네이버 밴드방 추천코드 이벤트',
    description: '신상원 전문가 네이버 밴드방 회원들을 위한 특별 할인 이벤트입니다.',
    accessLink: 'https://band.us/@sinusangwon2025',
    status: 'active', // active, inactive, ended
    createdAt: '2025-06-01',
    endDate: '2025-12-31',
    totalRedeems: 45,
    totalRevenue: 2250000,
    referralCodeCount: 3
  },
  {
    id: 2,
    name: '이종혁 유튜브 구독자 이벤트',
    description: '이종혁 전문가 유튜브 구독자들을 위한 프로모션 이벤트입니다.',
    accessLink: 'https://youtube.com/@jonghyuk_invest',
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    totalRedeems: 28,
    totalRevenue: 1400000,
    referralCodeCount: 2
  },
  {
    id: 3,
    name: '금산 카카오톡 오픈채팅 이벤트',
    description: '금산 전문가 카카오톡 오픈채팅방 회원 대상 이벤트입니다.',
    accessLink: 'https://open.kakao.com/o/kumsan2025',
    status: 'ended',
    createdAt: '2025-04-01',
    endDate: '2025-05-31',
    totalRedeems: 67,
    totalRevenue: 3350000,
    referralCodeCount: 4
  }
];

// 레퍼럴 코드 데이터
export const referralCodes = [
  {
    id: 1,
    eventId: 1,
    code: 'SINU2025BAND',
    discountRate: 30,
    discountType: 'percentage', // percentage, fixed
    maxUses: 50,
    currentUses: 23,
    status: 'active', // active, inactive, ended
    createdAt: '2025-06-01',
    endDate: '2025-12-31',
    revenue: 1150000,
    retentionRate: 78, // 한달 이상 유지율
    customers: [
      {
        id: 1,
        name: '김**',
        joinDate: '2025-06-02',
        retained: true,
        revenue: 50000
      },
      {
        id: 2,
        name: '이**',
        joinDate: '2025-06-03',
        retained: true,
        revenue: 50000
      },
      {
        id: 3,
        name: '박**',
        joinDate: '2025-06-05',
        retained: false,
        revenue: 50000
      },
    ]
  },
  {
    id: 2,
    eventId: 1,
    code: 'SINU2025VIP',
    discountRate: 50,
    discountType: 'percentage',
    maxUses: 20,
    currentUses: 15,
    status: 'active',
    createdAt: '2025-06-05',
    endDate: '2025-12-31',
    revenue: 750000,
    retentionRate: 86,
    customers: [
      {
        id: 4,
        name: '최**',
        joinDate: '2025-06-06',
        retained: true,
        revenue: 50000
      },
      {
        id: 5,
        name: '정**',
        joinDate: '2025-06-07',
        retained: true,
        revenue: 50000
      },
    ]
  },
  {
    id: 3,
    eventId: 1,
    code: 'SINU2025NEW',
    discountRate: 20,
    discountType: 'percentage',
    maxUses: 100,
    currentUses: 7,
    status: 'active',
    createdAt: '2025-06-10',
    endDate: '2025-12-31',
    revenue: 350000,
    retentionRate: 71,
    customers: [
      {
        id: 6,
        name: '강**',
        joinDate: '2025-06-11',
        retained: true,
        revenue: 50000
      },
    ]
  },
  {
    id: 4,
    eventId: 2,
    code: 'JONGHYUK2025',
    discountRate: 25,
    discountType: 'percentage',
    maxUses: 30,
    currentUses: 18,
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    revenue: 900000,
    retentionRate: 83,
    customers: []
  },
  {
    id: 5,
    eventId: 2,
    code: 'JONGHYUK50',
    discountRate: 40,
    discountType: 'percentage',
    maxUses: 15,
    currentUses: 10,
    status: 'active',
    createdAt: '2025-05-20',
    endDate: '2025-11-30',
    revenue: 500000,
    retentionRate: 90,
    customers: []
  }
];

// 이벤트 상태별 스타일
export const getEventStatusStyle = (status) => {
  switch (status) {
    case 'active':
      return {bg: '#dcfce7', color: '#166534', text: '진행중'};
    case 'inactive':
      return {bg: '#fef3c7', color: '#92400e', text: '일시중지'};
    case 'ended':
      return {bg: '#fee2e2', color: '#dc2626', text: '종료'};
    default:
      return {bg: '#f3f4f6', color: '#4a5568', text: '알 수 없음'};
  }
};

// 레퍼럴 코드 자동 생성 함수
export const generateReferralCode = (eventName, discountRate) => {
  // 이벤트 이름에서 주요 키워드 추출
  const extractKeywords = (name) => {
    const keywords = [];

    // 전문가 이름 추출
    if (name.includes('신상원')) {
      keywords.push('SINU');
    } else if (name.includes('이종혁')) {
      keywords.push('JONGHYUK');
    } else if (name.includes('금산')) {
      keywords.push('KUMSAN');
    } else if (name.includes('김형일')) {
      keywords.push('KIMHI');
    } else if (name.includes('이관욱')) {
      keywords.push('LEEGOW');
    }

    // 플랫폼/채널 추출
    if (name.includes('네이버') || name.includes('밴드')) {
      keywords.push('BAND');
    } else if (name.includes('유튜브')) {
      keywords.push('YOUTUBE');
    } else if (name.includes('카카오')) {
      keywords.push('KAKAO');
    } else if (name.includes('인스타')) {
      keywords.push('INSTA');
    }

    // 이벤트 타입 추출
    if (name.includes('VIP') || name.includes('특별')) {
      keywords.push('VIP');
    } else if (name.includes('신규')) {
      keywords.push('NEW');
    } else if (name.includes('할인')) {
      keywords.push('SALE');
    }

    return keywords;
  };

  const keywords = extractKeywords(eventName);
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 99) + 1;

  // 기본 코드 구조: [전문가]_[플랫폼]_[연도]_[할인율]_[랜덤숫자]
  let code = '';

  if (keywords.length >= 2) {
    code = `${keywords[0]}_${keywords[1]}_${year}`;
  } else if (keywords.length === 1) {
    code = `${keywords[0]}_${year}`;
  } else {
    code = `EVENT_${year}`;
  }

  // 할인율이 있으면 추가
  if (discountRate) {
    code += `_${discountRate}`;
  }

  // 랜덤 숫자 추가 (중복 방지)
  code += `_${randomNum.toString().padStart(2, '0')}`;

  return code;
};

// 레퍼럴 코드 중복 체크 함수
export const isReferralCodeUnique = (code) => {
  return !referralCodes.some(referral => referral.code === code);
};

// 고유한 레퍼럴 코드 생성 함수 (중복 방지)
export const generateUniqueReferralCode = (eventName, discountRate) => {
  let attempts = 0;
  let code;

  do {
    code = generateReferralCode(eventName, discountRate);
    attempts++;
  } while (!isReferralCodeUnique(code) && attempts < 10);

  // 10번 시도해도 중복이면 타임스탬프 추가
  if (attempts >= 10) {
    const timestamp = Date.now().toString().slice(-4);
    code = generateReferralCode(eventName, discountRate) + timestamp;
  }

  return code;
};

// 레퍼럴 코드 상태별 스타일
export const getReferralStatusStyle = (status) => {
  switch (status) {
    case 'active':
      return {bg: '#dcfce7', color: '#166534', text: '활성'};
    case 'inactive':
      return {bg: '#fef3c7', color: '#92400e', text: '비활성'};
    case 'ended':
      return {bg: '#fee2e2', color: '#dc2626', text: '종료'};
    default:
      return {bg: '#f3f4f6', color: '#4a5568', text: '알 수 없음'};
  }
};