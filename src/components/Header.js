import React from 'react';
import {FiUser} from 'react-icons/fi';
import {getPageTitle} from '../config/menuConfig';

const Header = ({selectedMenu}) => {
  return (
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0,
          letterSpacing: '-0.02em'
        }}>
          {getPageTitle(selectedMenu)}
        </h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <span style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>
          남은 시간: 54분 11초
        </span>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#d1d5db',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiUser size={16} style={{color: '#6b7280'}}/>
          </div>
        </div>
      </div>
  );
};

export default Header;