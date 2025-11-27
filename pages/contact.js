// pages/contact.js
// 간소화된 무료 상담 신청

import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    situation: '',
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
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">상담 신청 완료</h1>
          <p className="text-gray-500 mb-8">
            빠른 시일 내에 연락드리겠습니다.<br />
            <span className="text-sm text-gray-400">평균 응답시간: 24시간 이내</span>
          </p>
          <a href="/" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors">
            홈으로 돌아가기
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="무료 상담 신청" description="보험금 청구 무료 상담 신청. 손해사정사가 직접 검토해드립니다.">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">무료 상담 신청</h1>
          <p className="text-gray-500">
            간단한 정보만 남겨주세요.<br />
            손해사정사가 직접 연락드립니다.
          </p>
        </div>

        {/* 간소화된 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="홍길동"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="010-1234-5678"
              />
            </div>

            {/* 상황 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">어떤 상황이신가요?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'claim-help', label: '보험금 청구 방법', desc: '어떻게 청구해야 할지 모르겠어요' },
                  { value: 'low-payment', label: '보험금이 적음', desc: '받은 금액이 적은 것 같아요' },
                  { value: 'rejected', label: '청구 거절됨', desc: '보험사에서 거절당했어요' },
                  { value: 'just-ask', label: '그냥 상담', desc: '궁금한 게 있어요' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.situation === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="situation"
                      value={option.value}
                      checked={formData.situation === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{option.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 동의 및 제출 */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mt-0.5 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting || !formData.name || !formData.phone}
              className="w-full py-4 bg-blue-500 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 shadow-lg shadow-blue-500/30"
            >
              {submitting ? '제출 중...' : '무료 상담 신청하기'}
            </button>
          </div>
        </form>

        {/* 안내 */}
        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 rounded-2xl p-5">
            <h3 className="font-medium text-blue-900 mb-2 text-sm">이런 분들께 도움이 됩니다</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>내 보험으로 뭘 청구할 수 있는지 모르겠어요</li>
              <li>보험사에서 준 금액이 맞는 건지 모르겠어요</li>
              <li>서류 준비가 너무 복잡해요</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">상담 진행 방식</h3>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">1</div>
              <p className="text-sm text-gray-500">상담 신청서 접수</p>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">2</div>
              <p className="text-sm text-gray-500">손해사정사 연락 (24시간 이내)</p>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">3</div>
              <p className="text-sm text-gray-500">상황 파악 후 맞춤 안내</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
