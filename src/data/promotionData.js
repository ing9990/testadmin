// 이벤트 데이터
export const events = [
  {
    id: 1,
    name: '5060 등산모임 밴드방 이벤트',
    description: '5060 등산모임 밴드방 회원들을 위한 특별 할인 이벤트입니다.',
    accessLink: 'https://band.us/@hiking5060',
    status: 'active', // active, inactive, ended
    createdAt: '2025-06-01',
    endDate: '2025-12-31',
    totalRedeems: 45, // 실제 고객 수 합계 (23 + 15 + 7)
    totalRevenue: 0, // 실제 계산으로 대체됨
    referralCodeCount: 3
  },
  {
    id: 2,
    name: '유튜브 구독자 이벤트',
    description: '유튜브 구독자를 위한 프로모션 이벤트입니다.',
    accessLink: 'https://youtube.com/@invest_channel',
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    totalRedeems: 28, // 실제 고객 수 합계 (18 + 10)
    totalRevenue: 0, // 실제 계산으로 대체됨
    referralCodeCount: 2
  },
  {
    id: 3,
    name: '60대 골프모임 카카오톡 오픈채팅방 이벤트',
    description: '60대 골프모임 카카오톡 오픈채팅방 회원 대상 이벤트입니다.',
    accessLink: 'https://open.kakao.com/o/golf_60',
    status: 'ended',
    createdAt: '2025-04-01',
    endDate: '2025-05-31',
    totalRedeems: 12,
    totalRevenue: 0, // 실제 계산으로 대체됨
    referralCodeCount: 1
  }
];

// 서비스 원가
export const SERVICE_BASE_PRICE = 990000; // 99만원

// 레퍼럴 코드 데이터
export const referralCodes = [
  {
    id: 1,
    eventId: 1,
    eventName: '5060 등산모임 밴드방 이벤트',
    code: 'BAND2025_30',
    discountRate: 30,
    discountType: 'percentage',
    maxUses: 50,
    currentUses: 23,
    status: 'active',
    createdAt: '2025-03-16', // 정산 기준일
    endDate: '2025-12-31',
    revenue: 15939000, // 23명 × 693000원
    retentionRate: 78,
    paybackInfo: {
      creatorName: '김관리',
      contactPhone: '010-1111-1111',
      contactEmail: 'kimgwanri@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '김관리',
      paybackRate: 50000,
      totalPayback: 1000000 // 31일 유지 고객 20명 × 50000원
    },
    customers: [
      // 2025-03-16 ~ 2025-04-16 기간 가입자 (첫 번째 정산 기간)
      {
        id: 1,
        name: '김철수',
        joinDate: '2025-03-20',
        originalPrice: 990000,
        actualRevenue: 693000, // 30% 할인 후
        retained: true,
        retainedDays: 145, // 가입 후 145일째 유지중 (31일 초과)
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-04-20',
        isPaid: true
      },
      {
        id: 2,
        name: '이영희',
        joinDate: '2025-03-25',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 140,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-04-25',
        isPaid: true
      },
      {
        id: 3,
        name: '박민수',
        joinDate: '2025-04-10',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 45, // 45일 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-05-25',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-11',
        isPaid: true
      },
      {
        id: 4,
        name: '정수민',
        joinDate: '2025-04-15',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 20, // 20일만 유지 후 이탈 (31일 전 이탈)
        churDate: '2025-05-05',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-05-16',
        isPaid: false
      },

      // 2025-04-16 ~ 2025-05-16 기간 가입자 (두 번째 정산 기간)
      {
        id: 5,
        name: '홍길동',
        joinDate: '2025-04-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 112,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-21',
        isPaid: true
      },
      {
        id: 6,
        name: '강감찬',
        joinDate: '2025-05-01',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 101,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-01',
        isPaid: true
      },
      {
        id: 7,
        name: '윤지훈',
        joinDate: '2025-05-10',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 25, // 25일 유지 후 이탈 (31일 전 이탈)
        churDate: '2025-06-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-06-10',
        isPaid: false
      },

      // 2025-05-16 ~ 2025-06-16 기간 가입자 (세 번째 정산 기간)
      {
        id: 8,
        name: '김영수',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true
      },
      {
        id: 9,
        name: '최민호',
        joinDate: '2025-06-01',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 70,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-02',
        isPaid: true
      },
      {
        id: 10,
        name: '서동욱',
        joinDate: '2025-06-10',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 35, // 35일 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-07-15',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-11',
        isPaid: true
      },

      // 2025-06-16 ~ 2025-07-16 기간 가입자 (네 번째 정산 기간)
      {
        id: 11,
        name: '임재현',
        joinDate: '2025-06-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 52,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-21',
        isPaid: true
      },
      {
        id: 12,
        name: '노승현',
        joinDate: '2025-07-01',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 41,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-01',
        isPaid: true
      },
      {
        id: 13,
        name: '한민수',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 18, // 18일 유지 후 이탈 (31일 전 이탈)
        churDate: '2025-07-28',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-10',
        isPaid: false
      },

      // 2025-07-16 ~ 2025-08-16 기간 가입자 (다섯 번째 정산 기간 - 현재 진행중)
      {
        id: 14,
        name: '오성민',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 22, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false
      },
      {
        id: 15,
        name: '장유진',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 17, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-25',
        isPaid: false
      },
      {
        id: 16,
        name: '송지후',
        joinDate: '2025-08-01',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 10, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-09-01',
        isPaid: false
      },
      {
        id: 17,
        name: '배준호',
        joinDate: '2025-08-05',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: false,
        retainedDays: 5, // 5일만 유지 후 이탈
        churDate: '2025-08-10',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-09-05',
        isPaid: false
      },
      {
        id: 18,
        name: '문태현',
        joinDate: '2025-08-08',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 3, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-09-08',
        isPaid: false
      },

      // 추가 고객들
      {
        id: 19,
        name: '신동진',
        joinDate: '2025-05-25',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 77,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-25',
        isPaid: true
      },
      {
        id: 20,
        name: '권혁진',
        joinDate: '2025-06-05',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 66,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-06',
        isPaid: true
      },
      {
        id: 21,
        name: '조민석',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true
      },
      {
        id: 22,
        name: '황성호',
        joinDate: '2025-07-05',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 36,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-05',
        isPaid: true
      },
      {
        id: 23,
        name: '전우진',
        joinDate: '2025-07-30',
        originalPrice: 990000,
        actualRevenue: 693000,
        retained: true,
        retainedDays: 12, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-30',
        isPaid: false
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
    maxUses: 20,
    currentUses: 15,
    status: 'active',
    createdAt: '2025-04-01', // 정산 기준일
    endDate: '2025-12-31',
    revenue: 7425000, // 15명 × 495000원
    retentionRate: 86,
    paybackInfo: {
      creatorName: '김관리',
      contactPhone: '010-1111-1111',
      contactEmail: 'kimgwanri@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '김관리',
      paybackRate: 50000,
      totalPayback: 650000 // 31일 유지 고객 13명 × 50000원
    },
    customers: [
      {
        id: 24,
        name: '최지원',
        joinDate: '2025-04-05',
        originalPrice: 990000,
        actualRevenue: 495000, // 50% 할인
        retained: true,
        retainedDays: 126,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-06',
        isPaid: true
      },
      {
        id: 25,
        name: '정수민',
        joinDate: '2025-04-15',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 116,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-16',
        isPaid: true
      },
      {
        id: 26,
        name: '김성훈',
        joinDate: '2025-05-01',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 101,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-01',
        isPaid: true
      },
      {
        id: 27,
        name: '이준호',
        joinDate: '2025-05-10',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: false,
        retainedDays: 15, // 15일 유지 후 이탈
        churDate: '2025-05-25',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-06-10',
        isPaid: false
      },
      {
        id: 28,
        name: '박재민',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true
      },
      {
        id: 29,
        name: '윤성호',
        joinDate: '2025-06-01',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 70,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-02',
        isPaid: true
      },
      {
        id: 30,
        name: '강동현',
        joinDate: '2025-06-15',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 56,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-16',
        isPaid: true
      },
      {
        id: 31,
        name: '임도현',
        joinDate: '2025-07-01',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 41,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-01',
        isPaid: true
      },
      {
        id: 32,
        name: '조현우',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: false,
        retainedDays: 25, // 25일 유지 후 이탈
        churDate: '2025-08-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-10',
        isPaid: false
      },
      {
        id: 33,
        name: '한상민',
        joinDate: '2025-07-15',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 27, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-15',
        isPaid: false
      },
      {
        id: 34,
        name: '신재호',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 17, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-25',
        isPaid: false
      },
      {
        id: 35,
        name: '오태윤',
        joinDate: '2025-08-01',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 10, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-09-01',
        isPaid: false
      },
      {
        id: 36,
        name: '김도윤',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true
      },
      {
        id: 37,
        name: '서준혁',
        joinDate: '2025-07-05',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 36,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-05',
        isPaid: true
      },
      {
        id: 38,
        name: '정하윤',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 495000,
        retained: true,
        retainedDays: 22, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false
      }
    ]
  },
  {
    id: 3,
    eventId: 1,
    eventName: '5060 등산모임 밴드방 이벤트',
    code: 'BAND2025_20',
    discountRate: 20,
    discountType: 'percentage',
    maxUses: 100,
    currentUses: 7,
    status: 'active',
    createdAt: '2025-06-10',
    endDate: '2025-12-31',
    revenue: 5544000, // 7명 × 792000원
    retentionRate: 71,
    paybackInfo: {
      creatorName: '김관리',
      contactPhone: '010-1111-1111',
      contactEmail: 'kimgwanri@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '김관리',
      paybackRate: 50000,
      totalPayback: 250000 // 31일 유지 고객 5명 × 50000원
    },
    customers: [
      {
        id: 39,
        name: '강동욱',
        joinDate: '2025-06-15',
        originalPrice: 990000,
        actualRevenue: 792000, // 20% 할인
        retained: true,
        retainedDays: 56,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-16',
        isPaid: true
      },
      {
        id: 40,
        name: '이현준',
        joinDate: '2025-06-20',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: true,
        retainedDays: 51,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-21',
        isPaid: true
      },
      {
        id: 41,
        name: '박시현',
        joinDate: '2025-07-01',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: true,
        retainedDays: 41,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-01',
        isPaid: true
      },
      {
        id: 42,
        name: '김우진',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: false,
        retainedDays: 18, // 18일 유지 후 이탈
        churDate: '2025-07-28',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-10',
        isPaid: false
      },
      {
        id: 43,
        name: '정민호',
        joinDate: '2025-07-15',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: true,
        retainedDays: 27, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-15',
        isPaid: false
      },
      {
        id: 44,
        name: '윤준서',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: false,
        retainedDays: 10, // 10일 유지 후 이탈
        churDate: '2025-08-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-25',
        isPaid: false
      },
      {
        id: 45,
        name: '최준영',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 792000,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true
      }
    ]
  },
  {
    id: 4,
    eventId: 2,
    eventName: '유튜브 구독자 이벤트',
    code: 'YOUTUBE2025_25',
    discountRate: 25,
    discountType: 'percentage',
    maxUses: 30,
    currentUses: 18,
    status: 'active',
    createdAt: '2025-05-15',
    endDate: '2025-11-30',
    revenue: 13365000, // 18명 × 742500원
    retentionRate: 83,
    paybackInfo: {
      creatorName: '김유튜',
      contactPhone: '010-2222-2222',
      contactEmail: 'kimyoutube@example.com',
      bankName: '신한은행',
      accountNumber: '234-567-890123',
      accountHolder: '김유튜',
      paybackRate: 50000,
      totalPayback: 750000 // 31일 유지 고객 15명 × 50000원
    },
    customers: [
      {
        id: 46,
        name: '김태현',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 742500, // 25% 할인
        retained: true,
        retainedDays: 82,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-20',
        isPaid: true
      },
      {
        id: 47,
        name: '이상훈',
        joinDate: '2025-05-25',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 77,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-25',
        isPaid: true
      },
      {
        id: 48,
        name: '박진우',
        joinDate: '2025-06-01',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 70,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-02',
        isPaid: true
      },
      {
        id: 49,
        name: '정호진',
        joinDate: '2025-06-10',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 61,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-11',
        isPaid: true
      },
      {
        id: 50,
        name: '최윤호',
        joinDate: '2025-06-15',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: false,
        retainedDays: 20, // 20일 유지 후 이탈
        churDate: '2025-07-05',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-07-16',
        isPaid: false
      },
      {
        id: 51,
        name: '신동혁',
        joinDate: '2025-06-20',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 51,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-21',
        isPaid: true
      },
      {
        id: 52,
        name: '한지호',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true
      },
      {
        id: 53,
        name: '오민석',
        joinDate: '2025-07-01',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 41,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-01',
        isPaid: true
      },
      {
        id: 54,
        name: '임준혁',
        joinDate: '2025-07-05',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 37,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-05',
        isPaid: true
      },
      {
        id: 55,
        name: '노승우',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: false,
        retainedDays: 25, // 25일 유지 후 이탈
        churDate: '2025-08-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-10',
        isPaid: false
      },
      {
        id: 56,
        name: '전성민',
        joinDate: '2025-07-15',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 27, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-15',
        isPaid: false
      },
      {
        id: 57,
        name: '황도현',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 22, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false
      },
      {
        id: 58,
        name: '배준서',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: false,
        retainedDays: 12, // 12일 유지 후 이탈
        churDate: '2025-08-06',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-25',
        isPaid: false
      },
      {
        id: 59,
        name: '문시우',
        joinDate: '2025-07-30',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 12, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-30',
        isPaid: false
      },
      {
        id: 60,
        name: '서건우',
        joinDate: '2025-05-30',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 72,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-30',
        isPaid: true
      },
      {
        id: 61,
        name: '조민우',
        joinDate: '2025-06-05',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 66,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-06',
        isPaid: true
      },
      {
        id: 62,
        name: '권현수',
        joinDate: '2025-06-28',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 43,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-29',
        isPaid: true
      },
      {
        id: 63,
        name: '양준호',
        joinDate: '2025-07-08',
        originalPrice: 990000,
        actualRevenue: 742500,
        retained: true,
        retainedDays: 34,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-08',
        isPaid: true
      }
    ]
  },
  {
    id: 5,
    eventId: 2,
    eventName: '유튜브 구독자 이벤트',
    code: 'YOUTUBE2025_40',
    discountRate: 40,
    discountType: 'percentage',
    maxUses: 15,
    currentUses: 10,
    status: 'active',
    createdAt: '2025-05-20',
    endDate: '2025-11-30',
    revenue: 5940000, // 10명 × 594000원
    retentionRate: 90,
    paybackInfo: {
      creatorName: '김유튜',
      contactPhone: '010-2222-2222',
      contactEmail: 'kimyoutube@example.com',
      bankName: '신한은행',
      accountNumber: '234-567-890123',
      accountHolder: '김유튜',
      paybackRate: 50000,
      totalPayback: 400000 // 31일 유지 고객 8명 × 50000원
    },
    customers: [
      {
        id: 64,
        name: '김민재',
        joinDate: '2025-05-25',
        originalPrice: 990000,
        actualRevenue: 594000, // 40% 할인
        retained: true,
        retainedDays: 77,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-25',
        isPaid: true
      },
      {
        id: 65,
        name: '이도윤',
        joinDate: '2025-06-01',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 70,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-02',
        isPaid: true
      },
      {
        id: 66,
        name: '박서준',
        joinDate: '2025-06-10',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 61,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-11',
        isPaid: true
      },
      {
        id: 67,
        name: '정시원',
        joinDate: '2025-06-20',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 51,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-21',
        isPaid: true
      },
      {
        id: 68,
        name: '최준혁',
        joinDate: '2025-07-01',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 41,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-01',
        isPaid: true
      },
      {
        id: 69,
        name: '신우진',
        joinDate: '2025-07-10',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 32,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-08-10',
        isPaid: true
      },
      {
        id: 70,
        name: '한재민',
        joinDate: '2025-07-15',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: false,
        retainedDays: 20, // 20일 유지 후 이탈
        churDate: '2025-08-04',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-15',
        isPaid: false
      },
      {
        id: 71,
        name: '오태민',
        joinDate: '2025-07-20',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 22, // 아직 31일 안됨
        churDate: null,
        paybackStatus: 'pending',
        paybackEligibleDate: '2025-08-20',
        isPaid: false
      },
      {
        id: 72,
        name: '임현우',
        joinDate: '2025-07-25',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: false,
        retainedDays: 15, // 15일 유지 후 이탈
        churDate: '2025-08-09',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-08-25',
        isPaid: false
      },
      {
        id: 73,
        name: '노준석',
        joinDate: '2025-06-25',
        originalPrice: 990000,
        actualRevenue: 594000,
        retained: true,
        retainedDays: 46,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-07-26',
        isPaid: true
      }
    ]
  },
  {
    id: 6,
    eventId: 3,
    eventName: '60대 골프모임 카카오톡 오픈채팅방 이벤트',
    code: 'GOLF2025_35',
    discountRate: 35,
    discountType: 'percentage',
    maxUses: 25,
    currentUses: 12,
    status: 'ended',
    createdAt: '2025-04-01',
    endDate: '2025-05-31',
    revenue: 7722000, // 12명 × 643500원
    retentionRate: 75,
    paybackInfo: {
      creatorName: '박골프',
      contactPhone: '010-3333-3333',
      contactEmail: 'parkgolf@example.com',
      bankName: '우리은행',
      accountNumber: '345-678-901234',
      accountHolder: '박골프',
      paybackRate: 50000,
      totalPayback: 450000 // 31일 유지 고객 9명 × 50000원
    },
    customers: [
      {
        id: 74,
        name: '김용수',
        joinDate: '2025-04-05',
        originalPrice: 990000,
        actualRevenue: 643500, // 35% 할인
        retained: false,
        retainedDays: 45, // 45일 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-05-20',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-06',
        isPaid: true
      },
      {
        id: 75,
        name: '이상철',
        joinDate: '2025-04-10',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 121,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-11',
        isPaid: true
      },
      {
        id: 76,
        name: '박종민',
        joinDate: '2025-04-15',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 116,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-16',
        isPaid: true
      },
      {
        id: 77,
        name: '정태호',
        joinDate: '2025-04-20',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: false,
        retainedDays: 25, // 25일 유지 후 이탈
        churDate: '2025-05-15',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-05-21',
        isPaid: false
      },
      {
        id: 78,
        name: '최영진',
        joinDate: '2025-04-25',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: false,
        retainedDays: 40, // 40일 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-06-04',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-26',
        isPaid: true
      },
      {
        id: 79,
        name: '신동수',
        joinDate: '2025-05-01',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 101,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-01',
        isPaid: true
      },
      {
        id: 80,
        name: '한규호',
        joinDate: '2025-05-05',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: false,
        retainedDays: 20, // 20일 유지 후 이탈
        churDate: '2025-05-25',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-06-05',
        isPaid: false
      },
      {
        id: 81,
        name: '오민석',
        joinDate: '2025-05-10',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 92,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-10',
        isPaid: true
      },
      {
        id: 82,
        name: '임강호',
        joinDate: '2025-05-15',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: false,
        retainedDays: 35, // 35일 유지 후 이탈 (31일 후 이탈)
        churDate: '2025-06-19',
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-15',
        isPaid: true
      },
      {
        id: 83,
        name: '노재현',
        joinDate: '2025-05-20',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: false,
        retainedDays: 18, // 18일 유지 후 이탈
        churDate: '2025-06-07',
        paybackStatus: 'churned_before_31',
        paybackEligibleDate: '2025-06-20',
        isPaid: false
      },
      {
        id: 84,
        name: '전우성',
        joinDate: '2025-05-25',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 77,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-06-25',
        isPaid: true
      },
      {
        id: 85,
        name: '황성민',
        joinDate: '2025-04-30',
        originalPrice: 990000,
        actualRevenue: 643500,
        retained: true,
        retainedDays: 102,
        churDate: null,
        paybackStatus: 'payable',
        paybackEligibleDate: '2025-05-31',
        isPaid: true
      }
    ]
  }
];

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
  // 이벤트 이름에서 주요 키워드 추출
  const extractKeywords = (name) => {
    const keywords = [];

    // 플랫폼/채널 추출
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

  // 기본 코드 구조: [플랫폼]_[연도]_[할인율]_[랜덤숫자]
  let code = '';

  if (keywords.length >= 1) {
    code = `${keywords[0]}${year}`;
  } else {
    code = `EVENT${year}`;
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

// CSV 다운로드 관련 함수들 (기존 정산 관리용 - 호환성 유지)
export const generateSettlementData = () => {
  // 새로운 정산 시스템에서는 사용하지 않지만 호환성을 위해 유지
  return [];
};

export const getCompletedSettlements = () => {
  // 새로운 정산 시스템에서는 사용하지 않지만 호환성을 위해 유지
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