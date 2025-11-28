// pages/guides/silson-insurance.js
// 실손보험 청구 완벽 가이드 - SEO 최적화

import Layout from '../../components/Layout';
import Link from 'next/link';

export default function SilsonInsuranceGuide() {
  return (
    <Layout
      title="실손보험 청구 방법 완벽 가이드 (2024)"
      description="실손보험 청구 방법, 필요 서류, 청구 기간까지 완벽 정리. 실손24 앱 사용법과 거절 시 대응 방법도 알려드립니다."
      keywords="실손보험 청구, 실비보험 청구 방법, 실손보험 청구 서류, 실손24, 실손보험 청구 기간"
      article={true}
      publishedTime="2024-11-01"
    >
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/guides" className="hover:text-blue-500">가이드</Link>
            <span>/</span>
            <span>실손보험</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            실손보험 청구 방법 완벽 가이드 (2024)
          </h1>
          <p className="text-lg text-gray-600">
            병원비 돌려받는 방법, 필요 서류부터 실손24 앱 사용법까지
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span>2024년 11월 업데이트</span>
            <span>읽는 시간 8분</span>
          </div>
        </header>

        {/* 목차 */}
        <nav className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h2 className="font-semibold text-gray-900 mb-4">목차</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#what-is" className="text-blue-600 hover:underline">1. 실손보험이란?</a></li>
            <li><a href="#how-to-claim" className="text-blue-600 hover:underline">2. 실손보험 청구 방법 3가지</a></li>
            <li><a href="#documents" className="text-blue-600 hover:underline">3. 필요 서류 체크리스트</a></li>
            <li><a href="#silson24" className="text-blue-600 hover:underline">4. 실손24 앱 사용법</a></li>
            <li><a href="#deadline" className="text-blue-600 hover:underline">5. 청구 기간과 소멸시효</a></li>
            <li><a href="#rejection" className="text-blue-600 hover:underline">6. 청구 거절 시 대응 방법</a></li>
            <li><a href="#faq" className="text-blue-600 hover:underline">7. 자주 묻는 질문</a></li>
          </ol>
        </nav>

        {/* 본문 */}
        <div className="prose prose-lg max-w-none">

          {/* 섹션 1 */}
          <section id="what-is" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 실손보험이란?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              실손의료보험(실비보험)은 <strong>실제 지출한 의료비를 보장</strong>하는 보험입니다.
              국민건강보험에서 보장하지 않는 비급여 항목까지 보장받을 수 있어 "제2의 건강보험"이라고도 불립니다.
            </p>

            <div className="bg-blue-50 rounded-xl p-5 my-6">
              <h3 className="font-semibold text-blue-900 mb-2">실손보험 보장 범위</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• 입원의료비: 입원 시 발생하는 병원비</li>
                <li>• 통원의료비: 외래 진료비 + 처방약값</li>
                <li>• 비급여 항목: MRI, CT, 도수치료, 주사료 등</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5 my-6">
              <h3 className="font-semibold text-yellow-800 mb-2">세대별 실손보험 차이</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">구분</th>
                      <th className="text-left py-2">본인부담</th>
                      <th className="text-left py-2">비급여</th>
                    </tr>
                  </thead>
                  <tbody className="text-yellow-900">
                    <tr className="border-b">
                      <td className="py-2">1세대 (2009년 이전)</td>
                      <td>10~20%</td>
                      <td>100% 보장</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">2세대 (2009~2017)</td>
                      <td>10~20%</td>
                      <td>80% 보장</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">3세대 (2017~2021)</td>
                      <td>20%</td>
                      <td>80% 보장</td>
                    </tr>
                    <tr>
                      <td className="py-2">4세대 (2021년 이후)</td>
                      <td>20~30%</td>
                      <td>70% 보장</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 섹션 2 */}
          <section id="how-to-claim" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 실손보험 청구 방법 3가지</h2>

            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">방법 1: 실손24 앱 (가장 간편)</h3>
                <p className="text-gray-600 text-sm mb-3">
                  2024년 10월부터 병원에서 직접 보험사로 서류를 전송할 수 있습니다.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 서류 발급 불필요</li>
                  <li>✓ 병원에서 바로 전송</li>
                  <li>✓ 30병상 이상 병원급에서 가능</li>
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">방법 2: 보험사 앱/홈페이지</h3>
                <p className="text-gray-600 text-sm mb-3">
                  서류를 사진 찍어 앱으로 청구하는 방법입니다.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 24시간 청구 가능</li>
                  <li>✓ 서류 촬영 후 업로드</li>
                  <li>✓ 대부분의 보험사 지원</li>
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">방법 3: 팩스/우편/방문</h3>
                <p className="text-gray-600 text-sm mb-3">
                  전통적인 방법으로, 서류 원본이 필요한 경우 사용합니다.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 고액 청구 시 원본 요구될 수 있음</li>
                  <li>• 처리 시간이 더 걸림</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 섹션 3 */}
          <section id="documents" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 필요 서류 체크리스트</h2>

            <div className="bg-white border rounded-xl p-6 my-6">
              <h3 className="font-semibold text-gray-900 mb-4">통원 치료 시 (금액별)</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900">3만원 이하</h4>
                  <ul className="text-sm text-gray-600 mt-1">
                    <li>• 진료비 영수증</li>
                    <li>• 보험금 청구서</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">3만원 ~ 10만원</h4>
                  <ul className="text-sm text-gray-600 mt-1">
                    <li>• 진료비 영수증</li>
                    <li>• 진료비 세부내역서</li>
                    <li>• 처방전 (약 처방 시)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-gray-900">10만원 초과</h4>
                  <ul className="text-sm text-gray-600 mt-1">
                    <li>• 진료비 영수증</li>
                    <li>• 진료비 세부내역서</li>
                    <li>• 진단서 또는 소견서</li>
                    <li>• 처방전</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 my-6">
              <h3 className="font-semibold text-gray-900 mb-4">입원 치료 시</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>진료비 영수증</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>진료비 세부내역서</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>입퇴원 확인서 또는 진단서</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">○</span>
                  <span>수술 시: 수술확인서</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 섹션 4 */}
          <section id="silson24" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 실손24 앱 사용법</h2>

            <p className="text-gray-700 mb-4">
              2024년 10월 25일부터 시행된 <strong>실손보험 청구 전산화</strong>로,
              병원에서 보험사로 직접 서류를 전송할 수 있습니다.
            </p>

            <div className="bg-indigo-50 rounded-xl p-6 my-6">
              <h3 className="font-semibold text-indigo-900 mb-4">실손24 청구 절차</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  <span className="text-indigo-800">실손24 앱 설치 및 본인인증</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  <span className="text-indigo-800">보험사 연결 (내 보험 조회)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  <span className="text-indigo-800">병원 수납 시 "실손24 전송" 요청</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  <span className="text-indigo-800">앱에서 전송 내역 확인 및 청구 완료</span>
                </li>
              </ol>
            </div>

            <div className="bg-red-50 rounded-xl p-5 my-6">
              <h3 className="font-semibold text-red-800 mb-2">주의사항</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• 30병상 이상 병원급 의료기관만 가능</li>
                <li>• 의원급은 아직 미지원 (순차 확대 예정)</li>
                <li>• 일부 병원은 시스템 미연동 가능</li>
              </ul>
            </div>
          </section>

          {/* 섹션 5 */}
          <section id="deadline" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 청구 기간과 소멸시효</h2>

            <div className="bg-white border-2 border-red-200 rounded-xl p-6 my-6">
              <h3 className="font-bold text-red-600 mb-2">중요: 3년 소멸시효</h3>
              <p className="text-gray-700">
                보험금 청구권은 <strong>치료 종료일로부터 3년</strong>이 지나면 소멸합니다.
                오래된 진료비도 3년 이내라면 청구 가능합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">청구 시기 팁</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• <strong>통원:</strong> 월 1회 모아서 청구하면 편리</li>
                <li>• <strong>입원:</strong> 퇴원 후 바로 청구</li>
                <li>• <strong>고액 치료:</strong> 치료 중에도 중간 청구 가능</li>
              </ul>
            </div>
          </section>

          {/* 섹션 6 */}
          <section id="rejection" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 청구 거절 시 대응 방법</h2>

            <p className="text-gray-700 mb-4">
              보험금이 거절되거나 삭감되었다면, 포기하지 마세요. 대응 방법이 있습니다.
            </p>

            <div className="space-y-4">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">1단계: 거절 사유 확인</h3>
                <p className="text-gray-600 text-sm">
                  보험사에 "약관 몇 조 몇 항에 근거한 거절인지" 서면으로 요청하세요.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">2단계: 이의제기</h3>
                <p className="text-gray-600 text-sm">
                  담당 의사 소견서, 추가 진료 기록 등을 첨부하여 재심사 요청합니다.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">3단계: 금융감독원 민원</h3>
                <p className="text-gray-600 text-sm">
                  이의제기가 받아들여지지 않으면 금감원에 민원을 제기할 수 있습니다.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">4단계: 손해사정사 상담</h3>
                <p className="text-gray-600 text-sm">
                  복잡한 사안이라면 전문 손해사정사의 도움을 받는 것이 효과적입니다.
                </p>
              </div>
            </div>
          </section>

          {/* 섹션 7 */}
          <section id="faq" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 자주 묻는 질문</h2>

            <div className="space-y-4">
              {[
                {
                  q: '도수치료도 실손으로 청구되나요?',
                  a: '네, 의사 처방에 따른 도수치료는 실손보험으로 청구 가능합니다. 다만 보험사에서 "과잉진료"를 이유로 일부 삭감하는 경우가 있어 주의가 필요합니다.'
                },
                {
                  q: '비급여 주사도 보장되나요?',
                  a: '치료 목적의 비급여 주사는 보장됩니다. 단, 미용이나 예방 목적은 보장되지 않으며, 세대별로 보장 비율이 다릅니다.'
                },
                {
                  q: '치과 치료도 청구 가능한가요?',
                  a: '충치 치료, 사랑니 발치 등 치료 목적의 진료는 청구 가능합니다. 임플란트, 교정 등은 보장되지 않습니다.'
                },
                {
                  q: '한의원 치료도 되나요?',
                  a: '네, 한의원 진료도 실손보험 청구가 가능합니다. 침, 뜸, 한약 등이 포함됩니다.'
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Q. {item.q}</h3>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="bg-blue-500 rounded-3xl p-8 text-center text-white mt-12">
          <h2 className="text-xl font-bold mb-2">
            실손보험 청구, 어려우신가요?
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            거절당했거나 적게 받으셨다면 무료로 검토해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button className="px-6 py-3 bg-white text-blue-500 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                무료 상담 신청
              </button>
            </Link>
            <Link href="/quiz">
              <button className="px-6 py-3 bg-blue-400 text-white rounded-xl font-medium hover:bg-blue-300 transition-colors">
                보험금 자가진단
              </button>
            </Link>
          </div>
        </div>

        {/* 관련 가이드 */}
        <div className="mt-12">
          <h2 className="font-bold text-gray-900 mb-4">관련 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guides/claim-rejection">
              <div className="bg-white border rounded-xl p-5 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">보험금 거절 대응 가이드</h3>
                <p className="text-sm text-gray-500">거절당해도 포기하지 마세요</p>
              </div>
            </Link>
            <Link href="/calculator">
              <div className="bg-white border rounded-xl p-5 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">합의금 계산기</h3>
                <p className="text-sm text-gray-500">예상 합의금 바로 계산</p>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
