// pages/contact.js
// 토스/뱅크샐러드 스타일 무료 상담 신청

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
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">상담 신청이 완료되었습니다</h1>
          <p className="text-gray-500 mb-8">
            빠른 시일 내에 연락드리겠습니다.
          </p>
          <a href="/" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
            홈으로 돌아가기
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="무료 상담 신청" description="보험금 청구 무료 상담 신청. 손해사정사가 직접 검토해드립니다.">
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">무료 상담 신청</h1>
          <p className="text-gray-500">
            손해사정사가 무료로 검토해드립니다
          </p>
        </div>

        {/* 상담 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-medium text-gray-900 mb-4">기본 정보</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                />
              </div>
            </div>
          </div>

          {/* 보험 정보 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-medium text-gray-900 mb-4">보험 정보</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">보험 종류 *</label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  >
                    <option value="">선택</option>
                    <option value="auto">자동차보험</option>
                    <option value="health">실손의료보험</option>
                    <option value="life">생명/건강보험</option>
                    <option value="property">재물/화재보험</option>
                    <option value="liability">배상책임보험</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">보험사</label>
                  <input
                    type="text"
                    name="insuranceCompany"
                    value={formData.insuranceCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="예: 삼성화재"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">사고/질병 유형</label>
                  <select
                    name="accidentType"
                    value={formData.accidentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  >
                    <option value="">선택</option>
                    <option value="car-accident">자동차 사고</option>
                    <option value="disease">질병 진단</option>
                    <option value="injury">상해/골절</option>
                    <option value="hospitalization">입원/수술</option>
                    <option value="fire">화재/재해</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">사고 발생일</label>
                  <input
                    type="date"
                    name="accidentDate"
                    value={formData.accidentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">현재 진행 상태</label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">선택</option>
                  <option value="not-started">아직 청구 전</option>
                  <option value="in-progress">청구 진행 중</option>
                  <option value="rejected">보험사 거절됨</option>
                  <option value="low-payment">보상금 불만족</option>
                  <option value="dispute">분쟁 중</option>
                </select>
              </div>
            </div>
          </div>

          {/* 상담 내용 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-medium text-gray-900 mb-4">상담 내용</h2>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">상세 내용 *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                placeholder="사고 경위, 청구 현황, 궁금한 점을 자유롭게 작성해주세요."
              ></textarea>
            </div>
          </div>

          {/* 동의 및 제출 */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mt-0.5 w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              {submitting ? '제출 중...' : '무료 상담 신청하기'}
            </button>
          </div>
        </form>

        {/* 안내 */}
        <div className="mt-8 bg-gray-50 rounded-xl p-5">
          <h3 className="font-medium text-gray-900 mb-2 text-sm">상담 안내</h3>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>상담 신청 후 24시간 이내 연락드립니다.</li>
            <li>상담 비용은 무료이며, 강제 계약은 없습니다.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
