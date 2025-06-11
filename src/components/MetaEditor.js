import React from 'react';
import {FiEdit3, FiRotateCcw, FiSave} from 'react-icons/fi';

const MetaEditor = ({
  selectedNotice,
  isEditing,
  editForm,
  onEditToggle,
  onFormChange,
  onSave,
  onReset
}) => {
  if (!selectedNotice) {
    return (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          height: 'fit-content'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#f0f9ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <FiEdit3 size={24} style={{color: '#0ea5e9'}}/>
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 8px 0'
          }}>
            공지사항을 선택하세요
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
            lineHeight: '1.5'
          }}>
            왼쪽 목록에서 공지사항을 선택하면<br/>
            SEO 메타데이터를 편집할 수 있습니다.
          </p>
        </div>
    );
  }

  return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        height: 'fit-content'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151'
          }}>
            SEO 메타데이터
          </h3>
          <button
              onClick={onEditToggle}
              style={{
                padding: '8px 16px',
                backgroundColor: isEditing ? '#dc2626' : '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
          >
            <FiEdit3 size={12}/>
            {isEditing ? '취소' : '편집'}
          </button>
        </div>

        <div style={{marginBottom: '16px'}}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            선택된 공지사항
          </h4>
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            margin: 0,
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            {selectedNotice.title}
          </p>
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Title 태그
          </label>
          {isEditing ? (
              <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => onFormChange(
                      {...editForm, title: e.target.value})}
                  style={{
                    width: 'calc(100% - 24px)',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
          ) : (
              <p style={{
                fontSize: '13px',
                color: '#1e293b',
                margin: 0,
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                {editForm.title}
              </p>
          )}
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Meta Description
          </label>
          {isEditing ? (
              <textarea
                  value={editForm.metaDescription}
                  onChange={(e) => onFormChange(
                      {...editForm, metaDescription: e.target.value})}
                  rows={3}
                  style={{
                    width: 'calc(100% - 24px)',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
          ) : (
              <p style={{
                fontSize: '13px',
                color: '#1e293b',
                margin: 0,
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                lineHeight: '1.5'
              }}>
                {editForm.metaDescription}
              </p>
          )}
        </div>

        <div style={{marginBottom: '24px'}}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Keywords
          </label>
          {isEditing ? (
              <input
                  type="text"
                  value={editForm.keywords}
                  onChange={(e) => onFormChange(
                      {...editForm, keywords: e.target.value})}
                  placeholder="키워드를 쉼표로 구분하여 입력하세요"
                  style={{
                    width: 'calc(100% - 24px)',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
          ) : (
              <p style={{
                fontSize: '13px',
                color: '#1e293b',
                margin: 0,
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                {editForm.keywords}
              </p>
          )}
        </div>

        {isEditing && (
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                  onClick={onSave}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
              >
                <FiSave size={14}/>
                수정
              </button>
              <button
                  onClick={onReset}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
              >
                <FiRotateCcw size={14}/>
                되돌리기
              </button>
            </div>
        )}
      </div>
  );
};

export default MetaEditor;