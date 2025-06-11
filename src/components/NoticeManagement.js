import React, {useState} from 'react';
import SearchFilters from './SearchFilters';
import NoticeList from './NoticeList';
import MetaEditor from './MetaEditor';
import {notices} from '../data/mockData';

const NoticeManagement = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    metaDescription: '',
    keywords: ''
  });

  // 필터링된 공지사항 목록
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(
            searchTerm.toLowerCase()) ||
        notice.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.meta.description.toLowerCase().includes(searchTerm.toLowerCase())
        ||
        notice.meta.keywords.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0
        || selectedCategories.includes(notice.category);
    const matchesExpert = selectedExperts.length === 0 || (notice.expert
        && selectedExperts.includes(notice.expert));

    return matchesSearch && matchesCategory && matchesExpert;
  });

  // 카테고리 토글
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  // 전문가 토글
  const handleExpertToggle = (expert) => {
    setSelectedExperts(prev =>
        prev.includes(expert)
            ? prev.filter(e => e !== expert)
            : [...prev, expert]
    );
  };

  // 공지사항 선택
  const handleNoticeSelect = (notice) => {
    setSelectedNotice(notice);
    setEditForm({
      title: notice.meta.title,
      metaDescription: notice.meta.description,
      keywords: notice.meta.keywords
    });
    setIsEditing(false);
  };

  // 편집 토글
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // 폼 변경
  const handleFormChange = (newForm) => {
    setEditForm(newForm);
  };

  // 저장
  const handleSave = () => {
    console.log('저장된 메타 데이터:', editForm);
    setIsEditing(false);
  };

  // 되돌리기
  const handleReset = () => {
    if (selectedNotice) {
      setEditForm({
        title: selectedNotice.meta.title,
        metaDescription: selectedNotice.meta.description,
        keywords: selectedNotice.meta.keywords
      });
    }
  };

  return (
      <div style={{flex: 1, display: 'flex', gap: '24px', padding: '24px'}}>
        {/* Left Panel - Notice List */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategories={selectedCategories}
              selectedExperts={selectedExperts}
              onCategoryToggle={handleCategoryToggle}
              onExpertToggle={handleExpertToggle}
          />

          <NoticeList
              notices={filteredNotices}
              selectedNotice={selectedNotice}
              onNoticeSelect={handleNoticeSelect}
          />
        </div>

        {/* Right Panel - Meta Editor */}
        <div style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <MetaEditor
              selectedNotice={selectedNotice}
              isEditing={isEditing}
              editForm={editForm}
              onEditToggle={handleEditToggle}
              onFormChange={handleFormChange}
              onSave={handleSave}
              onReset={handleReset}
          />
        </div>
      </div>
  );
};

export default NoticeManagement;