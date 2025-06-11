import React, {useState} from 'react';
import {
  FiCalendar,
  FiDollarSign,
  FiPlus,
  FiSearch,
  FiTag,
  FiUsers
} from 'react-icons/fi';
import {events, getEventStatusStyle} from '../data/promotionData';

const EventManagement = ({onEventSelect}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    endDate: ''
  });

  const filteredEvents = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = () => {
    console.log('새 이벤트 생성:', newEvent);
    setShowCreateModal(false);
    setNewEvent({name: '', description: '', endDate: ''});
  };

  const CreateEventModal = () => (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          width: '500px',
          maxWidth: '90vw',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4F46E5',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiPlus size={20} style={{color: 'white'}}/>
            </div>
            새 이벤트 생성
          </h2>

          <div style={{marginBottom: '20px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              이벤트 이름
            </label>
            <input
                type="text"
                value={newEvent.name}
                onChange={(e) => setNewEvent(
                    {...newEvent, name: e.target.value})}
                placeholder="예: 신상원 네이버 밴드방 추천코드 이벤트"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              이벤트 설명
            </label>
            <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent(
                    {...newEvent, description: e.target.value})}
                placeholder="이벤트에 대한 간단한 설명을 입력하세요"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{marginBottom: '32px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              종료 날짜
            </label>
            <input
                type="date"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent(
                    {...newEvent, endDate: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
            >
              취소
            </button>
            <button
                onClick={handleCreateEvent}
                disabled={!newEvent.name || !newEvent.description}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: newEvent.name && newEvent.description
                      ? '#4F46E5' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: newEvent.name && newEvent.description ? 'pointer'
                      : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (newEvent.name && newEvent.description) {
                    e.target.style.backgroundColor = '#3730A3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (newEvent.name && newEvent.description) {
                    e.target.style.backgroundColor = '#4F46E5';
                  }
                }}
            >
              이벤트 생성
            </button>
          </div>
        </div>
      </div>
  );

  return (
      <div style={{flex: 1, padding: '24px'}}>
        {/* Header Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                이벤트 관리
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                프로모션 이벤트를 생성하고 관리할 수 있습니다
              </p>
            </div>
            <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3730A3';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(79,70,229,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4F46E5';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(79,70,229,0.3)';
                }}
            >
              <FiPlus size={16}/>
              새 이벤트 생성
            </button>
          </div>

          {/* Search Bar */}
          <div style={{position: 'relative'}}>
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
                placeholder="이벤트 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
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
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {filteredEvents.map((event) => {
            const statusStyle = getEventStatusStyle(event.status);

            return (
                <div
                    key={event.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }}
                    onClick={() => onEventSelect(event)}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{flex: 1}}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 8px 0',
                        lineHeight: '1.4'
                      }}>
                        {event.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        {event.description}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      flexShrink: 0,
                      marginLeft: '12px'
                    }}>
                  {statusStyle.text}
                </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '12px',
                      border: '1px solid #e0f2fe'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <FiUsers size={16} style={{color: '#0ea5e9'}}/>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#0369a1'
                        }}>
                      총 사용
                    </span>
                      </div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#0c4a6e'
                      }}>
                        {event.totalRedeems}
                      </div>
                    </div>

                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      border: '1px solid #dcfce7'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <FiDollarSign size={16} style={{color: '#16a34a'}}/>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#15803d'
                        }}>
                      총 매출
                    </span>
                      </div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#14532d'
                      }}>
                        ₩{event.totalRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      <FiCalendar size={12}/>
                      {event.createdAt} ~ {event.endDate}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#4F46E5',
                      fontWeight: '500'
                    }}>
                      <FiTag size={12}/>
                      {event.referralCodeCount}개 코드
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '60px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#f0f9ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <FiSearch size={32} style={{color: '#0ea5e9'}}/>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                검색 결과가 없습니다
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                다른 검색어로 시도해보시거나 새 이벤트를 생성해보세요.
              </p>
            </div>
        )}

        {showCreateModal && <CreateEventModal/>}
      </div>
  );
};

export default EventManagement;