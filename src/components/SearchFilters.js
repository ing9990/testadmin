import React from 'react';
import {FiSearch, FiTag, FiUser} from 'react-icons/fi';
import FilterTag from './FilterTag';
import {categories, experts} from '../data/mockData';

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  selectedExperts,
  onCategoryToggle,
  onExpertToggle
}) => {
  return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Search Bar */}
        <div style={{position: 'relative', marginBottom: '20px'}}>
          <FiSearch style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            fontSize: '18px'
          }}/>
          <input
              type="text"
              placeholder="제목, 메타데이터로 검색..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: 'calc(100% - 24px)',
                padding: '14px 16px 14px 48px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4F46E5';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.backgroundColor = '#f8fafc';
              }}
          />
        </div>

        {/* Category Filters */}
        <div style={{marginBottom: '16px'}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <FiTag size={16} style={{color: '#4F46E5'}}/>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
            카테고리
          </span>
          </div>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryToggle(category)}
                    style={{
                      padding: '8px 16px',
                      border: selectedCategories.includes(category)
                          ? '2px solid #4F46E5'
                          : '2px solid #e2e8f0',
                      backgroundColor: selectedCategories.includes(category)
                          ? '#4F46E5'
                          : 'white',
                      color: selectedCategories.includes(category)
                          ? 'white'
                          : '#374151',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                >
                  {category}
                </button>
            ))}
          </div>
        </div>

        {/* Expert Filters */}
        <div style={{marginBottom: '16px'}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <FiUser size={16} style={{color: '#16A34A'}}/>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
            전문가
          </span>
          </div>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            {experts.map(expert => (
                <button
                    key={expert}
                    onClick={() => onExpertToggle(expert)}
                    style={{
                      padding: '8px 16px',
                      border: selectedExperts.includes(expert)
                          ? '2px solid #16A34A'
                          : '2px solid #e2e8f0',
                      backgroundColor: selectedExperts.includes(expert)
                          ? '#16A34A'
                          : 'white',
                      color: selectedExperts.includes(expert)
                          ? 'white'
                          : '#374151',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                >
                  {expert}
                </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || selectedExperts.length > 0) && (
            <div style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '16px',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {selectedCategories.map(category => (
                  <FilterTag
                      key={category}
                      text={category}
                      type="category"
                      onRemove={() => onCategoryToggle(category)}
                  />
              ))}
              {selectedExperts.map(expert => (
                  <FilterTag
                      key={expert}
                      text={expert}
                      type="expert"
                      onRemove={() => onExpertToggle(expert)}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default SearchFilters;