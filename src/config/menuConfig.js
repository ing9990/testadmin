import {
  FiBarChart2,
  FiBell,
  FiCreditCard,
  FiFileText,
  FiGift,
  FiGlobe,
  FiPercent,
  FiRadio,
  FiSettings,
  FiShield,
  FiTag,
  FiUser,
  FiUsers
} from 'react-icons/fi';

// 메뉴 아이템 구성
export const menuItems = [
  {icon: FiBarChart2, label: '구독', hasSubmenu: true},
  {icon: FiUsers, label: '생방송 공개네터', hasSubmenu: true},
  {icon: FiShield, label: '회원관리', hasSubmenu: true},
  {icon: FiCreditCard, label: '결제관리', hasSubmenu: true},
  {icon: FiFileText, label: '투자관리', hasSubmenu: true},
  {icon: FiRadio, label: '전문가 수익률', hasSubmenu: true},
  {icon: FiSettings, label: '강연방송 관리', hasSubmenu: true},
  {
    icon: FiGift,
    label: '프로모션',
    hasSubmenu: true,
    submenus: [
      {icon: FiTag, label: '이벤트 관리'},
      {icon: FiPercent, label: '레퍼럴 코드 관리'}
    ]
  },
  {
    icon: FiGlobe,
    label: '홈페이지 관리',
    hasSubmenu: true,
    submenus: [
      {icon: FiUser, label: '전문가 페이지 관리'},
      {icon: FiBell, label: '공지사항 관리'}
    ]
  }
];

// 페이지 제목 매핑
export const getPageTitle = (selectedMenu) => {
  switch (selectedMenu) {
    case '전문가 페이지 관리':
      return '전문가 페이지 관리';
    case '공지사항 관리':
      return '공지사항 관리';
    case '이벤트 관리':
      return '이벤트 관리';
    case '레퍼럴 코드 관리':
      return '레퍼럴 코드 관리';
    default:
      return '홈페이지 관리';
  }
};

// 활성 메뉴 체크 함수
export const isMenuActive = (menuLabel, selectedMenu) => {
  const homepageSubmenus = ['홈페이지 관리', '전문가 페이지 관리', '공지사항 관리'];
  const promotionSubmenus = ['프로모션', '이벤트 관리', '레퍼럴 코드 관리'];

  if (menuLabel === '홈페이지 관리') {
    return homepageSubmenus.includes(selectedMenu);
  }

  if (menuLabel === '프로모션') {
    return promotionSubmenus.includes(selectedMenu);
  }

  return selectedMenu === menuLabel;
};