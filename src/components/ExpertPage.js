import React from 'react';
import {FiUser} from 'react-icons/fi';

const ExpertPage = () => {
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
            backgroundColor: '#f0f9ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <FiUser size={32} style={{color: '#0ea5e9'}}/>
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 16px 0'
          }}>
            전문가 페이지 관리
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: 0,
            lineHeight: '1.6'
          }}>
            전문가 프로필, 경력, 수익률 등을 관리할 수 있는<br/>
            페이지가 곧 추가될 예정입니다.
          </p>
        </div>
      </div>
  );
};

export default ExpertPage;