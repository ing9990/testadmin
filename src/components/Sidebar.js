import React, {useState} from 'react';
import {FiChevronDown, FiChevronRight} from 'react-icons/fi';
import {isMenuActive, menuItems} from '../config/menuConfig';

const Sidebar = ({
  selectedMenu,
  onMenuSelect,
  expandedMenus,
  onToggleSubmenu
}) => {
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
      transition: 'all 0.3s ease',
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
                  onToggleSubmenu(label);
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
              }}>
              {label}
            </span>
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
                        style={{
                          ...submenuItemStyle,
                          backgroundColor: selectedMenu === submenu.label
                              ? 'rgba(255,255,255,0.2)' : 'transparent'
                        }}
                        onClick={() => onMenuSelect(submenu.label)}
                        onMouseEnter={(e) => {
                          if (selectedMenu !== submenu.label) {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedMenu !== submenu.label) {
                            e.target.style.backgroundColor = 'transparent';
                          }
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
        width: '256px',
        backgroundColor: '#4F46E5',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
        minHeight: '100vh'
      }}>
        {/* 헤더 */}
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
          }}>
          이토마토 ADMIN
        </span>
        </div>

        {/* 메뉴 네비게이션 */}
        <nav style={{flex: 1, paddingTop: '8px', overflowY: 'auto'}}>
          {menuItems.map((item, index) => (
              <MenuItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu={item.hasSubmenu}
                  active={isMenuActive(item.label, selectedMenu)}
                  onClick={() => onMenuSelect(item.label)}
                  submenus={item.submenus || []}
              />
          ))}
        </nav>
      </div>
  );
};

export default Sidebar;