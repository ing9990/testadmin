import React from 'react';
import {FiX} from 'react-icons/fi';

const FilterTag = ({text, onRemove, type}) => {
  const getTypeStyle = (type) => {
    switch (type) {
      case 'category':
        return {
          backgroundColor: '#EEF2FF',
          color: '#4F46E5',
          border: '1px solid #C7D2FE'
        };
      case 'expert':
        return {
          backgroundColor: '#F0FDF4',
          color: '#16A34A',
          border: '1px solid #BBF7D0'
        };
      default:
        return {
          backgroundColor: '#FEF3C7',
          color: '#D97706',
          border: '1px solid #FDE68A'
        };
    }
  };

  return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        ...getTypeStyle(type)
      }}>
        {text}
        <FiX
            size={12}
            style={{cursor: 'pointer', opacity: 0.7}}
            onClick={onRemove}
        />
      </div>
  );
};

export default FilterTag;