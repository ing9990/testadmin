import React, {useState} from 'react';

const PaymentDetail = () => {
  const [referralCode, setReferralCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(1200000);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('일반');

  // 추천인 코드 처리
  const handleReferralCode = (code) => {
    setReferralCode(code.toUpperCase());

    // 추천인 코드에 따른 할인 적용 (예시)
    if (code.toUpperCase() === 'BAND2025_30') {
      setDiscountPercent(30);
      setDiscountAmount(360000);
      setFinalPrice(840000);
    } else if (code.toUpperCase() === 'BAND2025_50') {
      setDiscountPercent(50);
      setDiscountAmount(600000);
      setFinalPrice(600000);
    } else if (code.toUpperCase() === 'YOUTUBE2025_25') {
      setDiscountPercent(25);
      setDiscountAmount(300000);
      setFinalPrice(900000);
    } else if (code !== '') {
      // 유효하지 않은 코드
      setDiscountPercent(0);
      setDiscountAmount(0);
      setFinalPrice(1200000);
    }
  };

  return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", sans-serif'
      }}>
        {/* 헤더 */}
        <div style={{
          backgroundColor: '#c53a31',
          color: 'white',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '18px',
          fontWeight: '500',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <span style={{fontSize: '24px', cursor: 'pointer'}}>←</span>
          <span>서비스 결제</span>
        </div>

        {/* 콘텐츠 */}
        <div style={{
          backgroundColor: 'white',
          margin: '0 0 12px 0',
          padding: '24px 20px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#333'
          }}>
            여인수 전문가 생방송 서비스
          </h2>

          {/* 가격 정보 */}
          <div style={{marginBottom: '32px'}}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{color: '#666', fontSize: '16px'}}>서비스가격</span>
              <span style={{
                fontSize: '18px',
                color: '#333',
                textDecoration: discountAmount > 0 ? 'line-through' : 'none',
                opacity: discountAmount > 0 ? 0.5 : 1
              }}>
              1,200,000원
            </span>
            </div>

            {discountAmount > 0 && (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                <span style={{color: '#666', fontSize: '16px'}}>
                  할인금액
                  <span style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    추천인 {discountPercent}% 할인
                  </span>
                </span>
                    <span style={{
                      fontSize: '18px',
                      color: '#ff6b6b',
                      fontWeight: '600'
                    }}>
                  -{discountAmount.toLocaleString()}원
                </span>
                  </div>

                  <div style={{
                    height: '1px',
                    backgroundColor: '#e0e0e0',
                    margin: '20px 0'
                  }}/>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                <span style={{
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  최종 결제금액
                </span>
                    <span style={{
                      fontSize: '24px',
                      color: '#c53a31',
                      fontWeight: '700'
                    }}>
                  {finalPrice.toLocaleString()}원
                </span>
                  </div>
                </>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px'
            }}>
              <span style={{color: '#666', fontSize: '16px'}}>이벤트적용</span>
              <span style={{color: '#333', fontSize: '16px'}}>
              캐틀라 이벤트(10%)
            </span>
            </div>
          </div>

          <div style={{
            height: '1px',
            backgroundColor: '#e0e0e0',
            margin: '24px 0'
          }}/>

          {/* 결제 수단 선택 */}
          <div style={{marginBottom: '32px'}}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input
                    type="radio"
                    name="payment"
                    value="구독"
                    checked={selectedPayment === '구독'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '12px',
                      cursor: 'pointer'
                    }}
                />
                <span style={{fontSize: '16px', color: '#333'}}>
                구독 (매월 자동결제) 6개월
              </span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input
                    type="radio"
                    name="payment"
                    value="일반"
                    checked={selectedPayment === '일반'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '12px',
                      cursor: 'pointer'
                    }}
                />
                <span style={{fontSize: '16px', color: '#333'}}>
                일반 (단건 결제)
              </span>
              </label>
            </div>
          </div>

          {/* 추천인 코드 입력 */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#333'
            }}>
              추천인 코드
            </h3>
            <input
                type="text"
                value={referralCode}
                onChange={(e) => handleReferralCode(e.target.value)}
                placeholder="추천인 코드를 입력하세요"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#c53a31'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            {referralCode && discountAmount > 0 && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#c53a31'
                }}>
                  ✓ {discountPercent}% 할인이 적용되었습니다!
                </div>
            )}
            {referralCode && discountAmount === 0 && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#999'
                }}>
                  유효하지 않은 추천인 코드입니다
                </div>
            )}
          </div>

          {/* 서비스 기간 */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#333'
            }}>
              서비스 기간
            </h3>
            <div style={{
              padding: '16px',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#333'
            }}>
              2025년 06월 12일 (목) ~ 2025년 07월 12일 (토) (31일)
            </div>
          </div>
        </div>

        {/* 결제 금액 요약 */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '12px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>총 결제 금액</span>
            <span style={{color: '#c53a31'}}>
            {finalPrice.toLocaleString()} 원
          </span>
          </h3>

          <div style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '24px'
          }}>
            회원 정보 회원정보 수정은 PC에서만 가능합니다.
          </div>

          {/* 회원 정보 */}
          <div style={{marginBottom: '24px'}}>
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{
                width: '80px',
                color: '#666',
                fontSize: '14px'
              }}>팔명(ID)</span>
                <span style={{fontSize: '14px', color: '#333'}}>
                gr4nd(etoOneID16532)
              </span>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{
                width: '80px',
                color: '#666',
                fontSize: '14px'
              }}>휴대폰</span>
                <span style={{fontSize: '14px', color: '#333'}}>
                01080782258
              </span>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{
                width: '80px',
                color: '#666',
                fontSize: '14px'
              }}>이메일</span>
                <span style={{fontSize: '14px', color: '#333'}}>
                gr4nd@tomato.co.kr
              </span>
              </div>
            </div>
          </div>

          {/* 결제수단 선택 */}
          <div style={{marginBottom: '32px'}}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#333'
            }}>
              결제수단 선택
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <button style={{
                padding: '16px',
                backgroundColor: '#888',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                신용카드
              </button>
              <button style={{
                padding: '16px',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                가상계좌
              </button>
            </div>

            <div style={{
              marginTop: '12px',
              textAlign: 'right',
              fontSize: '14px',
              color: '#666'
            }}>
              카드 선택 ⓘ
            </div>
          </div>

          {/* 회원 동의 */}
          <div style={{marginBottom: '32px'}}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#333'
            }}>
              회원 동의
            </h4>
            <div
                style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <input
                      type="checkbox"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '12px',
                        cursor: 'pointer'
                      }}
                  />
                  <span style={{fontSize: '14px', color: '#666'}}>
                  개인정보 제공 및 활용 동의
                </span>
                </div>
                <button style={{
                  padding: '4px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  fontSize: '12px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  자세히보기
                </button>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <input
                      type="checkbox"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '12px',
                        cursor: 'pointer'
                      }}
                  />
                  <span style={{fontSize: '14px', color: '#666'}}>
                  서비스 이용 안내 동의
                </span>
                </div>
                <button style={{
                  padding: '4px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  fontSize: '12px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  자세히보기
                </button>
              </label>
            </div>
          </div>

          {/* 결제하기 버튼 */}
          <button style={{
            width: '100%',
            padding: '18px',
            backgroundColor: '#c53a31',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#a83229'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#c53a31'}
          >
            결제하기
          </button>
        </div>

        {/* 푸터 */}
        <div style={{
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
          backgroundColor: 'white'
        }}>
          이토마토 : 02-2128-3355 / 토마토투자자문 : 02-2128-3300
        </div>
      </div>
  );
};

export default PaymentDetail;