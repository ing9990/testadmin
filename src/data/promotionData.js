// src/data/promotionData.js

// 이벤트 데이터
export const events = [
  {
    id: 1,
    name: '5060 등산모임 밴드방 이벤트',
    description: '5060 등산모임 밴드방 회원들을 위한 특별 할인 이벤트입니다.',
    accessLink: 'https://band.us/@hiking5060',
    status: 'active',
    createdAt: '2025-06-01',
    endDate: '2025-12-31',
    totalRedeems: 12,
    totalRevenue: 0,
    referralCodeCount: 2
  },
  {
    id: 2,
    name: '유튜브 구독자 이벤트',
    description: '유튜브 구독자를 위한 프로모션 이벤트입니다.',
    accessLink: 'https://youtube.com/@invest_channel',
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    totalRedeems: 8,
    totalRevenue: 0,
    referralCodeCount: 1
  },
  {
    id: 3,
    name: '60대 골프모임 카카오톡 오픈채팅방 이벤트',
    description: '60대 골프모임 카카오톡 오픈채팅방 회원 대상 이벤트입니다.',
    accessLink: 'https://open.kakao.com/o/golf_60',
    status: 'ended',
    createdAt: '2025-04-01',
    endDate: '2025-05-31',
    totalRedeems: 6,
    totalRevenue: 0,
    referralCodeCount: 1
  }
];

// 서비스 원가
export const SERVICE_BASE_PRICE = 990000; // 99만원

// 정산 상태 관리
export const settlementStatuses = {};

// 정산 상태 업데이트 함수
export const updateSettlementStatus = (referralCode, year, month, status) => {
  const key = `${referralCode}-${year}-${month}`;
  settlementStatuses[key] = {
    referralCode,
    year,
    month,
    status,
    updatedAt: new Date().toISOString()
  };
  console.log(`정산 상태 업데이트: ${referralCode} -> ${status}`);
};

// 전체 정산 상태 업데이트 함수
export const bulkUpdateSettlementStatus = (year, month, status) => {
  const data = calculateSettlementDataForMonth(year, month);
  data.forEach(item => {
    if (item.status === 'payable') {
      updateSettlementStatus(item.code, year, month, status);
    }
  });
  console.log(`${year}년 ${month}월 전체 정산 완료`);
};

// 정산 상태 조회 함수
export const getSettlementStatus = (referralCode, year, month) => {
  const key = `${referralCode}-${year}-${month}`;
  return settlementStatuses[key]?.status || null;
};

// 2025년 5월 데이터를 정산 완료로 설정
const initialize2025MaySettlements = () => {
  const mayData = calculateSettlementDataForMonth(2025, 5);
  mayData.forEach(item => {
    if (item.eligibleCustomers > 0) {
      updateSettlementStatus(item.code, 2025, 5, 'completed');
    }
  });
};

// 레퍼럴 코드 데이터
export const referralCodes = [
  {
    id: 1,
    eventId: 1,
    eventName: '5060 등산모임 밴드방 이벤트',
    code: 'BAND2025_30',
    discountRate: 30,
    discountType: 'percentage',
    maxUses: 20,
    currentUses: 8,
    status: 'active',
    createdAt: '2025-03-16',
    endDate: '2025-12-31',
    revenue: 5544000,
    retentionRate: 75,
    paybackInfo: {
      creatorName: '김관리',
      contactPhone: '010-1111-1111',
      contactEmail: 'kimgwanri@example.com',
      residentNumber: '800101-1234567',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '김관리',
      paybackRate: 50000,
      totalPayback: 400000
    },
    customers: [
      // 2025년 4월 가입자 (5월에 31일 도달)
      {
        id: 1,
        name: '김철수',
        phone: '010-1234-5678',
        joinDate: '2025-04-05',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 126,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-06',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 2,
        name: '이영희',
        phone: '010-2345-6789',
        joinDate: '2025-04-15',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: false,
        retainedDays: 25,
        churDate: '2025-05-10',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-05-16',
        isPaid: false,
        paybackDue: 0
      },
      // 2025년 5월 가입자 (6월에 31일 도달)
      {
        id: 3,
        name: '박민수',
        phone: '010-3456-7890',
        joinDate: '2025-05-10',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 92,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-10',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 4,
        name: '정수민',
        phone: '010-4567-8901',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true,
        paybackDue: 50000
      },
      // 2025년 6월 가입자 (7월에 31일 도달)
      {
        id: 5,
        name: '홍길동',
        phone: '010-5678-9012',
        joinDate: '2025-06-15',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 56,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-16',
        isPaid: true,
        paybackDue: 50000
      },
      // 2025년 7월 가입자 (8월에 31일 도달 - 아직 대기중)
      {
        id: 6,
        name: '강감찬',
        phone: '010-6789-0123',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 22,
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 7,
        name: '윤지훈',
        phone: '010-7890-1234',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: false,
        retainedDays: 12,
        churDate: '2025-08-06',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-25',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 8,
        name: '김영수',
        phone: '010-8901-2345',
        joinDate: '2025-08-01',
        originalPrice: 990000,
        actualRevenue: 693000,
        discountRate: 30,
        retained: true,
        retainedDays: 10,
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-09-01',
        isPaid: false,
        paybackDue: 0
      }
    ]
  },
  {
    id: 2,
    eventId: 1,
    eventName: '5060 등산모임 밴드방 이벤트',
    code: 'BAND2025_50',
    discountRate: 50,
    discountType: 'percentage',
    maxUses: 10,
    currentUses: 4,
    status: 'active',
    createdAt: '2025-04-01',
    endDate: '2025-12-31',
    revenue: 1980000,
    retentionRate: 100,
    paybackInfo: {
      creatorName: '박영희',
      contactPhone: '010-2222-2222',
      contactEmail: 'park@example.com',
      residentNumber: '750202-2345678',
      bankName: '신한은행',
      accountNumber: '234-567-890123',
      accountHolder: '박영희',
      paybackRate: 50000,
      totalPayback: 200000
    },
    customers: [
      {
        id: 9,
        name: '최지원',
        phone: '010-4444-5555',
        joinDate: '2025-04-10',
        originalPrice: 990000,
        actualRevenue: 495000,
        discountRate: 50,
        retained: true,
        retainedDays: 121,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-11',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 10,
        name: '정수민',
        phone: '010-5555-6666',
        joinDate: '2025-05-05',
        originalPrice: 990000,
        actualRevenue: 495000,
        discountRate: 50,
        retained: true,
        retainedDays: 97,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-05',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 11,
        name: '김성훈',
        phone: '010-6666-7777',
        joinDate: '2025-06-10',
        originalPrice: 990000,
        actualRevenue: 495000,
        discountRate: 50,
        retained: true,
        retainedDays: 61,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-11',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 12,
        name: '이준호',
        phone: '010-7777-8888',
        joinDate: '2025-07-15',
        originalPrice: 990000,
        actualRevenue: 495000,
        discountRate: 50,
        retained: true,
        retainedDays: 27,
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-15',
        isPaid: false,
        paybackDue: 0
      }
    ]
  },
  {
    id: 3,
    eventId: 2,
    eventName: '유튜브 구독자 이벤트',
    code: 'YOUTUBE2025_25',
    discountRate: 25,
    discountType: 'percentage',
    maxUses: 15,
    currentUses: 8,
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    revenue: 5940000,
    retentionRate: 87,
    paybackInfo: {
      creatorName: '김유튜브',
      contactPhone: '010-4444-4444',
      contactEmail: 'kimyoutube@example.com',
      residentNumber: '900404-1234567',
      bankName: '카카오뱅크',
      accountNumber: '3333-04-1234567',
      accountHolder: '김유튜브',
      paybackRate: 50000,
      totalPayback: 350000
    },
    customers: [
      {
        id: 13,
        name: '김태현',
        phone: '010-6666-7777',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 14,
        name: '이상훈',
        phone: '010-7777-8888',
        joinDate: '2025-06-01',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 70,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-02',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 15,
        name: '박진우',
        phone: '010-8888-9999',
        joinDate: '2025-06-15',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: false,
        retainedDays: 20,
        churDate: '2025-07-05',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-07-16',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 16,
        name: '정호진',
        phone: '010-9999-0000',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 17,
        name: '최윤호',
        phone: '010-0000-1111',
        joinDate: '2025-07-05',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 37,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-05',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 18,
        name: '신동혁',
        phone: '010-1111-2222',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 22,
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 19,
        name: '한지호',
        phone: '010-2222-3333',
        joinDate: '2025-08-01',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: true,
        retainedDays: 10,
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-09-01',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 20,
        name: '오민석',
        phone: '010-3333-4444',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 742500,
        discountRate: 25,
        retained: false,
        retainedDays: 25,
        churDate: '2025-08-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-10',
        isPaid: false,
        paybackDue: 0
      }
    ]
  },
  {
    id: 4,
    eventId: 3,
    eventName: '60대 골프모임 카카오톡 오픈채팅방 이벤트',
    code: 'GOLF2025_35',
    discountRate: 35,
    discountType: 'percentage',
    maxUses: 10,
    currentUses: 6,
    status: 'ended',
    createdAt: '2025-04-01',
    endDate: '2025-05-31',
    revenue: 3861000,
    retentionRate: 83,
    paybackInfo: {
      creatorName: '박골프',
      contactPhone: '010-6666-6666',
      contactEmail: 'parkgolf@example.com',
      residentNumber: '650606-1234567',
      bankName: '하나은행',
      accountNumber: '123-45-678901',
      accountHolder: '박골프',
      paybackRate: 50000,
      totalPayback: 250000
    },
    customers: [
      {
        id: 21,
        name: '김용수',
        phone: '010-4444-5555',
        joinDate: '2025-04-05',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: false,
        retainedDays: 45,
        churDate: '2025-05-20',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-06',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 22,
        name: '이상철',
        phone: '010-5555-6666',
        joinDate: '2025-04-15',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: true,
        retainedDays: 116,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-16',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 23,
        name: '박종민',
        phone: '010-6666-7777',
        joinDate: '2025-04-25',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: false,
        retainedDays: 25,
        churDate: '2025-05-20',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-05-26',
        isPaid: false,
        paybackDue: 0
      },
      {
        id: 24,
        name: '정태호',
        phone: '010-7777-8888',
        joinDate: '2025-05-01',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: true,
        retainedDays: 101,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-01',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 25,
        name: '최영진',
        phone: '010-8888-9999',
        joinDate: '2025-05-10',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: true,
        retainedDays: 92,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-10',
        isPaid: true,
        paybackDue: 50000
      },
      {
        id: 26,
        name: '신동수',
        phone: '010-9999-0000',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 643500,
        discountRate: 35,
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true,
        paybackDue: 50000
      }
    ]
  }
];

// 초기화 함수 호출
setTimeout(() => {
  initialize2025MaySettlements();
}, 100);

// 이벤트별 총 매출 계산 함수
export const calculateEventTotalRevenue = (eventId) => {
  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === eventId);
  return eventReferralCodes.reduce((total, referralCode) => {
    return total + referralCode.revenue;
  }, 0);
};

// 이벤트별 총 사용 횟수 계산 함수
export const calculateEventTotalRedeems = (eventId) => {
  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === eventId);
  return eventReferralCodes.reduce((total, code) => total + code.currentUses,
      0);
};

// 레퍼럴 코드별 매출 계산 함수
export const calculateReferralRevenue = (discountRate, currentUses) => {
  const discountedPrice = SERVICE_BASE_PRICE * (1 - discountRate / 100);
  return discountedPrice * currentUses;
};

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
  const extractKeywords = (name) => {
    const keywords = [];
    if (name.includes('밴드')) {
      keywords.push('BAND');
    } else if (name.includes('유튜브')) {
      keywords.push('YOUTUBE');
    } else if (name.includes('카카오')) {
      keywords.push('KAKAO');
    } else if (name.includes('골프')) {
      keywords.push('GOLF');
    } else if (name.includes('등산')) {
      keywords.push('HIKING');
    }
    return keywords;
  };

  const keywords = extractKeywords(eventName);
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 99) + 1;

  let code = keywords.length >= 1 ? `${keywords[0]}${year}` : `EVENT${year}`;
  if (discountRate) {
    code += `_${discountRate}`;
  }
  code += `_${randomNum.toString().padStart(2, '0')}`;

  return code;
};

// 레퍼럴 코드 중복 체크 함수
export const isReferralCodeUnique = (code) => {
  return !referralCodes.some(referral => referral.code === code);
};

// 고유한 레퍼럴 코드 생성 함수
export const generateUniqueReferralCode = (eventName, discountRate) => {
  let attempts = 0;
  let code;

  do {
    code = generateReferralCode(eventName, discountRate);
    attempts++;
  } while (!isReferralCodeUnique(code) && attempts < 10);

  if (attempts >= 10) {
    const timestamp = Date.now().toString().slice(-4);
    code = generateReferralCode(eventName, discountRate) + timestamp;
  }

  return code;
};

// 페이백 상태별 스타일
export const getPaybackStatusStyle = (status, isPaid) => {
  if (isPaid) {
    return {
      bg: '#f0fdf4',
      color: '#15803d',
      text: '✓ 지급완료',
      border: '#bbf7d0'
    };
  }

  switch (status) {
    case 'payable':
      return {
        bg: '#fef3c7',
        color: '#d97706',
        text: '💰 지급대상',
        border: '#fde68a'
      };
    case 'pending':
      return {
        bg: '#f0f9ff',
        color: '#0369a1',
        text: '⏳ 대기중',
        border: '#bae6fd'
      };
    case 'churned_before_31':
      return {
        bg: '#fef2f2',
        color: '#dc2626',
        text: '✗ 지급불가',
        border: '#fecaca'
      };
    default:
      return {
        bg: '#f3f4f6',
        color: '#4a5568',
        text: '미정',
        border: '#d1d5db'
      };
  }
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

// 특정 월의 정산 데이터 계산 함수
export const calculateSettlementDataForMonth = (year, month) => {
  const targetDate = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month, 0);

  const settlementData = referralCodes.map(referralCode => {
    // 해당 월에 31일 도달하는 고객들
    const eligibleCustomers = referralCode.customers.filter(customer => {
      const joinDate = new Date(customer.joinDate);
      const eligibleDate = new Date(joinDate);
      eligibleDate.setDate(eligibleDate.getDate() + 31);

      // 31일 도달일이 해당 월에 속하는지 확인
      if (eligibleDate >= targetDate && eligibleDate <= nextMonth) {
        // 이탈했다면 31일 이상 유지했는지 확인
        if (customer.churDate) {
          const churnDate = new Date(customer.churDate);
          const retentionDays = Math.floor(
              (churnDate - joinDate) / (1000 * 60 * 60 * 24));
          return retentionDays >= 31;
        }
        // 아직 유지중이라면 현재까지 31일 이상인지 확인
        const now = new Date();
        const daysSinceJoin = Math.floor(
            (now - joinDate) / (1000 * 60 * 60 * 24));
        return daysSinceJoin >= 31;
      }
      return false;
    });

    // 해당 월 신규 가입자
    const newCustomers = referralCode.customers.filter(customer => {
      const joinDate = new Date(customer.joinDate);
      return joinDate >= targetDate && joinDate <= nextMonth;
    });

    const paybackAmount = eligibleCustomers.length * 50000;
    const newRevenue = newCustomers.reduce(
        (sum, customer) => sum + customer.actualRevenue, 0);

    // 정산 상태 확인
    const settlementStatus = getSettlementStatus(referralCode.code, year,
        month);

    return {
      eventId: referralCode.eventId,
      eventName: referralCode.eventName,
      code: referralCode.code,
      discountRate: referralCode.discountRate,
      creatorInfo: referralCode.paybackInfo,
      eligibleCustomers: eligibleCustomers.length,
      eligibleCustomerList: eligibleCustomers,
      paybackAmount,
      newCustomers: newCustomers.length,
      newCustomerList: newCustomers,
      newRevenue,
      totalCustomers: referralCode.customers.length,
      status: eligibleCustomers.length > 0 ? 'payable' : 'none',
      settlementStatus: settlementStatus || (eligibleCustomers.length > 0
          ? 'pending' : 'none')
    };
  });

  return settlementData;
};

// 월별 정산 요약 데이터 생성 함수
export const getMonthlySettlementSummary = (year, month) => {
  const data = calculateSettlementDataForMonth(year, month);

  return {
    year,
    month,
    totalEligibleCustomers: data.reduce(
        (sum, item) => sum + item.eligibleCustomers, 0),
    totalPayback: data.reduce((sum, item) => sum + item.paybackAmount, 0),
    totalNewCustomers: data.reduce((sum, item) => sum + item.newCustomers, 0),
    totalNewRevenue: data.reduce((sum, item) => sum + item.newRevenue, 0),
    payableCodesCount: data.filter(item => item.status === 'payable').length,
    totalCodes: data.length,
    details: data.filter(item => item.eligibleCustomers > 0)
  };
};

// 연도별 정산 데이터 생성 함수
export const getYearlySettlementData = (year) => {
  const monthlyData = [];

  for (let month = 1; month <= 12; month++) {
    const summary = getMonthlySettlementSummary(year, month);
    if (summary.totalEligibleCustomers > 0) {
      monthlyData.push({
        ...summary,
        label: `${year}년 ${month}월`
      });
    }
  }

  return monthlyData;
};

// CSV 다운로드 관련 함수들 (기존 정산 관리용 - 호환성 유지)
export const generateSettlementData = () => {
  return [];
};

export const getCompletedSettlements = () => {
  return [];
};

export const convertToCSV = (data) => {
  const headers = Object.keys(data[0] || {});
  const csvContent = [
    headers.join(','),
    ...data.map(
        row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  return csvContent;
};

export const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], {type: contentType});
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};