import React, {useState} from 'react';
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCopy,
  FiDollarSign,
  FiEdit3,
  FiPercent,
  FiPlay,
  FiStopCircle,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
  FiUserX
} from 'react-icons/fi';
import {events, getReferralStatusStyle} from '../data/promotionData';

const ReferralDetail = ({referral, onBack}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    discountRate: referral.discountRate,
    maxUses: referral.maxUses
  });

  const event = events.find(e => e.id === referral.eventId);
  const statusStyle = getReferralStatusStyle(referral.status);
  const usagePercentage = (referral.currentUses / referral.maxUses) * 100;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleToggleStatus = () => {
    const newStatus = referral.status === 'active' ? 'inactive' : 'active';
    console.log(`레퍼럴 코드 상태 변경: ${newStatus}`);
  };

  const handleSaveEdit = () => {
    console.log('레퍼럴 코드 수정:', editForm);
    setIsEditing(false);
  };

  const handleEndReferral = () => {
    setShowEndConfirm(true);
  };

  const confirmEndReferral = () => {
    console.log('레퍼럴 코드 영구 종료');
    setShowEndConfirm(false);
  };

  const ConfirmModal = () => (
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
          width: '400px',
          maxWidth: '90vw',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <FiStopCircle size={28} style={{color: '#dc2626'}}/>
          </div>

          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 12px 0'
          }}>
            레퍼럴 코드 영구 종료
          </h2>

          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            정말로 이 레퍼럴 코드를 영구적으로 종료하시겠습니까?<br/>
            이 작업은 되돌릴 수 없습니다.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
                onClick={() => setShowEndConfirm(false)}
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
                onClick={confirmEndReferral}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              영구 종료
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
              이벤트 상세로
            </button>
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isEditing ? '#6b7280' : '#4F46E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease'
                  }}
              >
                <FiEdit3 size={14}/>
                {isEditing ? '취소' : '편집'}
              </button>
              <button
                  onClick={handleToggleStatus}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: referral.status === 'active' ? '#d97706'
                        : '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease'
                  }}
              >
                {referral.status === 'active' ?
                    <><FiStopCircle size={14}/>일시중지</> :
                    <><FiPlay size={14}/>활성화</>
                }
              </button>
              <button
                  onClick={handleEndReferral}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
              >
                영구 종료
              </button>
            </div>
          </div>

          <div style={{marginBottom: '24px'}}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <code style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f2937',
                backgroundColor: '#f1f5f9',
                padding: '12px 20px',
                borderRadius: '12px',
                fontFamily: 'monospace',
                letterSpacing: '2px'
              }}>
                {referral.code}
              </code>
              <button
                  onClick={handleCopyCode}
                  style={{
                    padding: '12px',
                    backgroundColor: copiedCode ? '#dcfce7' : '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
              >
                {copiedCode ?
                    <><FiCheck size={20} style={{color: '#16a34a'}}/><span
                        style={{
                          color: '#16a34a',
                          fontSize: '14px'
                        }}>복사됨</span></> :
                    <><FiCopy size={20} style={{color: '#64748b'}}/><span
                        style={{
                          color: '#64748b',
                          fontSize: '14px'
                        }}>복사</span></>
                }
              </button>
              <span style={{
                padding: '8px 16px',
                backgroundColor: statusStyle.bg,
                color: statusStyle.color,
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
              {statusStyle.text}
            </span>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0
            }}>
              이벤트: {event?.name}
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
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#0ea5e9',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiUsers size={24} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#0c4a6e'
                  }}>
                    {referral.currentUses}
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
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#16a34a',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiDollarSign size={24} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#14532d'
                  }}>
                    ₩{referral.revenue.toLocaleString()}
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
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#d97706',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiPercent size={24} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    {referral.discountRate}{referral.discountType
                  === 'percentage' ? '%' : '원'}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#d97706'
                  }}>
                    할인율
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#fdf2f8',
              borderRadius: '12px',
              border: '1px solid #fce7f3'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ec4899',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiTrendingUp size={24} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#831843'
                  }}>
                    {referral.retentionRate}%
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#be185d'
                  }}>
                    한달 유지율
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 설정 및 사용률 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* 설정 카드 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0'
            }}>
              코드 설정
            </h3>

            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                할인율/할인금액
              </label>
              {isEditing ? (
                  <div style={{display: 'flex', gap: '8px'}}>
                    <input
                        type="number"
                        value={editForm.discountRate}
                        onChange={(e) => setEditForm(
                            {...editForm, discountRate: e.target.value})}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <span style={{
                      padding: '12px 16px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                  {referral.discountType === 'percentage' ? '%' : '원'}
                </span>
                  </div>
              ) : (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1f2937'
                  }}>
                    {referral.discountRate}{referral.discountType
                  === 'percentage' ? '%' : '원'}
                  </div>
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
                최대 사용 횟수
              </label>
              {isEditing ? (
                  <input
                      type="number"
                      value={editForm.maxUses}
                      onChange={(e) => setEditForm(
                          {...editForm, maxUses: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
              ) : (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1f2937'
                  }}>
                    {referral.maxUses}회
                  </div>
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
                생성일
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FiCalendar size={14}/>
                {referral.createdAt}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                종료일
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FiCalendar size={14}/>
                {referral.endDate}
              </div>
            </div>

            {isEditing && (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px'
                }}>
                  <button
                      onClick={() => setIsEditing(false)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                  >
                    취소
                  </button>
                  <button
                      onClick={handleSaveEdit}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                  >
                    저장
                  </button>
                </div>
            )}
          </div>

          {/* 사용률 카드 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0'
            }}>
              사용률 현황
            </h3>

            <div style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto',
                position: 'relative',
                background: `conic-gradient(${usagePercentage >= 90 ? '#dc2626'
                    : usagePercentage >= 70 ? '#d97706'
                        : '#16a34a'} ${usagePercentage
                * 3.6}deg, #f1f5f9 0deg)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {Math.round(usagePercentage)}%
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#64748b'
                  }}>
                    사용률
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  {referral.currentUses}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  사용됨
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#64748b'
                }}>
                  {referral.maxUses - referral.currentUses}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  남음
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 고객 목록 */}
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
              레퍼럴 코드 사용 고객 ({referral.customers.length})
            </h3>
          </div>

          <div style={{maxHeight: '400px', overflowY: 'auto'}}>
            {referral.customers.length > 0 ? (
                referral.customers.map((customer, index) => (
                    <div
                        key={customer.id}
                        style={{
                          padding: '16px 24px',
                          borderBottom: index < referral.customers.length - 1
                              ? '1px solid #f1f5f9' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: customer.retained ? '#dcfce7'
                              : '#fee2e2',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {customer.retained ?
                              <FiUserCheck size={16}
                                           style={{color: '#16a34a'}}/> :
                              <FiUserX size={16} style={{color: '#dc2626'}}/>
                          }
                        </div>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            {customer.name}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <FiCalendar size={10}/>
                            {customer.joinDate} 가입
                          </div>
                        </div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          ₩{customer.revenue.toLocaleString()}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: customer.retained ? '#16a34a' : '#dc2626',
                          fontWeight: '500'
                        }}>
                          {customer.retained ? '유지' : '이탈'}
                        </div>
                      </div>
                    </div>
                ))
            ) : (
                <div style={{
                  padding: '60px',
                  textAlign: 'center'
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
                    <FiUsers size={24} style={{color: '#0ea5e9'}}/>
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 8px 0'
                  }}>
                    아직 사용한 고객이 없습니다
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    레퍼럴 코드가 사용되면 여기에 고객 정보가 표시됩니다.
                  </p>
                </div>
            )}
          </div>
        </div>

        {showEndConfirm && <ConfirmModal/>}
      </div>
  );
};

export default ReferralDetail;