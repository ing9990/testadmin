import React from 'react';
import {FiCalendar} from 'react-icons/fi';
import {getCategoryStyle} from '../data/mockData';

const NoticeList = ({notices, selectedNotice, onNoticeSelect}) => {
  return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        flex: 1
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
            공지사항 목록 ({notices.length})
          </h3>
        </div>

        <div style={{maxHeight: '600px', overflowY: 'auto'}}>
          {notices.map((notice, index) => {
            const categoryStyle = getCategoryStyle(notice.category);

            return (
                <div
                    key={notice.id}
                    onClick={() => onNoticeSelect(notice)}
                    style={{
                      padding: '16px 24px',
                      borderBottom: index < notices.length - 1
                          ? '1px solid #f1f5f9' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: selectedNotice?.id === notice.id
                          ? '#f0f9ff' : 'white',
                      borderLeft: selectedNotice?.id === notice.id
                          ? '4px solid #0ea5e9' : '4px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedNotice?.id !== notice.id) {
                        e.target.style.backgroundColor = '#f8fafc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedNotice?.id !== notice.id) {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                      flex: 1,
                      lineHeight: '1.4',
                      paddingRight: '16px'
                    }}>
                      {notice.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexShrink: 0
                    }}>
                  <span style={{
                    fontSize: '11px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FiCalendar size={11}/>
                    {notice.date}
                  </span>
                      {notice.views && (
                          <span style={{
                            fontSize: '11px',
                            color: '#64748b'
                          }}>
                      조회 {notice.views.toLocaleString()}
                    </span>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                <span style={{
                  padding: '3px 8px',
                  backgroundColor: categoryStyle.bg,
                  color: categoryStyle.color,
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {notice.category}
                </span>
                    {notice.expert && (
                        <span style={{
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                    {notice.expert}
                  </span>
                    )}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default NoticeList;