import React, {useState} from 'react';
import EventManagement from './EventManagement';
import EventDetail from './EventDetail';
import ReferralDetail from './ReferralDetail';
import SettlementManagement from './SettlementManagement';

const PromotionManagement = ({selectedMenu}) => {
  const [currentView, setCurrentView] = useState('events'); // events, eventDetail, referralDetail
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedReferral, setSelectedReferral] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentView('eventDetail');
  };

  const handleReferralSelect = (referral) => {
    setSelectedReferral(referral);
    setCurrentView('referralDetail');
  };

  const handleBackToEvents = () => {
    setCurrentView('events');
    setSelectedEvent(null);
    setSelectedReferral(null);
  };

  const handleBackToEventDetail = () => {
    setCurrentView('eventDetail');
    setSelectedReferral(null);
  };

  if (selectedMenu === '정산 관리') {
    return <SettlementManagement/>;
  }

  if (selectedMenu === '레퍼럴 코드 관리') {
    // 레퍼럴 코드 관리 페이지는 추후 구현
    return (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '60px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#f0fdf4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#16a34a" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              레퍼럴 코드 관리
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.6'
            }}>
              전체 레퍼럴 코드를 한눈에 관리할 수 있는<br/>
              페이지가 곧 추가될 예정입니다.
            </p>
          </div>
        </div>
    );
  }

  // 이벤트 관리 뷰 렌더링
  switch (currentView) {
    case 'eventDetail':
      return (
          <EventDetail
              event={selectedEvent}
              onBack={handleBackToEvents}
              onReferralSelect={handleReferralSelect}
          />
      );
    case 'referralDetail':
      return (
          <ReferralDetail
              referral={selectedReferral}
              onBack={handleBackToEventDetail}
          />
      );
    default:
      return (
          <EventManagement
              onEventSelect={handleEventSelect}
          />
      );
  }
};

export default PromotionManagement;