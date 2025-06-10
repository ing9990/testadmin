import React, {useState} from 'react';
import {
  FiBarChart2,
  FiCalendar,
  FiChevronRight,
  FiCreditCard,
  FiEdit3,
  FiFileText,
  FiGlobe,
  FiRadio,
  FiRotateCcw,
  FiSave,
  FiSearch,
  FiSettings,
  FiShield,
  FiTag,
  FiUser,
  FiUsers,
  FiX
} from 'react-icons/fi';

const HomepageManagement = () => {
  const [selectedMenu, setSelectedMenu] = useState('홈페이지 관리');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    metaDescription: '',
    keywords: ''
  });

  const categories = ['공지', '이벤트', '강연방송', '아카데미', '신규오픈'];
  const experts = ['신상원 전문가', '이종혁 전문가', '금산 전문가', '김형일 전문가', '이관욱 전문가'];

  const notices = [
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

  const menuItems = [
    {icon: FiBarChart2, label: '구독', hasSubmenu: true},
    {icon: FiUsers, label: '생방송 공개네터', hasSubmenu: true},
    {icon: FiShield, label: '회원관리', hasSubmenu: true},
    {icon: FiCreditCard, label: '결제관리', hasSubmenu: true},
    {icon: FiFileText, label: '투자관리', hasSubmenu: true},
    {icon: FiRadio, label: '전문가 수익률', hasSubmenu: true},
    {icon: FiSettings, label: '강연방송 관리', hasSubmenu: true},
    {
      icon: FiGlobe,
      label: '홈페이지 관리',
      hasSubmenu: true,
      active: selectedMenu === '홈페이지 관리'
    }
  ];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(
            searchTerm.toLowerCase()) ||
        notice.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.meta.description.toLowerCase().includes(searchTerm.toLowerCase())
        ||
        notice.meta.keywords.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0
        || selectedCategories.includes(notice.category);
    const matchesExpert = selectedExperts.length === 0 || (notice.expert
        && selectedExperts.includes(notice.expert));

    return matchesSearch && matchesCategory && matchesExpert;
  });

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  const handleExpertToggle = (expert) => {
    setSelectedExperts(prev =>
        prev.includes(expert)
            ? prev.filter(e => e !== expert)
            : [...prev, expert]
    );
  };

  const handleNoticeSelect = (notice) => {
    setSelectedNotice(notice);
    setEditForm({
      title: notice.meta.title,
      metaDescription: notice.meta.description,
      keywords: notice.meta.keywords
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    // 실제로는 API 호출하여 저장
    console.log('저장된 메타 데이터:', editForm);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (selectedNotice) {
      setEditForm({
        title: selectedNotice.meta.title,
        metaDescription: selectedNotice.meta.description,
        keywords: selectedNotice.meta.keywords
      });
    }
  };

  const MenuItem = ({icon: Icon, label, hasSubmenu, active, onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

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

    return (
        <div
            style={menuItemStyle}
            onClick={onClick}
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
          {hasSubmenu && <FiChevronRight size={14}/>}
        </div>
    );
  };

  const FilterTag = ({text, onRemove, type}) => (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        backgroundColor: type === 'category' ? '#EEF2FF' : type === 'expert'
            ? '#F0FDF4' : '#FEF3C7',
        color: type === 'category' ? '#4F46E5' : type === 'expert' ? '#16A34A'
            : '#D97706',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        border: `1px solid ${type === 'category' ? '#C7D2FE' : type === 'expert'
            ? '#BBF7D0' : '#FDE68A'}`
      }}>
        {text}
        <FiX
            size={12}
            style={{cursor: 'pointer', opacity: 0.7}}
            onClick={onRemove}
        />
      </div>
  );

  return (
      <div style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", sans-serif'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '256px',
          backgroundColor: '#4F46E5',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
          minHeight: '100vh'
        }}>
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

          <nav style={{flex: 1, paddingTop: '8px'}}>
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    hasSubmenu={item.hasSubmenu}
                    active={item.active}
                    onClick={() => setSelectedMenu(item.label)}
                />
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          {/* Header */}
          <div style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              홈페이지 관리
            </h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <span style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>남은 시간: 54분 11초</span>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiUser size={16} style={{color: '#6b7280'}}/>
              </div>
            </div>
          </div>

          <div style={{flex: 1, display: 'flex', gap: '24px', padding: '24px'}}>
            {/* Left Panel - Notice List */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              {/* Search and Filters */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                {/* Search Bar */}
                <div style={{position: 'relative', marginBottom: '20px'}}>
                  <FiSearch style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                    fontSize: '18px'
                  }}/>
                  <input
                      type="text"
                      placeholder="제목, 메타데이터로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: 'calc(100% - 24px)',
                        padding: '14px 16px 14px 48px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8fafc',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#4F46E5';
                        e.target.style.backgroundColor = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.backgroundColor = '#f8fafc';
                      }}
                  />
                </div>

                {/* Category Filters */}
                <div style={{marginBottom: '16px'}}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <FiTag size={16} style={{color: '#4F46E5'}}/>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                    카테고리
                  </span>
                  </div>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            style={{
                              padding: '8px 16px',
                              border: selectedCategories.includes(category)
                                  ? '2px solid #4F46E5'
                                  : '2px solid #e2e8f0',
                              backgroundColor: selectedCategories.includes(
                                  category)
                                  ? '#4F46E5'
                                  : 'white',
                              color: selectedCategories.includes(category)
                                  ? 'white'
                                  : '#374151',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                        >
                          {category}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Expert Filters */}
                <div style={{marginBottom: '16px'}}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <FiUser size={16} style={{color: '#16A34A'}}/>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                    전문가
                  </span>
                  </div>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    {experts.map(expert => (
                        <button
                            key={expert}
                            onClick={() => handleExpertToggle(expert)}
                            style={{
                              padding: '8px 16px',
                              border: selectedExperts.includes(expert)
                                  ? '2px solid #16A34A'
                                  : '2px solid #e2e8f0',
                              backgroundColor: selectedExperts.includes(expert)
                                  ? '#16A34A'
                                  : 'white',
                              color: selectedExperts.includes(expert)
                                  ? 'white'
                                  : '#374151',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                        >
                          {expert}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategories.length > 0 || selectedExperts.length > 0)
                    && (
                        <div style={{
                          borderTop: '1px solid #e2e8f0',
                          paddingTop: '16px',
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          {selectedCategories.map(category => (
                              <FilterTag
                                  key={category}
                                  text={category}
                                  type="category"
                                  onRemove={() => handleCategoryToggle(
                                      category)}
                              />
                          ))}
                          {selectedExperts.map(expert => (
                              <FilterTag
                                  key={expert}
                                  text={expert}
                                  type="expert"
                                  onRemove={() => handleExpertToggle(expert)}
                              />
                          ))}
                        </div>
                    )}
              </div>

              {/* Notice List */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                flex: 1
              }}>
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    공지사항 목록 ({filteredNotices.length})
                  </h3>
                </div>

                <div style={{maxHeight: '600px', overflowY: 'auto'}}>
                  {filteredNotices.map((notice, index) => (
                      <div
                          key={notice.id}
                          onClick={() => handleNoticeSelect(notice)}
                          style={{
                            padding: '16px 24px',
                            borderBottom: index < filteredNotices.length - 1
                                ? '1px solid #f1f5f9' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: selectedNotice?.id === notice.id
                                ? '#f0f9ff' : 'white',
                            borderLeft: selectedNotice?.id === notice.id
                                ? '4px solid #0ea5e9' : '4px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedNotice?.id !== notice.id) {
                              e.target.style.backgroundColor = '#f8fafc';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedNotice?.id !== notice.id) {
                              e.target.style.backgroundColor = 'white';
                            }
                          }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '12px'
                        }}>
                          <h4 style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1e293b',
                            flex: 1,
                            lineHeight: '1.4',
                            paddingRight: '16px'
                          }}>
                            {notice.title}
                          </h4>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flexShrink: 0
                          }}>
                        <span style={{
                          fontSize: '11px',
                          color: '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <FiCalendar size={11}/>
                          {notice.date}
                        </span>
                            {notice.views && (
                                <span style={{
                                  fontSize: '11px',
                                  color: '#64748b'
                                }}>
                            조회 {notice.views.toLocaleString()}
                          </span>
                            )}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center'
                        }}>
                      <span style={{
                        padding: '3px 8px',
                        backgroundColor: notice.category === '공지' ? '#fef3c7' :
                            notice.category === '이벤트' ? '#dcfce7' :
                                notice.category === '강연방송' ? '#dbeafe' :
                                    notice.category === '아카데미' ? '#f3e8ff' :
                                        notice.category === '신규오픈' ? '#fed7d7'
                                            : '#f3f4f6',
                        color: notice.category === '공지' ? '#92400e' :
                            notice.category === '이벤트' ? '#166534' :
                                notice.category === '강연방송' ? '#1e40af' :
                                    notice.category === '아카데미' ? '#6b21a8' :
                                        notice.category === '신규오픈' ? '#c53030'
                                            : '#4a5568',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '500'
                      }}>
                        {notice.category}
                      </span>
                          {notice.expert && (
                              <span style={{
                                fontSize: '12px',
                                color: '#64748b'
                              }}>
                          {notice.expert}
                        </span>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Meta Editor */}
            <div style={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {selectedNotice ? (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    height: 'fit-content'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        SEO 메타데이터
                      </h3>
                      <button
                          onClick={() => setIsEditing(!isEditing)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: isEditing ? '#dc2626' : '#4F46E5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.3s ease'
                          }}
                      >
                        <FiEdit3 size={12}/>
                        {isEditing ? '취소' : '편집'}
                      </button>
                    </div>

                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        선택된 공지사항
                      </h4>
                      <p style={{
                        fontSize: '13px',
                        color: '#64748b',
                        margin: 0,
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        {selectedNotice.title}
                      </p>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Title 태그
                      </label>
                      {isEditing ? (
                          <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm(
                                  {...editForm, title: e.target.value})}
                              style={{
                                width: 'calc(100% - 24px)',
                                padding: '12px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '13px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                          />
                      ) : (
                          <p style={{
                            fontSize: '13px',
                            color: '#1e293b',
                            margin: 0,
                            padding: '12px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}>
                            {editForm.title}
                          </p>
                      )}
                    </div>

                    <div style={{marginBottom: '20px'}}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Meta Description
                      </label>
                      {isEditing ? (
                          <textarea
                              value={editForm.metaDescription}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                metaDescription: e.target.value
                              })}
                              rows={3}
                              style={{
                                width: 'calc(100% - 24px)',
                                padding: '12px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '13px',
                                outline: 'none',
                                resize: 'vertical',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                          />
                      ) : (
                          <p style={{
                            fontSize: '13px',
                            color: '#1e293b',
                            margin: 0,
                            padding: '12px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            lineHeight: '1.5'
                          }}>
                            {editForm.metaDescription}
                          </p>
                      )}
                    </div>

                    <div style={{marginBottom: '24px'}}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Keywords
                      </label>
                      {isEditing ? (
                          <input
                              type="text"
                              value={editForm.keywords}
                              onChange={(e) => setEditForm(
                                  {...editForm, keywords: e.target.value})}
                              placeholder="키워드를 쉼표로 구분하여 입력하세요"
                              style={{
                                width: 'calc(100% - 24px)',
                                padding: '12px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '13px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                          />
                      ) : (
                          <p style={{
                            fontSize: '13px',
                            color: '#1e293b',
                            margin: 0,
                            padding: '12px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}>
                            {editForm.keywords}
                          </p>
                      )}
                    </div>

                    {isEditing && (
                        <div style={{display: 'flex', gap: '12px'}}>
                          <button
                              onClick={handleSave}
                              style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#16a34a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
                          >
                            <FiSave size={14}/>
                            수정
                          </button>
                          <button
                              onClick={handleReset}
                              style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#6b7280',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                          >
                            <FiRotateCcw size={14}/>
                            되돌리기
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                    height: 'fit-content'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px auto'
                    }}>
                      <FiEdit3 size={24} style={{color: '#0ea5e9'}}/>
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#374151',
                      margin: '0 0 8px 0'
                    }}>
                      공지사항을 선택하세요
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      왼쪽 목록에서 공지사항을 선택하면<br/>
                      SEO 메타데이터를 편집할 수 있습니다.
                    </p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomepageManagement;