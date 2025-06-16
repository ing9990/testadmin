import React, {useState} from 'react';
import {
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiDollarSign,
  FiExternalLink,
  FiEye,
  FiPercent,
  FiPlay,
  FiPlus,
  FiRefreshCw,
  FiStopCircle,
  FiUsers
} from 'react-icons/fi';
import {
  calculateEventTotalRedeems,
  calculateEventTotalRevenue,
  calculateReferralRevenue,
  generateUniqueReferralCode,
  getReferralStatusStyle,
  referralCodes
} from '../data/promotionData';
import {experts} from '../data/expertsData';

const EventDetail = ({event, onBack, onReferralSelect}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newReferral, setNewReferral] = useState({
    code: '',
    discountRate: '',
    discountType: 'percentage',
    maxUses: '',
    // 정산 정보
    creatorName: '',
    contactPhone: '',
    contactEmail: '',
    residentNumber: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    // 페이백 가격
    paybackAmount: 50000,
    // 적용 가능 전문가 목록
    applicableExperts: [] // 전문가 ID 배열
  });

  const eventReferralCodes = referralCodes.filter(
      code => code.eventId === event.id);

  const handleCreateReferral = () => {
    const referralWithPayback = {
      ...newReferral,
      paybackInfo: {
        creatorName: newReferral.creatorName,
        contactPhone: newReferral.contactPhone,
        contactEmail: newReferral.contactEmail,
        residentNumber: newReferral.residentNumber,
        bankName: newReferral.bankName,
        accountNumber: newReferral.accountNumber,
        accountHolder: newReferral.accountHolder,
        paybackRate: newReferral.paybackAmount,
        totalPayback: 0
      },
      applicableExperts: newReferral.applicableExperts
    };
    console.log('새 레퍼럴 코드 생성:', referralWithPayback);
    setShowCreateModal(false);
    setNewReferral({
      code: '',
      discountRate: '',
      discountType: 'percentage',
      maxUses: '',
      creatorName: '',
      contactPhone: '',
      contactEmail: '',
      residentNumber: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      paybackAmount: 50000,
      applicableExperts: []
    });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(event.accessLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleGenerateCode = () => {
    if (newReferral.discountRate) {
      const generatedCode = generateUniqueReferralCode(event.name,
          newReferral.discountRate);
      setNewReferral({...newReferral, code: generatedCode});
    } else {
      const generatedCode = generateUniqueReferralCode(event.name);
      setNewReferral({...newReferral, code: generatedCode});
    }
  };

  const handleToggleStatus = (referralId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`레퍼럴 코드 ${referralId} 상태 변경: ${newStatus}`);
  };

  // 주민등록번호 형식 자동 변환
  const handleResidentNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    if (value.length > 6) {
      value = value.slice(0, 6) + '-' + value.slice(6);
    }

    setNewReferral({...newReferral, residentNumber: value});
  };

  // 페이백 금액 포맷팅
  const handlePaybackAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNewReferral(
        {...newReferral, paybackAmount: value ? parseInt(value) : 0});
  };

  // 전문가 선택/해제
  const handleExpertToggle = (expertId) => {
    setNewReferral(prev => ({
      ...prev,
      applicableExperts: prev.applicableExperts.includes(expertId)
          ? prev.applicableExperts.filter(id => id !== expertId)
          : [...prev.applicableExperts, expertId]
    }));
  };

  // 전문가 전체 선택/해제
  const handleSelectAllExperts = () => {
    const allExpertIds = experts.map(expert => expert.id);
    setNewReferral(prev => ({
      ...prev,
      applicableExperts: prev.applicableExperts.length === allExpertIds.length
          ? []
          : allExpertIds
    }));
  };

  // 선택된 전문가 이름 목록 가져오기
  const getSelectedExpertNames = (expertIds) => {
    return experts
    .filter(expert => expertIds.includes(expert.id))
    .map(expert => expert.name);
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
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          maxHeight: '90vh',
          overflowY: 'auto'
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
            <div style={{display: 'flex', gap: '8px'}}>
              <input
                  type="text"
                  value={newReferral.code}
                  onChange={(e) => setNewReferral(
                      {...newReferral, code: e.target.value.toUpperCase()})}
                  placeholder="예: SINU2025SPECIAL"
                  style={{
                    flex: 1,
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
              <button
                  type="button"
                  onClick={handleGenerateCode}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f0fdf4',
                    border: '2px solid #bbf7d0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#16a34a'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#dcfce7';
                    e.target.style.borderColor = '#86efac';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f0fdf4';
                    e.target.style.borderColor = '#bbf7d0';
                  }}
              >
                <FiRefreshCw size={14}/>
                자동생성
              </button>
            </div>
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

          {/* 적용 가능 전문가 선택 */}
          <div style={{marginBottom: '20px'}}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              적용 가능 전문가
            </label>

            <div style={{
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: '#f8fafc'
            }}>
              {/* 전체 선택 체크박스 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  <input
                      type="checkbox"
                      checked={newReferral.applicableExperts.length
                          === experts.length}
                      onChange={handleSelectAllExperts}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                  />
                  전체 선택 ({newReferral.applicableExperts.length}/{experts.length})
                </label>
              </div>

              {/* 전문가 목록 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                {experts.map(expert => (
                    <label key={expert.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: newReferral.applicableExperts.includes(
                          expert.id)
                          ? '#f0fdf4' : 'white',
                      border: `1px solid ${newReferral.applicableExperts.includes(
                          expert.id)
                          ? '#bbf7d0' : '#e2e8f0'}`,
                      transition: 'all 0.3s ease'
                    }}>
                      <input
                          type="checkbox"
                          checked={newReferral.applicableExperts.includes(
                              expert.id)}
                          onChange={() => handleExpertToggle(expert.id)}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer'
                          }}
                      />
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: newReferral.applicableExperts.includes(expert.id)
                            ? '#16a34a' : '#374151'
                      }}>
                        {expert.name}
                      </span>
                    </label>
                ))}
              </div>

              {/* 선택된 전문가 표시 */}
              {newReferral.applicableExperts.length > 0 && (
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '6px'
                    }}>
                      선택된 전문가:
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {getSelectedExpertNames(
                          newReferral.applicableExperts).map(name => (
                          <span key={name} style={{
                            padding: '4px 8px',
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {name}
                          </span>
                      ))}
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* 정산 정보 섹션 */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            border: '1px solid #e0f2fe',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0c4a6e',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💰 정산 정보
            </h3>

            {/* 페이백 금액 설정 */}
            <div style={{marginBottom: '16px'}}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '6px'
              }}>
                인당 페이백 금액 *
              </label>
              <div style={{position: 'relative'}}>
                <input
                    type="text"
                    value={newReferral.paybackAmount.toLocaleString()}
                    onChange={handlePaybackAmountChange}
                    placeholder="50,000"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 12px',
                      border: '2px solid #bae6fd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box',
                      fontFamily: 'monospace',
                      fontWeight: '600',
                      color: '#0c4a6e'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
                />
                <span style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '13px',
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  원
                </span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0369a1',
                  marginBottom: '6px'
                }}>
                  생성자 이름 *
                </label>
                <input
                    type="text"
                    value={newReferral.creatorName}
                    onChange={(e) => setNewReferral(
                        {...newReferral, creatorName: e.target.value})}
                    placeholder="홍길동"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '2px solid #bae6fd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0369a1',
                  marginBottom: '6px'
                }}>
                  연락처 *
                </label>
                <input
                    type="tel"
                    value={newReferral.contactPhone}
                    onChange={(e) => setNewReferral(
                        {...newReferral, contactPhone: e.target.value})}
                    placeholder="010-1234-5678"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '2px solid #bae6fd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
                />
              </div>
            </div>

            <div style={{marginBottom: '16px'}}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '6px'
              }}>
                이메일
              </label>
              <input
                  type="email"
                  value={newReferral.contactEmail}
                  onChange={(e) => setNewReferral(
                      {...newReferral, contactEmail: e.target.value})}
                  placeholder="example@email.com"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid #bae6fd',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
              />
            </div>

            <div style={{marginBottom: '16px'}}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '6px'
              }}>
                주민등록번호 *
              </label>
              <input
                  type="text"
                  value={newReferral.residentNumber}
                  onChange={handleResidentNumberChange}
                  placeholder="000000-0000000"
                  maxLength="14"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid #bae6fd',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    fontFamily: 'monospace'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0369a1',
                  marginBottom: '6px'
                }}>
                  은행명 *
                </label>
                <select
                    value={newReferral.bankName}
                    onChange={(e) => setNewReferral(
                        {...newReferral, bankName: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '2px solid #bae6fd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box',
                      backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
                >
                  <option value="">선택</option>
                  <option value="국민은행">국민은행</option>
                  <option value="신한은행">신한은행</option>
                  <option value="우리은행">우리은행</option>
                  <option value="하나은행">하나은행</option>
                  <option value="기업은행">기업은행</option>
                  <option value="농협은행">농협은행</option>
                  <option value="카카오뱅크">카카오뱅크</option>
                  <option value="토스뱅크">토스뱅크</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0369a1',
                  marginBottom: '6px'
                }}>
                  계좌번호 *
                </label>
                <input
                    type="text"
                    value={newReferral.accountNumber}
                    onChange={(e) => setNewReferral(
                        {...newReferral, accountNumber: e.target.value})}
                    placeholder="123-456-789012"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '2px solid #bae6fd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      boxSizing: 'border-box',
                      fontFamily: 'monospace'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '6px'
              }}>
                예금주명 *
              </label>
              <input
                  type="text"
                  value={newReferral.accountHolder}
                  onChange={(e) => setNewReferral(
                      {...newReferral, accountHolder: e.target.value})}
                  placeholder="홍길동 (실명과 일치해야 함)"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid #bae6fd',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={(e) => e.target.style.borderColor = '#bae6fd'}
              />
            </div>

            <div style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#dbeafe',
              borderRadius: '8px',
              border: '1px solid #93c5fd'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#1e40af',
                fontWeight: '500'
              }}>
                💡 페이백 미리보기
              </div>
              <div style={{
                fontSize: '11px',
                color: '#3730a3',
                marginTop: '4px',
                lineHeight: '1.4'
              }}>
                • 설정
                금액: <strong>₩{newReferral.paybackAmount.toLocaleString()}</strong><br/>
                • 10명 가입 시: <strong>₩{(newReferral.paybackAmount
                  * 10).toLocaleString()}</strong><br/>
                • 적용
                전문가: <strong>{newReferral.applicableExperts.length}명</strong>
              </div>
            </div>
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
                onClick={handleCreateReferral}
                disabled={!newReferral.code || !newReferral.discountRate
                    || !newReferral.maxUses ||
                    !newReferral.creatorName || !newReferral.contactPhone ||
                    !newReferral.residentNumber || !newReferral.bankName ||
                    !newReferral.accountNumber || !newReferral.accountHolder ||
                    !newReferral.paybackAmount
                    || newReferral.applicableExperts.length === 0}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: (newReferral.code && newReferral.discountRate
                      && newReferral.maxUses &&
                      newReferral.creatorName && newReferral.contactPhone &&
                      newReferral.residentNumber && newReferral.bankName &&
                      newReferral.accountNumber && newReferral.accountHolder &&
                      newReferral.paybackAmount
                      && newReferral.applicableExperts.length > 0)
                      ? '#16a34a' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: (newReferral.code && newReferral.discountRate
                      && newReferral.maxUses &&
                      newReferral.creatorName && newReferral.contactPhone &&
                      newReferral.residentNumber && newReferral.bankName &&
                      newReferral.accountNumber && newReferral.accountHolder &&
                      newReferral.paybackAmount
                      && newReferral.applicableExperts.length > 0)
                      ? 'pointer' : 'not-allowed',
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

          {/* 접속 링크 섹션 */}
          <div style={{marginBottom: '24px'}}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '12px',
              border: '1px solid #e0f2fe',
              marginBottom: '12px'
            }}>
              <div style={{flex: 1}}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#0369a1',
                  marginBottom: '4px'
                }}>
                  🔗 이벤트 접속 링크
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#0c4a6e',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {event.accessLink}
                </div>
              </div>
              <div style={{display: 'flex', gap: '8px', marginLeft: '16px'}}>
                <button
                    onClick={handleCopyLink}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: copiedLink ? '#dcfce7' : 'white',
                      border: '1px solid #e0f2fe',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      if (!copiedLink) {
                        e.target.style.backgroundColor = '#f8fafc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!copiedLink) {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                >
                  {copiedLink ?
                      <><FiCheck size={14} style={{color: '#16a34a'}}/>복사됨</> :
                      <><FiCopy size={14} style={{color: '#0ea5e9'}}/>복사</>
                  }
                </button>
                <button
                    onClick={() => window.open(event.accessLink, '_blank')}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      border: '1px solid #e0f2fe',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#0ea5e9'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  <FiExternalLink size={14}/>
                  열기
                </button>
              </div>
            </div>
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
                    {calculateEventTotalRedeems(event.id)}
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
                    ₩{calculateEventTotalRevenue(event.id).toLocaleString()}
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
              const calculatedRevenue = calculateReferralRevenue(
                  referral.discountRate, referral.currentUses);
              const applicableExpertNames = getSelectedExpertNames(
                  referral.applicableExperts || []);

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
                          color: '#64748b',
                          marginBottom: '8px'
                        }}>
                          <span>할인율: {referral.discountRate}{referral.discountType
                          === 'percentage' ? '%' : '원'}</span>
                          <span>유지율: {referral.retentionRate}%</span>
                          <span>매출: ₩{calculatedRevenue.toLocaleString()}</span>
                          <span>페이백: ₩{(referral.paybackInfo?.paybackRate
                              || 50000).toLocaleString()}/명</span>
                        </div>
                        {/* 적용 가능 전문가 표시 */}
                        {applicableExpertNames.length > 0 && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '12px',
                              color: '#64748b'
                            }}>
                              <span>적용 전문가:</span>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px'
                              }}>
                                {applicableExpertNames.map(name => (
                                    <span key={name} style={{
                                      padding: '2px 6px',
                                      backgroundColor: '#f0f9ff',
                                      color: '#0ea5e9',
                                      borderRadius: '8px',
                                      fontSize: '11px',
                                      fontWeight: '500'
                                    }}>
                                      {name}
                                    </span>
                                ))}
                              </div>
                            </div>
                        )}
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