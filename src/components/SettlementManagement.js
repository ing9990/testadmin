import React, {useState} from 'react';
import {
  FiDollarSign,
  FiDownload,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiUsers
} from 'react-icons/fi';
import {
  convertToCSV,
  downloadFile,
  generateSettlementData,
  getCompletedSettlements
} from '../data/promotionData';

const SettlementManagement = () => {
  const [settlementData, setSettlementData] = useState(
      generateSettlementData());
  const [showCompleted, setShowCompleted] = useState(false);
  const [completedData, setCompletedData] = useState(getCompletedSettlements());

  const currentData = showCompleted ? completedData : settlementData;

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(currentData);
    const currentDate = new Date().toISOString().split('T')[0];
    const filePrefix = showCompleted ? '정산완료' : '정산대기';
    downloadFile(csvContent, `레퍼럴_${filePrefix}_${currentDate}.csv`,
        'text/csv;charset=utf-8;');
  };

  const handleDownloadExcel = () => {
    // 간단한 TSV 형태로 엑셀 호환 파일 생성
    const headers = [
      '이벤트 이름',
      '레퍼럴 코드',
      '생성자 정보',
      '고객 전화번호',
      '총 고객 수',
      '총 매출',
      '페이백 금액',
      '할인율',
      '계좌 정보'
    ];

    const tsvContent = [
      headers.join('\t'),
      ...currentData.map(row => [
        row.eventName,
        row.referralCode,
        row.creatorInfo,
        row.customerPhones,
        row.totalCustomers,
        row.totalRevenue,
        row.paybackAmount,
        `${row.discountRate}%`,
        row.bankInfo
      ].join('\t'))
    ].join('\n');

    const currentDate = new Date().toISOString().split('T')[0];
    const filePrefix = showCompleted ? '정산완료' : '정산대기';
    downloadFile(tsvContent, `레퍼럴_${filePrefix}_${currentDate}.xlsx`,
        'application/vnd.ms-excel;charset=utf-8;');
  };

  const totalPayback = currentData.reduce(
      (sum, item) => sum + item.paybackAmount, 0);
  const totalRevenue = currentData.reduce(
      (sum, item) => sum + item.totalRevenue, 0);
  const totalCustomers = currentData.reduce(
      (sum, item) => sum + item.totalCustomers, 0);

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
            marginBottom: '20px'
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
                {showCompleted ? '정산 완료된' : '정산 대기 중인'} 레퍼럴 코드 데이터를 관리합니다
              </p>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: showCompleted ? '#6b7280' : '#8b5cf6',
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
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = showCompleted ? '#4b5563'
                        : '#7c3aed';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = showCompleted ? '#6b7280'
                        : '#8b5cf6';
                    e.target.style.transform = 'translateY(0)';
                  }}
              >
                {showCompleted ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                {showCompleted ? '정산대기 보기' : '정산완료 보기'}
              </button>
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
                <FiDownload size={16}/>
                CSV 다운로드
              </button>
              <button
                  onClick={handleDownloadExcel}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#0ea5e9',
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
                    boxShadow: '0 4px 12px rgba(14,165,233,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0284c7';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.transform = 'translateY(0)';
                  }}
              >
                <FiFileText size={16}/>
                엑셀 다운로드
              </button>
            </div>
          </div>

          {/* 통계 요약 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
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
                gap: '12px'
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
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0c4a6e'
                  }}>
                    {totalCustomers}명
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

            <div style={{
              padding: '16px',
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
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#14532d'
                  }}>
                    ₩{totalRevenue.toLocaleString()}
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
              padding: '16px',
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
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#d97706',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiDollarSign size={20} style={{color: 'white'}}/>
                </div>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    ₩{totalPayback.toLocaleString()}
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
            </div>
          </div>
        </div>

        {/* 정산 데이터 테이블 */}
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
              {showCompleted ? '정산 완료' : '정산 대기'} 데이터 ({currentData.length}개 항목)
            </h3>
          </div>

          <div style={{
            overflowX: 'auto',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead style={{
                backgroundColor: '#f8fafc',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}>
              <tr>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '150px'
                }}>이벤트 이름
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '120px'
                }}>레퍼럴 코드
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '180px'
                }}>생성자 정보
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '200px'
                }}>고객 전화번호
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '80px'
                }}>고객수
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'right',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '120px'
                }}>총 매출
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'right',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  minWidth: '120px'
                }}>페이백 금액
                </th>
                {showCompleted && (
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      minWidth: '100px'
                    }}>정산일</th>
                )}
              </tr>
              </thead>
              <tbody>
              {currentData.map((item, index) => (
                  <tr key={index} style={{
                    borderBottom: index < currentData.length - 1
                        ? '1px solid #f1f5f9' : 'none'
                  }}>
                    <td style={{
                      padding: '16px',
                      fontSize: '14px',
                      color: '#1f2937',
                      fontWeight: '500'
                    }}>
                      {item.eventName}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '13px',
                      color: '#1f2937',
                      fontFamily: 'monospace',
                      backgroundColor: '#f8fafc'
                    }}>
                      {item.referralCode}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '13px',
                      color: '#1f2937'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#1f2937',
                        marginBottom: '4px'
                      }}>
                        {item.creatorName}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginBottom: '2px'
                      }}>
                        {item.creatorTitle}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        fontFamily: 'monospace'
                      }}>
                        {item.creatorPhone}
                      </div>
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '12px',
                      color: '#64748b',
                      fontFamily: 'monospace',
                      maxWidth: '200px',
                      wordBreak: 'break-all'
                    }}>
                      {item.customerPhones}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '16px',
                      color: '#1f2937',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      {item.totalCustomers}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '14px',
                      color: '#16a34a',
                      fontWeight: '600',
                      textAlign: 'right'
                    }}>
                      ₩{item.totalRevenue.toLocaleString()}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '14px',
                      color: showCompleted ? '#16a34a' : '#d97706',
                      fontWeight: '600',
                      textAlign: 'right'
                    }}>
                      ₩{item.paybackAmount.toLocaleString()}
                      {showCompleted && (
                          <div style={{
                            fontSize: '11px',
                            color: '#16a34a',
                            marginTop: '2px'
                          }}>
                            ✓ 완료
                          </div>
                      )}
                    </td>
                    {showCompleted && (
                        <td style={{
                          padding: '16px',
                          fontSize: '13px',
                          color: '#64748b',
                          textAlign: 'center'
                        }}>
                          {item.settledDate || '2025-07-31'}
                        </td>
                    )}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        {currentData.length === 0 && (
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
                <FiFileText size={32} style={{color: '#0ea5e9'}}/>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                {showCompleted ? '정산 완료된 데이터가 없습니다' : '정산할 데이터가 없습니다'}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                {showCompleted
                    ? '아직 정산 완료된 레퍼럴 코드가 없습니다.'
                    : '레퍼럴 코드를 사용한 고객이 있을 때 정산 데이터가 생성됩니다.'
                }
              </p>
            </div>
        )}
      </div>
  );
};

export default SettlementManagement;