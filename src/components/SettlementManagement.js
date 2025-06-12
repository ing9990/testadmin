// src/components/SettlementManagement.js
import React, {useMemo, useState} from 'react';
import {
  FiCalendar,
  FiDollarSign,
  FiDownload,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import {referralCodes} from '../data/promotionData';

const SettlementManagement = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // 현재 날짜 기준으로 정산 기간 계산
  const calculateSettlementPeriod = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();

    // 현재 정산 기간 계산 (레퍼럴 코드 생성일 기준)
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const createdDay = created.getDate();

    // 현재 정산 기간의 시작일
    let periodStart = new Date(currentYear, currentMonth, createdDay);
    if (periodStart > now) {
      // 아직 이번 달 정산일이 안 되었으면 이전 달
      periodStart = new Date(currentYear, currentMonth - 1, createdDay);
    }

    // 정산 기간 종료일 (다음 달 같은 날)
    const periodEnd = new Date(periodStart.getFullYear(),
        periodStart.getMonth() + 1, periodStart.getDate());

    return {periodStart, periodEnd};
  };

  // 31일 유지 여부 확인
  const checkRetention31Days = (customer) => {
    const joinDate = new Date(customer.joinDate);
    const now = new Date();

    if (customer.churDate) {
      const churnDate = new Date(customer.churDate);
      const retentionDays = Math.floor(
          (churnDate - joinDate) / (1000 * 60 * 60 * 24));
      return retentionDays >= 31;
    }

    // 아직 이탈하지 않은 경우
    const daysSinceJoin = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24));
    return daysSinceJoin >= 31;
  };

  // 정산 데이터 계산
  const calculateSettlementData = (referralCode) => {
    const {periodStart, periodEnd} = calculateSettlementPeriod(
        referralCode.createdAt);

    // 전체 데이터
    const totalCustomers = referralCode.customers.length;
    const totalRevenue = referralCode.customers.reduce(
        (sum, customer) => sum + customer.actualRevenue, 0);
    const totalRetained31Days = referralCode.customers.filter(
        customer => checkRetention31Days(customer)).length;
    const totalPayback = totalRetained31Days * 50000; // 31일 유지 고객수 × 5만원

    // 당월 데이터 (정산 기간 내 가입한 고객)
    const currentMonthCustomers = referralCode.customers.filter(customer => {
      const joinDate = new Date(customer.joinDate);
      return joinDate >= periodStart && joinDate < periodEnd;
    });

    const currentMonthRevenue = currentMonthCustomers.reduce(
        (sum, customer) => sum + customer.actualRevenue, 0);

    // 당월 가입자 중 31일 유지한 고객만 계산
    const currentMonthRetained31Days = currentMonthCustomers.filter(
        customer => checkRetention31Days(customer)).length;
    const currentMonthPayback = currentMonthRetained31Days * 50000; // 31일 유지 고객수 × 5만원

    // 할인 금액 계산
    const totalOriginalPrice = referralCode.customers.reduce(
        (sum, customer) => sum + customer.originalPrice, 0);
    const totalDiscountAmount = totalOriginalPrice - totalRevenue;

    const currentMonthOriginalPrice = currentMonthCustomers.reduce(
        (sum, customer) => sum + customer.originalPrice, 0);
    const currentMonthDiscountAmount = currentMonthOriginalPrice
        - currentMonthRevenue;

    return {
      periodStart,
      periodEnd,
      total: {
        customers: totalCustomers,
        revenue: totalRevenue,
        payback: totalPayback,
        originalPrice: totalOriginalPrice,
        discountAmount: totalDiscountAmount,
        retained31Days: totalRetained31Days
      },
      currentMonth: {
        customers: currentMonthCustomers.length,
        revenue: currentMonthRevenue,
        payback: currentMonthPayback,
        originalPrice: currentMonthOriginalPrice,
        discountAmount: currentMonthDiscountAmount,
        retained31Days: currentMonthRetained31Days,
        customerList: currentMonthCustomers
      }
    };
  };

  // 전체 통계 계산
  const overallStats = useMemo(() => {
    // 31일 유지 여부 확인 함수를 내부에 정의
    const checkRetention31DaysLocal = (customer) => {
      const joinDate = new Date(customer.joinDate);
      const now = new Date();

      if (customer.churDate) {
        const churnDate = new Date(customer.churDate);
        const retentionDays = Math.floor(
            (churnDate - joinDate) / (1000 * 60 * 60 * 24));
        return retentionDays >= 31;
      }

      const daysSinceJoin = Math.floor(
          (now - joinDate) / (1000 * 60 * 60 * 24));
      return daysSinceJoin >= 31;
    };

    // 정산 데이터 계산 함수를 내부에 정의
    const calculateSettlementDataLocal = (referralCode) => {
      const created = new Date(referralCode.createdAt);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const createdDay = created.getDate();

      let periodStart = new Date(currentYear, currentMonth, createdDay);
      if (periodStart > now) {
        periodStart = new Date(currentYear, currentMonth - 1, createdDay);
      }

      const periodEnd = new Date(periodStart.getFullYear(),
          periodStart.getMonth() + 1, periodStart.getDate());

      const totalCustomers = referralCode.customers.length;
      const totalRevenue = referralCode.customers.reduce(
          (sum, customer) => sum + customer.actualRevenue, 0);
      const totalRetained31Days = referralCode.customers.filter(
          customer => checkRetention31DaysLocal(customer)).length;
      const totalPayback = totalRetained31Days * 50000;

      const currentMonthCustomers = referralCode.customers.filter(customer => {
        const joinDate = new Date(customer.joinDate);
        return joinDate >= periodStart && joinDate < periodEnd;
      });

      const currentMonthRevenue = currentMonthCustomers.reduce(
          (sum, customer) => sum + customer.actualRevenue, 0);
      const currentMonthRetained31Days = currentMonthCustomers.filter(
          customer => checkRetention31DaysLocal(customer)).length;
      const currentMonthPayback = currentMonthRetained31Days * 50000;

      const totalOriginalPrice = referralCode.customers.reduce(
          (sum, customer) => sum + customer.originalPrice, 0);
      const totalDiscountAmount = totalOriginalPrice - totalRevenue;

      const currentMonthOriginalPrice = currentMonthCustomers.reduce(
          (sum, customer) => sum + customer.originalPrice, 0);
      const currentMonthDiscountAmount = currentMonthOriginalPrice
          - currentMonthRevenue;

      return {
        periodStart,
        periodEnd,
        total: {
          customers: totalCustomers,
          revenue: totalRevenue,
          payback: totalPayback,
          originalPrice: totalOriginalPrice,
          discountAmount: totalDiscountAmount,
          retained31Days: totalRetained31Days
        },
        currentMonth: {
          customers: currentMonthCustomers.length,
          revenue: currentMonthRevenue,
          payback: currentMonthPayback,
          originalPrice: currentMonthOriginalPrice,
          discountAmount: currentMonthDiscountAmount,
          retained31Days: currentMonthRetained31Days,
          customerList: currentMonthCustomers
        }
      };
    };

    const allData = referralCodes.map(calculateSettlementDataLocal);

    return {
      totalCustomers: allData.reduce((sum, data) => sum + data.total.customers,
          0),
      totalRevenue: allData.reduce((sum, data) => sum + data.total.revenue, 0),
      totalPayback: allData.reduce((sum, data) => sum + data.total.payback, 0),
      totalRetained31Days: allData.reduce(
          (sum, data) => sum + data.total.retained31Days, 0),
      currentMonthCustomers: allData.reduce(
          (sum, data) => sum + data.currentMonth.customers, 0),
      currentMonthRevenue: allData.reduce(
          (sum, data) => sum + data.currentMonth.revenue, 0),
      currentMonthPayback: allData.reduce(
          (sum, data) => sum + data.currentMonth.payback, 0),
      currentMonthRetained31Days: allData.reduce(
          (sum, data) => sum + data.currentMonth.retained31Days, 0),
      totalOriginalPrice: allData.reduce(
          (sum, data) => sum + data.total.originalPrice, 0),
      totalDiscountAmount: allData.reduce(
          (sum, data) => sum + data.total.discountAmount, 0),
      currentMonthOriginalPrice: allData.reduce(
          (sum, data) => sum + data.currentMonth.originalPrice, 0),
      currentMonthDiscountAmount: allData.reduce(
          (sum, data) => sum + data.currentMonth.discountAmount, 0)
    };
  }, []);

  // CSV 다운로드 함수
  const handleDownloadCSV = () => {
    const csvData = referralCodes.map(referralCode => {
      const data = calculateSettlementData(referralCode);
      return {
        이벤트명: referralCode.eventName || '이벤트 정보 없음',
        레퍼럴코드: referralCode.code,
        생성자명: referralCode.paybackInfo?.creatorName || '정보없음',
        연락처: referralCode.paybackInfo?.contactPhone || '정보없음',
        이메일: referralCode.paybackInfo?.contactEmail || '정보없음',
        주민등록번호: referralCode.paybackInfo?.residentNumber || '정보없음',
        은행명: referralCode.paybackInfo?.bankName || '정보없음',
        계좌번호: referralCode.paybackInfo?.accountNumber || '정보없음',
        예금주: referralCode.paybackInfo?.accountHolder || '정보없음',
        정산기간: `${data.periodStart.toLocaleDateString()} ~ ${data.periodEnd.toLocaleDateString()}`,
        당월가입고객수: data.currentMonth.customers,
        당월31일유지고객수: data.currentMonth.retained31Days,
        당월매출: data.currentMonth.revenue,
        당월페이백금액: data.currentMonth.payback,
        전체가입고객수: data.total.customers,
        전체31일유지고객수: data.total.retained31Days,
        전체매출: data.total.revenue,
        전체페이백금액: data.total.payback,
        할인율: `${referralCode.discountRate}%`
      };
    });

    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `레퍼럴_정산_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                📊 레퍼럴 정산 관리
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                레퍼럴 코드별 정산 현황을 관리하고 당월 페이백을 계산합니다 (31일 유지 고객 1명당 5만원)
              </p>
            </div>

            <button
                onClick={handleDownloadCSV}
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
                  transition: 'all 0.3s ease'
                }}
            >
              <FiDownload size={16}/>
              정산 데이터 다운로드
            </button>
          </div>

          {/* 전체 통계 요약 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* 총 고객 수 */}
            <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '12px',
                  border: '1px solid #e0f2fe',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={() => setHoveredCard('totalCustomers')}
                onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiUsers size={20} style={{color: '#0ea5e9'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0c4a6e'
                  }}>
                    {overallStats.totalCustomers}명
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#0369a1'
                  }}>
                    총 고객 수
                  </div>
                </div>
              </div>
            </div>

            {/* 총 매출 */}
            <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #dcfce7',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredCard('totalRevenue')}
                onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiDollarSign size={20} style={{color: '#16a34a'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#14532d'
                  }}>
                    ₩{overallStats.totalRevenue.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#15803d'
                  }}>
                    총 매출 (실결제)
                  </div>
                </div>
              </div>

              {/* 호버 시 할인 정보 표시 */}
              {hoveredCard === 'totalRevenue' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #dcfce7',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    marginTop: '4px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      원가 총액: ₩{overallStats.totalOriginalPrice.toLocaleString()}
                    </div>
                    <div style={{fontSize: '12px', color: '#dc2626'}}>
                      총 할인액:
                      ₩{overallStats.totalDiscountAmount.toLocaleString()}
                    </div>
                  </div>
              )}
            </div>

            {/* 총 페이백 */}
            <div style={{
              padding: '16px',
              backgroundColor: '#fefbf3',
              borderRadius: '12px',
              border: '1px solid #fde68a',
              position: 'relative'
            }}
                 onMouseEnter={() => setHoveredCard('totalPayback')}
                 onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiTrendingUp size={20} style={{color: '#d97706'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    ₩{overallStats.totalPayback.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#d97706'
                  }}>
                    총 페이백
                  </div>
                </div>
              </div>

              {/* 호버 시 상세 정보 표시 */}
              {hoveredCard === 'totalPayback' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #fde68a',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    marginTop: '4px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      31일 유지 고객: {overallStats.totalRetained31Days}명
                    </div>
                    <div style={{fontSize: '12px', color: '#d97706'}}>
                      계산: {overallStats.totalRetained31Days}명 × ₩50,000 =
                      ₩{overallStats.totalPayback.toLocaleString()}
                    </div>
                  </div>
              )}
            </div>

            {/* 당월 고객 수 */}
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              border: '1px solid #d1d5db'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiCalendar size={20} style={{color: '#6b7280'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#374151'
                  }}>
                    {overallStats.currentMonthCustomers}명
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    당월 가입 고객
                  </div>
                </div>
              </div>
            </div>

            {/* 당월 매출 */}
            <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '12px',
                  border: '1px solid #e0f2fe',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredCard('currentRevenue')}
                onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiDollarSign size={20} style={{color: '#0ea5e9'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0c4a6e'
                  }}>
                    ₩{overallStats.currentMonthRevenue.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#0369a1'
                  }}>
                    당월 매출
                  </div>
                </div>
              </div>

              {/* 호버 시 할인 정보 표시 */}
              {hoveredCard === 'currentRevenue' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #e0f2fe',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    marginTop: '4px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      당월 원가:
                      ₩{overallStats.currentMonthOriginalPrice.toLocaleString()}
                    </div>
                    <div style={{fontSize: '12px', color: '#dc2626'}}>
                      당월 할인액:
                      ₩{overallStats.currentMonthDiscountAmount.toLocaleString()}
                    </div>
                  </div>
              )}
            </div>

            {/* 당월 페이백 */}
            <div style={{
              padding: '16px',
              backgroundColor: '#fdf2f8',
              borderRadius: '12px',
              border: '1px solid #fce7f3',
              position: 'relative'
            }}
                 onMouseEnter={() => setHoveredCard('currentPayback')}
                 onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <FiTrendingUp size={20} style={{color: '#ec4899'}}/>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#831843'
                  }}>
                    ₩{overallStats.currentMonthPayback.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#be185d'
                  }}>
                    당월 페이백
                  </div>
                </div>
              </div>

              {/* 호버 시 상세 정보 표시 */}
              {hoveredCard === 'currentPayback' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #fce7f3',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    marginTop: '4px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      당월 31일 유지: {overallStats.currentMonthRetained31Days}명
                    </div>
                    <div style={{fontSize: '12px', color: '#ec4899'}}>
                      계산: {overallStats.currentMonthRetained31Days}명 × ₩50,000 =
                      ₩{overallStats.currentMonthPayback.toLocaleString()}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* 레퍼럴 코드별 상세 정보 */}
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
              레퍼럴 코드별 정산 현황 ({referralCodes.length}개)
            </h3>
          </div>

          {referralCodes.map((referralCode, index) => {
            const settlementData = calculateSettlementData(referralCode);
            const eventName = referralCode.eventName || '이벤트 정보 없음';

            return (
                <div
                    key={referralCode.id}
                    style={{
                      padding: '24px',
                      borderBottom: index < referralCodes.length - 1
                          ? '1px solid #f1f5f9' : 'none'
                    }}
                >
                  {/* 레퍼럴 코드 헤더 */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div style={{flex: 1}}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 8px 0'
                      }}>
                        {eventName}
                      </h4>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '8px'
                      }}>
                    <span>코드: <code style={{
                      backgroundColor: '#f1f5f9',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {referralCode.code}
                    </code></span>
                        <span>생성자: {referralCode.paybackInfo?.creatorName
                            || '정보없음'}</span>
                        <span>할인율: {referralCode.discountRate}%</span>
                      </div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>
                        정산
                        기간: {settlementData.periodStart.toLocaleDateString()} ~ {settlementData.periodEnd.toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{
                      padding: '8px 12px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px',
                      border: '1px solid #dcfce7'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#15803d',
                        fontWeight: '500'
                      }}>
                        당월 페이백
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#14532d'
                      }}>
                        ₩{settlementData.currentMonth.payback.toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#16a34a',
                        marginTop: '2px'
                      }}>
                        ({settlementData.currentMonth.retained31Days}명 ×
                        ₩50,000)
                      </div>
                    </div>
                  </div>

                  {/* 통계 그리드 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>
                        {settlementData.total.customers}
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>총 고객
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#16a34a'
                      }}>
                        {settlementData.total.retained31Days}
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>31일 유지
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#d97706'
                      }}>
                        ₩{Math.round(settlementData.total.payback / 1000)}K
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>총 페이백
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#0369a1'
                      }}>
                        {settlementData.currentMonth.customers}
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>당월 가입
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#0369a1'
                      }}>
                        {settlementData.currentMonth.retained31Days}
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>당월 31일
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#ec4899'
                      }}>
                        ₩{Math.round(
                          settlementData.currentMonth.payback / 1000)}K
                      </div>
                      <div style={{fontSize: '11px', color: '#64748b'}}>당월 페이백
                      </div>
                    </div>
                  </div>

                  {/* 생성자 정보 */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      margin: '0 0 12px 0'
                    }}>
                      생성자 정보 & 지급 계좌
                    </h5>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      fontSize: '13px'
                    }}>
                      <div>
                        <span style={{color: '#64748b'}}>이름: </span>
                        <span style={{color: '#1f2937', fontWeight: '500'}}>
                      {referralCode.paybackInfo?.creatorName || '정보없음'}
                    </span>
                      </div>
                      <div>
                        <span style={{color: '#64748b'}}>연락처: </span>
                        <span style={{color: '#1f2937', fontWeight: '500'}}>
                      {referralCode.paybackInfo?.contactPhone || '정보없음'}
                    </span>
                      </div>
                      <div>
                        <span style={{color: '#64748b'}}>이메일: </span>
                        <span style={{color: '#1f2937', fontWeight: '500'}}>
                      {referralCode.paybackInfo?.contactEmail || '정보없음'}
                    </span>
                      </div>
                      <div>
                        <span style={{color: '#64748b'}}>계좌: </span>
                        <span style={{color: '#1f2937', fontWeight: '500'}}>
                      {referralCode.paybackInfo?.bankName
                          || '정보없음'} {referralCode.paybackInfo?.accountNumber
                            || '정보없음'}
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default SettlementManagement;