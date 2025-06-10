import React, {useState} from 'react';
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  FileText,
  Radio,
  Search,
  Settings,
  Shield,
  User,
  Users
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('강연방송 관리');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('05/10/2025');
  const [endDate, setEndDate] = useState('06/10/2025');

  const menuItems = [
    {icon: BarChart3, label: '구독', hasSubmenu: true},
    {icon: Users, label: '생방송 공개네터', hasSubmenu: true},
    {icon: Shield, label: '회원관리', hasSubmenu: true},
    {icon: CreditCard, label: '결제관리', hasSubmenu: true},
    {icon: FileText, label: '투자관리', hasSubmenu: true},
    {icon: Radio, label: '전문가 수익률', hasSubmenu: true},
    {icon: Settings, label: '강연방송 관리', hasSubmenu: true, active: true}
  ];

  const broadcastData = [
    {
      id: '219510',
      title: '6월 CPI, FOMC 중대사항 및 매수 유망주 추천',
      host: '이롤백 전문가(우건)',
      amount: '330,000',
      regDate: '2025-06-10 오후 8:00:00',
      modDate: '2025-06-10 오전 9:51:12'
    },
    {
      id: '219400',
      title: '★현명한선 초고수의특허★클럽업업★SAM잊어버린데 †6월호재02강연',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-06-02 오후 6:00:00',
      modDate: '2025-06-02 오후 5:59:43'
    },
    {
      id: '219323',
      title: '총목적썩 핵심신법 및 매수 유망주 추천2',
      host: '이롤백 전문가(우건)',
      amount: '330,000',
      regDate: '2025-05-29 오후 8:00:00',
      modDate: '2025-05-29 오전 8:54:09'
    },
    {
      id: '219308',
      title: '★현명한선 초고수의특허★클럽업업★프리미오上승한 후속-펌형23강',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-05-28 오후 4:50:00',
      modDate: '2025-05-28 오후 4:50:00'
    },
    {
      id: '219285',
      title: '★현명한선 초고수의특허★클럽업업★SAM잊어버린데†6월호재27강연',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-05-27 오후 5:20:00',
      modDate: '2025-05-27 오후 5:13:35'
    },
    {
      id: '219281',
      title: '총목적썩 핵심신법 및 매수 유망주 추천',
      host: '이롤백 전문가(우건)',
      amount: '330,000',
      regDate: '2025-05-27 오후 8:00:00',
      modDate: '2025-05-27 오전 9:54:51'
    },
    {
      id: '219225',
      title: '★현명한선 초고수의특허★클럽업업★5-6월특급 급등족',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-05-23 오후 4:50:00',
      modDate: '2025-05-23 오후 4:49:48'
    },
    {
      id: '219140',
      title: '★현명한선 초고수의특허★클럽업업★SAM잊어버린데- 펌형19강연',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-05-19 오후 6:30:00',
      modDate: '2025-05-19 오후 6:37:51'
    },
    {
      id: '219074',
      title: '5월 역시적 반등장 시장전략 및 매수 유망주 추천2',
      host: '이롤백 전문가(우건)',
      amount: '330,000',
      regDate: '2025-05-15 오후 8:00:00',
      modDate: '2025-05-15 오전 9:41:30'
    },
    {
      id: '219041',
      title: '★초고수의 5월특허-클럽업업★송 따셋 디팬더마타럼-후속13강연',
      host: '부자할 전문가',
      amount: '50,000',
      regDate: '2025-05-13 오후 6:50:00',
      modDate: '2025-05-13 오후 6:48:03'
    }
  ];

  const MenuItem = ({icon: Icon, label, hasSubmenu, active, onClick}) => (
      <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
              active
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-100 hover:bg-blue-600 hover:text-white'
          }`}
          onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          <Icon size={18}/>
          <span className="text-sm font-medium">{label}</span>
        </div>
        {hasSubmenu && <ChevronRight size={16}/>}
      </div>
  );

  return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-blue-600">
            <div className="flex items-center space-x-2">
              <div
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-lg">이토마토 ADMIN</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4">
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    hasSubmenu={item.hasSubmenu}
                    active={item.active}
                    onClick={() => setSelectedMenu(item.label)}
                />
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">강연방송 리스트</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">남은 사간: 83분 19초</span>
                <div
                    className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600"/>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Search Controls */}
            <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium text-blue-600">강연방송</span>
                <div className="flex items-center space-x-2">
                  <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">오늘
                  </button>
                  <button
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">어제
                  </button>
                  <button
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">1주일
                  </button>
                  <button
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">1개월
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>전문가를 선택하세요</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 flex items-center space-x-2">
                  <Search size={16}/>
                  <span>검색</span>
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                  초기화
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">번호</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">방
                      제목
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">전문가</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">금액</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">방송일</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">등록일</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {broadcastData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-md">
                          <div className="truncate" title={item.title}>
                            {item.title}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.host}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.regDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.modDate}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination would go here */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <button
                    className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">이전
                </button>
                <button
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm">1
                </button>
                <button
                    className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">2
                </button>
                <button
                    className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">3
                </button>
                <button
                    className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;