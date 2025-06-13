// src/components/SettlementManagement.js
import React, {useCallback, useMemo, useState} from 'react';
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiDownload,
  FiFileText,
  FiFilter,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import {
  getMonthlySettlementSummary,
  referralCodes
} from '../data/promotionData';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dropdown,
  EmptyState,
  StatCard,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from './common';
import {theme} from '../styles/theme';

// 날짜 관련 유틸리티
const formatCurrency = (amount) => `₩${amount.toLocaleString()}`;

const getMonthsBetween = (startDate, endDate) => {
  const months = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    months.push({
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      label: `${current.getFullYear()}년 ${current.getMonth() + 1}월`,
      value: `${current.getFullYear()}-${String(
          current.getMonth() + 1).padStart(2, '0')}`
    });
    current.setMonth(current.getMonth() + 1);
  }

  return months.reverse();
};

// 정산 상태 뱃지 컴포넌트
const SettlementStatusBadge = ({status, count}) => {
  const statusConfig = {
    payable: {
      variant: 'success',
      icon: FiCheckCircle,
      text: '정산 대상'
    },
    pending: {
      variant: 'warning',
      icon: FiClock,
      text: '대기중'
    },
    none: {
      variant: 'info',
      icon: FiAlertCircle,
      text: '해당없음'
    }
  };

  const config = statusConfig[status] || statusConfig.none;

  return (
      <Badge variant={config.variant} icon={config.icon}>
        {config.text} {count > 0 && `(${count})`}
      </Badge>
  );
};

// 정산 요약 카드 컴포넌트
const SettlementSummaryCard = ({data, previousData}) => {
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) {
      return 0;
    }
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: theme.spacing[4],
        marginBottom: theme.spacing[6]
      }}>
        <StatCard
            icon={FiUsers}
            label="정산 대상 고객"
            value={`${data.totalEligibleCustomers}명`}
            subValue="31일 유지 완료"
            color={theme.colors.info[600]}
            trend={previousData ? calculateTrend(data.totalEligibleCustomers,
                previousData.totalEligibleCustomers) : undefined}
        />
        <StatCard
            icon={FiDollarSign}
            label="총 페이백 금액"
            value={formatCurrency(data.totalPayback)}
            subValue={`${data.totalEligibleCustomers}명 × ₩50,000`}
            color={theme.colors.success[600]}
            trend={previousData ? calculateTrend(data.totalPayback,
                previousData.totalPayback) : undefined}
        />
        <StatCard
            icon={FiTrendingUp}
            label="신규 가입"
            value={`${data.totalNewCustomers}명`}
            subValue={formatCurrency(data.totalNewRevenue)}
            color={theme.colors.warning[600]}
            trend={previousData ? calculateTrend(data.totalNewCustomers,
                previousData.totalNewCustomers) : undefined}
        />
        <StatCard
            icon={FiFilter}
            label="정산 코드"
            value={`${data.payableCodesCount}개`}
            subValue={`전체 ${referralCodes.length}개 중`}
            color={theme.colors.primary[600]}
        />
      </div>
  );
};

// 메인 컴포넌트
const SettlementManagement = () => {
  // currentDate를 useMemo로 감싸서 의존성 문제 해결
  const currentDate = useMemo(() => new Date(), []);

  const [selectedMonth, setSelectedMonth] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    label: `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`,
    value: `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1).padStart(2, '0')}`
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // 월 선택 옵션 생성
  const monthOptions = useMemo(() => {
    return getMonthsBetween('2024-01-01', currentDate);
  }, [currentDate]);

  // 현재 월 데이터
  const monthlyData = useMemo(() => {
    return getMonthlySettlementSummary(selectedMonth.year, selectedMonth.month);
  }, [selectedMonth]);

  // 이전 월 데이터 (비교용)
  const previousMonthData = useMemo(() => {
    const prevMonth = selectedMonth.month === 1
        ? {year: selectedMonth.year - 1, month: 12}
        : {year: selectedMonth.year, month: selectedMonth.month - 1};
    return getMonthlySettlementSummary(prevMonth.year, prevMonth.month);
  }, [selectedMonth]);

  // CSV 다운로드
  const handleDownloadCSV = useCallback((includeAllMonths = false) => {
    let csvData = [];

    if (includeAllMonths) {
      // 전체 월 데이터
      monthOptions.forEach(month => {
        const data = getMonthlySettlementSummary(month.year, month.month);
        data.details.forEach(item => {
          csvData.push({
            정산월: month.label,
            이벤트명: item.eventName,
            레퍼럴코드: item.code,
            생성자명: item.creatorInfo?.creatorName || '정보없음',
            연락처: item.creatorInfo?.contactPhone || '정보없음',
            이메일: item.creatorInfo?.contactEmail || '정보없음',
            주민등록번호: item.creatorInfo?.residentNumber || '정보없음',
            은행명: item.creatorInfo?.bankName || '정보없음',
            계좌번호: item.creatorInfo?.accountNumber || '정보없음',
            예금주: item.creatorInfo?.accountHolder || '정보없음',
            '31일유지고객수': item.eligibleCustomers,
            페이백금액: item.paybackAmount,
            신규가입고객수: item.newCustomers,
            신규매출: item.newRevenue
          });
        });
      });
    } else {
      // 선택된 월 데이터만
      csvData = monthlyData.details.map(item => ({
        정산월: selectedMonth.label,
        이벤트명: item.eventName,
        레퍼럴코드: item.code,
        생성자명: item.creatorInfo?.creatorName || '정보없음',
        연락처: item.creatorInfo?.contactPhone || '정보없음',
        이메일: item.creatorInfo?.contactEmail || '정보없음',
        주민등록번호: item.creatorInfo?.residentNumber || '정보없음',
        은행명: item.creatorInfo?.bankName || '정보없음',
        계좌번호: item.creatorInfo?.accountNumber || '정보없음',
        예금주: item.creatorInfo?.accountHolder || '정보없음',
        '31일유지고객수': item.eligibleCustomers,
        페이백금액: item.paybackAmount,
        신규가입고객수: item.newCustomers,
        신규매출: item.newRevenue
      }));
    }

    if (csvData.length === 0) {
      alert('정산 대상 데이터가 없습니다.');
      return;
    }

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent],
        {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = includeAllMonths
        ? `정산_전체_${new Date().toISOString().split('T')[0]}.csv`
        : `정산_${selectedMonth.year}년_${selectedMonth.month}월.csv`;
    link.click();

    setShowExportOptions(false);
  }, [monthlyData.details, selectedMonth, monthOptions]);

  // 정산 항목 렌더링
  const renderSettlementItem = (item, index, totalItems) => (
      <TableRow key={item.code}>
        <TableCell>
          <div>
            <div style={{
              fontWeight: theme.fontWeight.medium,
              color: theme.colors.neutral[900],
              marginBottom: theme.spacing[1]
            }}>
              {item.eventName}
            </div>
            <code style={{
              fontSize: theme.fontSize.xs[0],
              backgroundColor: theme.colors.neutral[100],
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.neutral[700]
            }}>
              {item.code}
            </code>
          </div>
        </TableCell>
        <TableCell>
          <div style={{fontSize: theme.fontSize.sm[0]}}>
            <div style={{
              color: theme.colors.neutral[900],
              marginBottom: theme.spacing[0.5]
            }}>
              {item.creatorInfo?.creatorName || '정보없음'}
            </div>
            <div style={{color: theme.colors.neutral[500]}}>
              {item.creatorInfo?.contactPhone || '정보없음'}
            </div>
            {item.creatorInfo?.bankName && (
                <div style={{
                  color: theme.colors.neutral[500],
                  fontSize: theme.fontSize.xs[0],
                  marginTop: theme.spacing[1]
                }}>
                  {item.creatorInfo.bankName} {item.creatorInfo.accountNumber}
                </div>
            )}
          </div>
        </TableCell>
        <TableCell align="center">
          <Badge variant="info" icon={FiUsers}>
            {item.eligibleCustomers}명
          </Badge>
        </TableCell>
        <TableCell align="right">
          <div>
            <div style={{
              fontWeight: theme.fontWeight.semibold,
              fontSize: theme.fontSize.base[0],
              color: theme.colors.neutral[900]
            }}>
              {formatCurrency(item.paybackAmount)}
            </div>
            <div style={{
              fontSize: theme.fontSize.xs[0],
              color: theme.colors.neutral[500],
              marginTop: theme.spacing[0.5]
            }}>
              @₩50,000
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <SettlementStatusBadge status="payable"/>
        </TableCell>
      </TableRow>
  );

  return (
      <div style={{
        flex: 1,
        padding: theme.spacing[6],
        backgroundColor: theme.colors.neutral[50],
        minHeight: '100vh'
      }}>
        {/* 헤더 카드 */}
        <Card style={{marginBottom: theme.spacing[6]}}>
          <CardHeader>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: theme.spacing[4]
            }}>
              <div>
                <h2 style={{
                  fontSize: theme.fontSize['2xl'][0],
                  fontWeight: theme.fontWeight.bold,
                  color: theme.colors.neutral[900],
                  margin: `0 0 ${theme.spacing[2]} 0`
                }}>
                  📊 레퍼럴 정산 관리
                </h2>
                <p style={{
                  fontSize: theme.fontSize.sm[0],
                  color: theme.colors.neutral[600],
                  margin: 0
                }}>
                  월별 레퍼럴 정산 현황을 확인하고 관리합니다 (31일 유지 고객 1명당 5만원)
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: theme.spacing[3],
                alignItems: 'center'
              }}>
                {/* 월 선택 드롭다운 */}
                <Dropdown
                    isOpen={showDropdown}
                    onToggle={() => setShowDropdown(!showDropdown)}
                    trigger={
                      <Button variant="secondary" icon={FiCalendar}>
                        {selectedMonth.label}
                        <FiChevronDown size={16}
                                       style={{marginLeft: theme.spacing[1]}}/>
                      </Button>
                    }
                >
                  <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {monthOptions.map((month, index) => (
                        <button
                            key={month.value}
                            onClick={() => {
                              setSelectedMonth(month);
                              setShowDropdown(false);
                            }}
                            style={{
                              width: '100%',
                              padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                              border: 'none',
                              backgroundColor: selectedMonth.value
                              === month.value
                                  ? theme.colors.neutral[100]
                                  : 'white',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: theme.fontSize.sm[0],
                              color: theme.colors.neutral[700],
                              borderBottom: index < monthOptions.length - 1
                                  ? `1px solid ${theme.colors.neutral[100]}`
                                  : 'none',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.neutral[50]}
                            onMouseLeave={(e) => e.target.style.backgroundColor =
                                selectedMonth.value === month.value
                                    ? theme.colors.neutral[100] : 'white'}
                        >
                          {month.label}
                        </button>
                    ))}
                  </div>
                </Dropdown>

                {/* 내보내기 버튼 */}
                <Dropdown
                    isOpen={showExportOptions}
                    onToggle={() => setShowExportOptions(!showExportOptions)}
                    trigger={
                      <Button variant="primary" icon={FiDownload}>
                        내보내기
                      </Button>
                    }
                >
                  <div style={{padding: theme.spacing[2]}}>
                    <button
                        onClick={() => handleDownloadCSV(false)}
                        style={{
                          width: '100%',
                          padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                          border: 'none',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: theme.fontSize.sm[0],
                          color: theme.colors.neutral[700],
                          borderRadius: theme.borderRadius.md,
                          transition: 'background-color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing[2]
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.neutral[50]}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <FiFileText size={16}/>
                      {selectedMonth.label} 데이터
                    </button>
                    <button
                        onClick={() => handleDownloadCSV(true)}
                        style={{
                          width: '100%',
                          padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                          border: 'none',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: theme.fontSize.sm[0],
                          color: theme.colors.neutral[700],
                          borderRadius: theme.borderRadius.md,
                          transition: 'background-color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing[2],
                          marginTop: theme.spacing[1]
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.neutral[50]}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <FiCalendar size={16}/>
                      전체 기간 데이터
                    </button>
                  </div>
                </Dropdown>
              </div>
            </div>
          </CardHeader>

          {/* 통계 요약 */}
          <CardContent style={{paddingTop: 0}}>
            <SettlementSummaryCard data={monthlyData}
                                   previousData={previousMonthData}/>
          </CardContent>
        </Card>

        {/* 정산 목록 카드 */}
        <Card>
          <CardHeader style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: theme.fontSize.lg[0],
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral[900]
            }}>
              {selectedMonth.label} 정산 대상
            </h3>
            <Badge variant="info" icon={FiClock}>
              {monthlyData.details.length}개 레퍼럴 코드
            </Badge>
          </CardHeader>

          {monthlyData.details.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell header>이벤트/레퍼럴 코드</TableCell>
                    <TableCell header>생성자 정보</TableCell>
                    <TableCell header align="center">31일 유지</TableCell>
                    <TableCell header align="right">페이백 금액</TableCell>
                    <TableCell header align="center">상태</TableCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                {monthlyData.details.map((item, index) =>
                    renderSettlementItem(item, index,
                        monthlyData.details.length)
                )}
                </tbody>
              </Table>
          ) : (
              <CardContent>
                <EmptyState
                    icon={FiAlertCircle}
                    title="정산 대상이 없습니다"
                    description={`${selectedMonth.label}에는 31일 유지 조건을 충족한 고객이 없습니다.`}
                />
              </CardContent>
          )}
        </Card>
      </div>
  );
};

export default SettlementManagement;