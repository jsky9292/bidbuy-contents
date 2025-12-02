// pages/admin/consultations.js
// 문의 관리 대시보드

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const statusLabels = {
  pending: { text: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  contacted: { text: '연락완료', color: 'bg-teal-100 text-teal-700' },
  in_progress: { text: '진행중', color: 'bg-purple-100 text-purple-700' },
  completed: { text: '완료', color: 'bg-green-100 text-green-700' },
  cancelled: { text: '취소', color: 'bg-gray-100 text-gray-500' },
};

const insuranceLabels = {
  auto: '자동차보험',
  health: '실손보험',
  life: '생명/건강보험',
  property: '재물/화재보험',
  other: '기타',
};

export default function ConsultationsPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchConsultations();
  }, [filter]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/consultations?status=${filter}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(data.data);
      }
    } catch (error) {
      console.error('문의 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        fetchConsultations();
        if (selectedItem?.id === id) {
          setSelectedItem({ ...selectedItem, status: newStatus });
        }
      }
    } catch (error) {
      console.error('상태 업데이트 오류:', error);
    }
  };

  const deleteConsultation = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/consultations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        fetchConsultations();
        setShowModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('삭제 오류:', error);
    }
  };

  const openDetail = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return '-';
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <>
      <Head>
        <title>문의 관리 | 보담</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin/dashboard">
                  <span className="text-gray-500 hover:text-gray-700 cursor-pointer">← 대시보드</span>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">문의 관리</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  총 {consultations.length}건
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* 필터 */}
          <div className="bg-white rounded-xl border p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              {Object.entries(statusLabels).map(([key, { text }]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === key ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* 목록 */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">로딩 중...</p>
            </div>
          ) : consultations.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-500">문의가 없습니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">이름</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">연락처</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">보험종류</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">상황</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">접수일시</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {consultations.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabels[item.status]?.color || 'bg-gray-100'}`}>
                            {statusLabels[item.status]?.text || item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-gray-600">{formatPhone(item.phone)}</td>
                        <td className="px-4 py-3 text-gray-600">{insuranceLabels[item.insurance_type] || item.insurance_type}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{item.current_status || '-'}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{formatDate(item.created_at)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => openDetail(item)}
                            className="px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-sm hover:bg-teal-100 transition-colors"
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 상세 모달 */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">문의 상세</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* 상태 변경 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusLabels).map(([key, { text, color }]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(selectedItem.id, key)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedItem.status === key ? color : 'bg-white border hover:bg-gray-100'
                        }`}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 기본 정보 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">이름</label>
                    <p className="font-medium">{selectedItem.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">연락처</label>
                    <p className="font-medium">
                      <a href={`tel:${selectedItem.phone}`} className="text-teal-600 hover:underline">
                        {formatPhone(selectedItem.phone)}
                      </a>
                    </p>
                  </div>
                </div>

                {selectedItem.email && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">이메일</label>
                    <p className="font-medium">
                      <a href={`mailto:${selectedItem.email}`} className="text-teal-600 hover:underline">
                        {selectedItem.email}
                      </a>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">보험종류</label>
                    <p className="font-medium">{insuranceLabels[selectedItem.insurance_type] || selectedItem.insurance_type}</p>
                  </div>
                  {selectedItem.accident_type && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">사고유형</label>
                      <p className="font-medium">{selectedItem.accident_type}</p>
                    </div>
                  )}
                </div>

                {selectedItem.current_status && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">현재 상황</label>
                    <p className="font-medium">{selectedItem.current_status}</p>
                  </div>
                )}

                {selectedItem.description && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">상세 내용</label>
                    <p className="bg-gray-50 rounded-lg p-3 text-sm whitespace-pre-wrap">{selectedItem.description}</p>
                  </div>
                )}

                <div className="text-sm text-gray-400">
                  접수일시: {formatDate(selectedItem.created_at)}
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="flex-1 py-2.5 bg-teal-500 text-white rounded-xl font-medium text-center hover:bg-teal-600 transition-colors"
                >
                  전화하기
                </a>
                <button
                  onClick={() => deleteConsultation(selectedItem.id)}
                  className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
