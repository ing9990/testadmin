import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ExpertPage from './ExpertPage';
import NoticeManagement from './NoticeManagement';
import PromotionManagement from './PromotionManagement';

const HomepageManagement = () => {
  const [selectedMenu, setSelectedMenu] = useState('이벤트 관리'); // 기본값을 이벤트 관리로 변경
  const [expandedMenus, setExpandedMenus] = useState({
    '홈페이지 관리': true,
    '프로모션': true // 프로모션 메뉴도 기본으로 열어둠
  });

  // 서브메뉴 토글
  const handleToggleSubmenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // 메뉴 선택
  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  // 메인 콘텐츠 렌더링
  const renderMainContent = () => {
    switch (selectedMenu) {
      case '전문가 페이지 관리':
        return <ExpertPage/>;
      case '공지사항 관리':
        return <NoticeManagement/>;
      case '이벤트 관리':
      case '레퍼럴 코드 관리':
      case '정산 관리':
        return <PromotionManagement selectedMenu={selectedMenu}/>;
      default:
        return <ExpertPage/>;
    }
  };

  return (
      <div style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", sans-serif'
      }}>
        {/* Sidebar */}
        <Sidebar
            selectedMenu={selectedMenu}
            onMenuSelect={handleMenuSelect}
            expandedMenus={expandedMenus}
            onToggleSubmenu={handleToggleSubmenu}
        />

        {/* Main Content */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          {/* Header */}
          <Header selectedMenu={selectedMenu}/>

          {/* Main Content Area */}
          {renderMainContent()}
        </div>
      </div>
  );
};

export default HomepageManagement;