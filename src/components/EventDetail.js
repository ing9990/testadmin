import React, {useState} from 'react';
import {
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiDollarSign,
  FiEye,
  FiPercent,
  FiPlay,
  FiPlus,
  FiStopCircle,
  FiUsers
} from 'react-icons/fi';
import {getReferralStatusStyle, referralCodes} from '../data/promotionData';

const EventDetail = ({event, onBack, onReferralSelect}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [newReferral, setNewReferral] = useState({
    code: '',
    discountRate: '',
    discountType: 'percentage',
    maxUses: ''
  });

  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === event.id);

  const handleCreateReferral = () => {
    console.log('새 레퍼럴 코드 생성:', newReferral);
    setShowCreateModal(false);
    setNewReferral(
        {code: '', discountRate: '', discountType: 'percentage', maxUses: ''});
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleStatus = (referralId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`레퍼럴 코드 ${referralId} 상태 변경: ${newStatus}`);
  };

  const CreateReferralModal = () => (
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
              backgroundColor: '#16a34a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiPercent size={20} style={{color: 'white'}}/>
            </div>
            새 레퍼럴 코드 생성
          </h2>

          <div style={{marginBottom: '20px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              레퍼럴 코드
            </label>
            <input
                type="text"
                value={newReferral.code}
                onChange={(e) => setNewReferral(
                    {...newReferral, code: e.target.value.toUpperCase()})}
                placeholder="예: SINU2025SPECIAL"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace'
                }}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                할인율/할인금액
              </label>
              <input
                  type="number"
                  value={newReferral.discountRate}
                  onChange={(e) => setNewReferral(
                      {...newReferral, discountRate: e.target.value})}
                  placeholder="30"
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
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                할인 타입
              </label>
              <select
                  value={newReferral.discountType}
                  onChange={(e) => setNewReferral(
                      {...newReferral, discountType: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              >
                <option value="percentage">%</option>
                <option value="fixed">원</option>
              </select>
            </div>
          </div>

          <div style={{marginBottom: '32px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              최대 사용 횟수
            </label>
            <input
                type="number"
                value={newReferral.maxUses}
                onChange={(e) => setNewReferral(
                    {...newReferral, maxUses: e.target.value})}
                placeholder="50"
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
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
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
            >
              취소
            </button>
            <button
                onClick={handleCreateReferral}
                disabled={!newReferral.code || !newReferral.discountRate
                    || !newReferral.maxUses}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: newReferral.code && newReferral.discountRate
                  && newReferral.maxUses ? '#16a34a' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: newReferral.code && newReferral.discountRate
                  && newReferral.maxUses ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
            >
              레퍼럴 코드 생성
            </button>
          </div>
        </div>
      </div>
  );

  return (
      <div style={{flex: 1, padding: '24px'}}>
        {/* Header */}
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
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <button
                onClick={onBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#374151',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f8fafc'}
            >
              <FiArrowLeft size={16}/>
              이벤트 목록으로
            </button>
            <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#16a34a',
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
                  boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#15803d';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#16a34a';
                  e.target.style.transform = 'translateY(0)';
                }}
            >
              <FiPlus size={16}/>
              레퍼럴 코드 생성
            </button>
          </div>

          <div style={{marginBottom: '24px'}}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              {event.name}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {event.description}
            </p>
          </div>

          {/* 통계 카드 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '12px',
              border: '1px solid #e0f2fe'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#0ea5e9',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiUsers size={20} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0c4a6e'
                  }}>
                    {event.totalRedeems}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#0369a1'
                  }}>
                    총 사용 횟수
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '1px solid #dcfce7'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#16a34a',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiDollarSign size={20} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#14532d'
                  }}>
                    ₩{event.totalRevenue.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#15803d'
                  }}>
                    총 매출
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#fefbf3',
              borderRadius: '12px',
              border: '1px solid #fde68a'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#d97706',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiPercent size={20} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    {event.referralCodeCount}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#d97706'
                  }}>
                    레퍼럴 코드
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 레퍼럴 코드 목록 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
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
              레퍼럴 코드 목록 ({eventReferralCodes.length})
            </h3>
          </div>

          <div style={{maxHeight: '600px', overflowY: 'auto'}}>
            {eventReferralCodes.map((referral, index) => {
              const statusStyle = getReferralStatusStyle(referral.status);
              const usagePercentage = (referral.currentUses / referral.maxUses)
                  * 100;

              return (
                  <div
                      key={referral.id}
                      style={{
                        padding: '20px 24px',
                        borderBottom: index < eventReferralCodes.length - 1
                            ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px'
                    }}>
                      <div style={{flex: 1}}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '8px'
                        }}>
                          <code style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937',
                            backgroundColor: '#f1f5f9',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontFamily: 'monospace'
                          }}>
                            {referral.code}
                          </code>
                          <button
                              onClick={() => handleCopyCode(referral.code)}
                              style={{
                                padding: '6px',
                                backgroundColor: copiedCode === referral.code
                                    ? '#dcfce7' : '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (copiedCode !== referral.code) {
                                  e.target.style.backgroundColor = '#f1f5f9';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (copiedCode !== referral.code) {
                                  e.target.style.backgroundColor = '#f8fafc';
                                }
                              }}
                          >
                            {copiedCode === referral.code ?
                                <FiCheck size={14} style={{color: '#16a34a'}}/>
                                :
                                <FiCopy size={14} style={{color: '#64748b'}}/>
                            }
                          </button>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                        {statusStyle.text}
                      </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '24px',
                          fontSize: '14px',
                          color: '#64748b'
                        }}>
                          <span>할인율: {referral.discountRate}{referral.discountType
                          === 'percentage' ? '%' : '원'}</span>
                          <span>유지율: {referral.retentionRate}%</span>
                          <span>매출: ₩{referral.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexShrink: 0
                      }}>
                        <button
                            onClick={() => onReferralSelect(referral)}
                            style={{
                              padding: '8px',
                              backgroundColor: '#f0f9ff',
                              border: '1px solid #e0f2fe',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e0f2fe'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f9ff'}
                        >
                          <FiEye size={16} style={{color: '#0ea5e9'}}/>
                        </button>
                        <button
                            onClick={() => handleToggleStatus(referral.id,
                                referral.status)}
                            style={{
                              padding: '8px',
                              backgroundColor: referral.status === 'active'
                                  ? '#fef3c7' : '#dcfce7',
                              border: `1px solid ${referral.status === 'active'
                                  ? '#fde68a' : '#bbf7d0'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                        >
                          {referral.status === 'active' ?
                              <FiStopCircle size={16}
                                            style={{color: '#d97706'}}/> :
                              <FiPlay size={16} style={{color: '#16a34a'}}/>
                          }
                        </button>
                      </div>
                    </div>

                    {/* 사용률 프로그레스 바 */}
                    <div style={{marginBottom: '12px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px'
                      }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      사용률
                    </span>
                        <span style={{
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                      {referral.currentUses} / {referral.maxUses}
                    </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${Math.min(usagePercentage, 100)}%`,
                          height: '100%',
                          backgroundColor: usagePercentage >= 90 ? '#dc2626'
                              : usagePercentage >= 70 ? '#d97706' : '#16a34a',
                          transition: 'width 0.3s ease'
                        }}/>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        {showCreateModal && <CreateReferralModal/>}
      </div>
  );
};

export default EventDetail;