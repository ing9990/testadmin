import React, {useState} from 'react';
import {
  FiBarChart2,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiRadio,
  FiSettings,
  FiShield,
  FiUser,
  FiUsers
} from 'react-icons/fi';

const AdminSidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState('강연방송 관리');
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {icon: FiBarChart2, label: '구독', hasSubmenu: true},
    {icon: FiUsers, label: '생방송 공개네터', hasSubmenu: true},
    {icon: FiShield, label: '회원관리', hasSubmenu: true},
    {icon: FiCreditCard, label: '결제관리', hasSubmenu: true},
    {icon: FiFileText, label: '투자관리', hasSubmenu: true},
    {icon: FiRadio, label: '전문가 수익률', hasSubmenu: true},
    {icon: FiSettings, label: '강연방송 관리', hasSubmenu: true, active: true},
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

  const toggleSubmenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const MenuItem = ({
    icon: Icon,
    label,
    hasSubmenu,
    active,
    onClick,
    submenus = []
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isExpanded = expandedMenus[label];

    const menuItemStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      backgroundColor: active ? '#3730A3' : (isHovered ? '#3730A3'
          : 'transparent'),
      color: 'white',
      borderLeft: active ? '3px solid white' : '3px solid transparent'
    };

    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.1)',
      paddingLeft: '20px',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-out',
      maxHeight: isExpanded ? '200px' : '0px'
    };

    const submenuItemStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      color: 'rgba(255,255,255,0.9)',
      fontSize: '13px',
      fontWeight: '400'
    };

    return (
        <div>
          <div
              style={menuItemStyle}
              onClick={() => {
                if (submenus.length > 0) {
                  toggleSubmenu(label);
                } else {
                  onClick();
                }
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Icon size={16}/>
              <span style={{
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '-0.01em'
              }}>{label}</span>
            </div>
            {hasSubmenu && (
                submenus.length > 0 ? (
                    isExpanded ? <FiChevronDown size={14}/> : <FiChevronRight
                        size={14}/>
                ) : (
                    <FiChevronRight size={14}/>
                )
            )}
          </div>

          {/* 서브메뉴 */}
          {submenus.length > 0 && (
              <div style={submenuStyle}>
                {submenus.map((submenu, index) => (
                    <div
                        key={index}
                        style={submenuItemStyle}
                        onClick={() => setSelectedMenu(submenu.label)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                      <submenu.icon size={14}/>
                      <span>{submenu.label}</span>
                    </div>
                ))}
              </div>
          )}
        </div>
    );
  };

  return (
      <div style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '256px',
          backgroundColor: '#4F46E5',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
          minHeight: '100vh'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4F46E5',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              E
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '15px',
              letterSpacing: '-0.02em'
            }}>이토마토 ADMIN</span>
          </div>

          {/* Menu Items */}
          <nav style={{flex: 1, paddingTop: '8px', overflowY: 'auto'}}>
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    hasSubmenu={item.hasSubmenu}
                    active={item.active}
                    onClick={() => setSelectedMenu(item.label)}
                    submenus={item.submenus || []}
                />
            ))}
          </nav>

          {/* Footer */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center'
          }}>
            © 2025 이토마토
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          backgroundColor: '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <h2 style={{
              color: '#374151',
              marginBottom: '16px',
              fontSize: '22px',
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              선택된 메뉴: {selectedMenu}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '-0.01em',
              lineHeight: '1.5'
            }}>
              여기에 해당 메뉴의 콘텐츠가 표시됩니다.
              {selectedMenu === '전문가 페이지 관리' && (
                  <><br/><br/>전문가 투자클럽 소개의 SEO를 관리합니다.</>
              )}
              {selectedMenu === '공지사항 관리' && (
                  <><br/><br/>사이트 공지사항을 작성, 수정, 삭제할 수 있습니다.</>
              )}
            </p>
          </div>
        </div>
      </div>
  );
};

export default AdminSidebar;