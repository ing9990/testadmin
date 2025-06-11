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
    totalRedeems: 8, // 5 + 2 + 1 = 실제 고객 수 합계
    totalRevenue: 0, // 실제 계산으로 대체됨
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
    totalRedeems: 0, // 0 + 0 = 실제 고객 수 합계
    totalRevenue: 0, // 실제 계산으로 대체됨
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
    totalRevenue: 0, // 실제 계산으로 대체됨
    referralCodeCount: 4
  }
];

// 서비스 원가
export const SERVICE_BASE_PRICE = 990000; // 99만원

// 이벤트별 총 매출 계산 함수
export const calculateEventTotalRevenue = (eventId) => {
  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === eventId);

  return eventReferralCodes.reduce((total, referralCode) => {
    const discountedPrice = SERVICE_BASE_PRICE * (1 - referralCode.discountRate
        / 100);
    const codeRevenue = discountedPrice * referralCode.currentUses;
    return total + codeRevenue;
  }, 0);
};

// 이벤트별 총 사용 횟수 계산 함수
export const calculateEventTotalRedeems = (eventId) => {
  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === eventId);
  return eventReferralCodes.reduce((total, code) => total + code.currentUses,
      0);
};
export const calculateReferralRevenue = (discountRate, currentUses) => {
  const discountedPrice = SERVICE_BASE_PRICE * (1 - discountRate / 100);
  return discountedPrice * currentUses;
};

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
    // 정산 정보
    paybackInfo: {
      creatorName: '신상원',
      contactPhone: '010-1234-5678',
      contactEmail: 'sinusangwon@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '신상원',
      paybackRate: 50000, // 인당 5만원
      totalPayback: 1150000 // 23명 * 50000원
    },
    customers: [
      {
        id: 1,
        name: '김철수',
        phone: '010-1111-2222',
        joinDate: '2025-06-02',
        retained: true,
        retainedDays: 67, // 가입 후 67일째 유지중 (31일 초과)
        churDate: null,
        originalPrice: 990000,
        discountRate: 30,
        actualRevenue: 693000,
        paybackDue: 50000,
        // 정산 상태 추가
        paybackStatus: 'payable', // payable: 지급 대상, pending: 대기중, churned_before_31: 31일 전 이탈
        paybackEligibleDate: '2025-07-03', // 31일째 되는 날 (페이백 자격 획득일)
        isPaid: false // 실제 지급 여부
      },
      {
        id: 2,
        name: '이영희',
        phone: '010-2222-3333',
        joinDate: '2025-06-03',
        retained: true,
        retainedDays: 66, // 66일째 유지중 (31일 초과)
        churDate: null,
        originalPrice: 990000,
        discountRate: 30,
        actualRevenue: 693000,
        paybackDue: 50000,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-04',
        isPaid: true // 이미 지급됨
      },
      {
        id: 3,
        name: '박민수',
        phone: '010-3333-4444',
        joinDate: '2025-06-05',
        retained: false,
        retainedDays: 45, // 45일간 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-07-20',
        originalPrice: 990000,
        discountRate: 30,
        actualRevenue: 693000,
        paybackDue: 50000,
        paybackStatus: 'payable', // 31일 후 이탈이므로 지급 대상
        paybackEligibleDate: '2025-07-06',
        isPaid: false
      },
      {
        id: 7,
        name: '홍성민',
        phone: '010-7777-8888',
        joinDate: '2025-07-25', // 최근 가입자 (아직 31일 안됨)
        retained: true,
        retainedDays: 17, // 17일째 유지중
        churDate: null,
        originalPrice: 990000,
        discountRate: 30,
        actualRevenue: 693000,
        paybackDue: 50000,
        paybackStatus: 'pending', // 31일 대기중
        paybackEligibleDate: '2025-08-25', // 31일째 되는 날
        isPaid: false
      },
      {
        id: 8,
        name: '윤지훈',
        phone: '010-8888-9999',
        joinDate: '2025-07-10',
        retained: false,
        retainedDays: 20, // 20일만 유지 후 이탈
        churDate: '2025-07-30',
        originalPrice: 990000,
        discountRate: 30,
        actualRevenue: 693000,
        paybackDue: 0, // 31일 전 이탈로 페이백 없음
        paybackStatus: 'churned_before_31', // 31일 전 이탈
        paybackEligibleDate: '2025-08-10',
        isPaid: false
      }
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
    paybackInfo: {
      creatorName: '신상원',
      contactPhone: '010-1234-5678',
      contactEmail: 'sinusangwon@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '신상원',
      paybackRate: 50000,
      totalPayback: 750000 // 15명 * 50000원
    },
    customers: [
      {
        id: 4,
        name: '최지원',
        phone: '010-4444-5555',
        joinDate: '2025-06-06',
        retained: true,
        retainedDays: 63, // 63일째 유지중 (31일 초과)
        churDate: null,
        originalPrice: 990000,
        discountRate: 50,
        actualRevenue: 495000,
        paybackDue: 50000,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-07',
        isPaid: true // 이미 지급됨
      },
      {
        id: 5,
        name: '정수민',
        phone: '010-5555-6666',
        joinDate: '2025-06-07',
        retained: true,
        retainedDays: 62, // 62일째 유지중 (31일 초과)
        churDate: null,
        originalPrice: 990000,
        discountRate: 50,
        actualRevenue: 495000,
        paybackDue: 50000,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-08',
        isPaid: false
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
    paybackInfo: {
      creatorName: '신상원',
      contactPhone: '010-1234-5678',
      contactEmail: 'sinusangwon@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '신상원',
      paybackRate: 50000,
      totalPayback: 350000 // 7명 * 50000원
    },
    customers: [
      {
        id: 6,
        name: '강동욱',
        phone: '010-6666-7777',
        joinDate: '2025-06-11',
        retained: true,
        retainedDays: 58,
        churDate: null,
        originalPrice: 990000,
        discountRate: 20, // 20% 할인
        actualRevenue: 792000, // 99만원 - 20% = 79만 2천원
        paybackDue: 50000
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
    paybackInfo: {
      creatorName: '이종혁',
      contactPhone: '010-2345-6789',
      contactEmail: 'jonghyuk@example.com',
      bankName: '신한은행',
      accountNumber: '234-567-890123',
      accountHolder: '이종혁',
      paybackRate: 50000,
      totalPayback: 900000 // 18명 * 50000원
    },
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
    paybackInfo: {
      creatorName: '이종혁',
      contactPhone: '010-2345-6789',
      contactEmail: 'jonghyuk@example.com',
      bankName: '신한은행',
      accountNumber: '234-567-890123',
      accountHolder: '이종혁',
      paybackRate: 50000,
      totalPayback: 500000 // 10명 * 50000원
    },
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

// 엑셀 정산 데이터 생성 함수 (정산 완료된 항목 제외)
export const generateSettlementData = () => {
  const settlementData = [];

  events.forEach(event => {
    const eventReferralCodes = referralCodes.filter(
        code => code.eventId === event.id);

    eventReferralCodes.forEach(referralCode => {
      // 사용자가 있고, 아직 정산되지 않은 코드만 포함
      if (referralCode.currentUses > 0
          && !referralCode.paybackInfo?.isSettled) {
        // 고객 전화번호 목록 생성 (처음 2개만 표시, 나머지는 "외 N명")
        const customerPhones = referralCode.customers.map(
            customer => customer.phone);
        let displayPhones;

        if (customerPhones.length <= 2) {
          displayPhones = customerPhones.join(', ');
        } else {
          const firstTwo = customerPhones.slice(0, 2).join(', ');
          const remaining = customerPhones.length - 2;
          displayPhones = `${firstTwo} 외 ${remaining}명`;
        }

        // 매출 계산
        const totalRevenue = calculateReferralRevenue(referralCode.discountRate,
            referralCode.currentUses);

        // 페이백 금액 계산 (31일 이상 유지한 고객 수 × 5만원)
        const payableCustomers = referralCode.customers.filter(customer =>
            customer.paybackStatus === 'payable' || customer.isPaid
        ).length;
        const paybackAmount = payableCustomers * 50000;

        settlementData.push({
          eventName: event.name,
          referralCode: referralCode.code,
          creatorInfo: `${referralCode.paybackInfo?.creatorName
          || '정보없음'} | ${referralCode.paybackInfo?.creatorTitle
          || '정보없음'} | ${referralCode.paybackInfo?.contactPhone || '정보없음'}`,
          creatorName: referralCode.paybackInfo?.creatorName || '정보없음',
          creatorTitle: referralCode.paybackInfo?.creatorTitle || '정보없음',
          creatorPhone: referralCode.paybackInfo?.contactPhone || '정보없음',
          customerPhones: displayPhones || '고객 없음',
          totalCustomers: referralCode.currentUses,
          totalRevenue: totalRevenue,
          paybackAmount: paybackAmount,
          discountRate: referralCode.discountRate,
          bankInfo: `${referralCode.paybackInfo?.bankName
          || ''} ${referralCode.paybackInfo?.accountNumber
          || ''} ${referralCode.paybackInfo?.accountHolder || ''}`.trim(),
          isSettled: referralCode.paybackInfo?.isSettled || false
        });
      }
    });
  });

  return settlementData;
};

// 정산 완료된 데이터만 조회하는 함수
export const getCompletedSettlements = () => {
  const completedData = [];

  events.forEach(event => {
    const eventReferralCodes = referralCodes.filter(
        code => code.eventId === event.id);

    eventReferralCodes.forEach(referralCode => {
      if (referralCode.currentUses > 0 && referralCode.paybackInfo?.isSettled) {
        const customerPhones = referralCode.customers.map(
            customer => customer.phone);
        let displayPhones;

        if (customerPhones.length <= 2) {
          displayPhones = customerPhones.join(', ');
        } else {
          const firstTwo = customerPhones.slice(0, 2).join(', ');
          const remaining = customerPhones.length - 2;
          displayPhones = `${firstTwo} 외 ${remaining}명`;
        }

        const totalRevenue = calculateReferralRevenue(referralCode.discountRate,
            referralCode.currentUses);
        const payableCustomers = referralCode.customers.filter(customer =>
            customer.paybackStatus === 'payable' || customer.isPaid
        ).length;
        const paybackAmount = payableCustomers * 50000;

        completedData.push({
          eventName: event.name,
          referralCode: referralCode.code,
          creatorInfo: `${referralCode.paybackInfo?.creatorName
          || '정보없음'} | ${referralCode.paybackInfo?.creatorTitle
          || '정보없음'} | ${referralCode.paybackInfo?.contactPhone || '정보없음'}`,
          creatorName: referralCode.paybackInfo?.creatorName || '정보없음',
          creatorTitle: referralCode.paybackInfo?.creatorTitle || '정보없음',
          creatorPhone: referralCode.paybackInfo?.contactPhone || '정보없음',
          customerPhones: displayPhones || '고객 없음',
          totalCustomers: referralCode.currentUses,
          totalRevenue: totalRevenue,
          paybackAmount: paybackAmount,
          discountRate: referralCode.discountRate,
          bankInfo: `${referralCode.paybackInfo?.bankName
          || ''} ${referralCode.paybackInfo?.accountNumber
          || ''} ${referralCode.paybackInfo?.accountHolder || ''}`.trim(),
          isSettled: true,
          settledDate: '2025-07-31' // 정산 완료일 (예시)
        });
      }
    });
  });

  return completedData;
};

// CSV 형태로 변환하는 함수
export const convertToCSV = (data) => {
  const headers = [
    '이벤트 이름',
    '레퍼럴 코드',
    '생성자 정보',
    '고객 전화번호',
    '총 고객 수',
    '총 매출',
    '페이백 금액',
    '할인율',
    '계좌 정보'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      `"${row.eventName}"`,
      `"${row.referralCode}"`,
      `"${row.creatorInfo}"`,
      `"${row.customerPhones}"`,
      row.totalCustomers,
      row.totalRevenue,
      row.paybackAmount,
      `${row.discountRate}%`,
      `"${row.bankInfo}"`
    ].join(','))
  ].join('\n');

  return csvContent;
};

// 파일 다운로드 함수
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