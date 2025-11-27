// pages/contact.js
// 보담 - 무료 상담 신청 페이지

import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insuranceType: '',
    accidentType: '',
    accidentDate: '',
    insuranceCompany: '',
    currentStatus: '',
    description: '',
    agreement: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보 수집에 동의해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout title="상담 신청 완료">
        <div className="container-custom py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold mb-4">상담 신청이 완료되었습니다!</h1>
            <p className="text-gray-600 mb-8">
              빠른 시일 내에 연락드리겠습니다.<br />
              긴급한 경우 전화 상담을 이용해주세요.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="무료 상담 신청" description="보험금 청구 무료 상담 신청. 손해사정사가 직접 검토해드립니다.">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">무료 상담 신청</h1>
            <p className="text-gray-600">
              보험금 청구, 거절 대응, 적정 보상금 검토까지<br />
              손해사정사가 무료로 상담해드립니다.
            </p>
          </div>

          {/* 상담 폼 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* 기본 정보 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b">기본 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* 보험 정보 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b">보험 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보험 종류 *</label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="auto">자동차보험</option>
                    <option value="health">실손의료보험</option>
                    <option value="life">생명/건강보험</option>
                    <option value="property">재물/화재보험</option>
                    <option value="liability">배상책임보험</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보험사</label>
                  <input
                    type="text"
                    name="insuranceCompany"
                    value={formData.insuranceCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="삼성화재, DB손해보험 등"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사고/질병 유형</label>
                  <select
                    name="accidentType"
                    value={formData.accidentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="car-accident">자동차 사고</option>
                    <option value="disease">질병 진단</option>
                    <option value="injury">상해/골절</option>
                    <option value="hospitalization">입원/수술</option>
                    <option value="fire">화재/재해</option>
                    <option value="theft">도난/파손</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사고 발생일</label>
                  <input
                    type="date"
                    name="accidentDate"
                    value={formData.accidentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">현재 진행 상태</label>
                  <select
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="not-started">아직 청구 전</option>
                    <option value="in-progress">청구 진행 중</option>
                    <option value="rejected">보험사 거절됨</option>
                    <option value="low-payment">보상금 불만족</option>
                    <option value="dispute">분쟁 중</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 상세 내용 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b">상담 내용</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용 *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="사고 경위, 청구 현황, 궁금한 점 등을 자유롭게 작성해주세요."
                ></textarea>
              </div>
            </div>

            {/* 동의 */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">
                  <span className="font-medium">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                  수집된 정보는 상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-400"
            >
              {submitting ? '제출 중...' : '무료 상담 신청하기'}
            </button>
          </form>

          {/* 안내 */}
          <div className="mt-8 bg-emerald-50 rounded-xl p-6">
            <h3 className="font-bold text-emerald-800 mb-3">상담 안내</h3>
            <ul className="text-sm text-emerald-700 space-y-2">
              <li>• 상담 신청 후 24시간 이내 연락드립니다.</li>
              <li>• 긴급 상담이 필요하시면 전화 문의 바랍니다.</li>
              <li>• 상담 비용은 무료이며, 강제 계약은 없습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
