// src/components/PromotionManagement.js
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

  // 정산 관리 페이지로 변경
  if (selectedMenu === '정산 관리') {
    return <SettlementManagement/>;
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