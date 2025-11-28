// pages/guides/claim-rejection.js
// 보험금 거절 대응 가이드 - SEO 최적화

import Layout from '../../components/Layout';
import Link from 'next/link';

export default function ClaimRejectionGuide() {
  return (
    <Layout
      title="보험금 거절 대응 방법 완벽 가이드"
      description="보험금 청구가 거절되었나요? 포기하지 마세요. 이의제기부터 금감원 민원, 손해사정까지 단계별 대응 방법을 알려드립니다."
      keywords="보험금 거절, 보험금 지급 거절, 보험금 거절 대응, 보험금 이의제기, 금감원 민원"
      article={true}
      publishedTime="2024-11-01"
    >
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/guides" className="hover:text-blue-500">가이드</Link>
            <span>/</span>
            <span>보험금 거절</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            보험금 거절당했을 때<br />대응 방법 완벽 가이드
          </h1>
          <p className="text-lg text-gray-600">
            거절당해도 포기하지 마세요. 방법이 있습니다.
          </p>
        </header>

        {/* 핵심 메시지 */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="font-bold text-red-800 mb-2">알고 계셨나요?</h2>
              <p className="text-red-700">
                보험금 청구의 <strong>약 30%가 처음에 거절 또는 삭감</strong>됩니다.
                하지만 이의제기 시 <strong>절반 이상이 원래 금액으로 지급</strong>받습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 목차 */}
        <nav className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h2 className="font-semibold text-gray-900 mb-4">목차</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#reasons" className="text-blue-600 hover:underline">1. 보험금 거절 주요 사유</a></li>
            <li><a href="#step1" className="text-blue-600 hover:underline">2. 1단계: 거절 사유 정확히 파악하기</a></li>
            <li><a href="#step2" className="text-blue-600 hover:underline">3. 2단계: 이의제기 방법</a></li>
            <li><a href="#step3" className="text-blue-600 hover:underline">4. 3단계: 금융감독원 민원</a></li>
            <li><a href="#step4" className="text-blue-600 hover:underline">5. 4단계: 분쟁조정 신청</a></li>
            <li><a href="#expert" className="text-blue-600 hover:underline">6. 전문가 도움받기</a></li>
            <li><a href="#cases" className="text-blue-600 hover:underline">7. 실제 해결 사례</a></li>
          </ol>
        </nav>

        {/* 본문 */}
        <div className="prose prose-lg max-w-none">

          {/* 섹션 1 */}
          <section id="reasons" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 보험금 거절 주요 사유</h2>
            <p className="text-gray-700 mb-6">
              보험사가 보험금을 거절하는 이유를 알아야 제대로 대응할 수 있습니다.
            </p>

            <div className="space-y-4">
              <div className="bg-white border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">고지의무 위반</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      가입 시 건강상태를 제대로 알리지 않았다는 이유. 가장 흔한 거절 사유입니다.
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      → 가입 후 2년이 지났거나, 미고지 질병과 청구 질병 간 인과관계가 없으면 반박 가능
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">과잉진료/필요성 부정</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      "치료가 과하다", "입원이 필요 없었다"는 의료자문 결과를 근거로 삭감합니다.
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      → 주치의 소견서로 치료 필요성 입증 가능
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📑</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">약관 해석 차이</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      "수술에 해당하지 않는다", "보장 범위가 아니다" 등 약관 해석 문제입니다.
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      → 약관 해석은 소비자에게 유리하게 해야 함 (작성자 불이익 원칙)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">면책기간/감액기간</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      가입 초기 일정 기간 동안은 보장이 제한되는 경우가 있습니다.
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      → 면책기간 해당 여부 정확히 확인 필요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 섹션 2 */}
          <section id="step1" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 1단계: 거절 사유 정확히 파악하기</h2>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">가장 먼저 할 일</h3>
              <p className="text-blue-800 mb-4">
                보험사에 전화해서 다음을 <strong>서면(이메일/팩스)으로 요청</strong>하세요:
              </p>
              <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                "이번 보험금 청구 건에 대해 <strong>약관 제O조 제O항</strong>에 근거하여
                거절된 것인지, <strong>구체적인 거절 사유와 근거를 서면</strong>으로 보내주세요."
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-gray-700">구두 통보는 나중에 번복될 수 있으니 반드시 서면으로</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-gray-700">의료자문 결과가 있다면 자문서 사본도 요청</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-gray-700">거절 통보서의 약관 조항을 직접 확인</span>
              </div>
            </div>
          </section>

          {/* 섹션 3 */}
          <section id="step2" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 2단계: 이의제기 방법</h2>

            <p className="text-gray-700 mb-6">
              거절 사유를 확인했다면, 이에 대한 반박 자료를 준비해 이의제기합니다.
            </p>

            <div className="bg-white border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">이의제기 시 준비할 것</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <div>
                    <strong>주치의 소견서</strong>
                    <p className="text-gray-500">치료의 필요성, 입원의 적정성 등을 담당 의사에게 받습니다</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <div>
                    <strong>추가 진료 기록</strong>
                    <p className="text-gray-500">진료차트, 검사결과지, 수술기록 등</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <div>
                    <strong>관련 판례/분쟁조정 사례</strong>
                    <p className="text-gray-500">비슷한 사안에서 소비자가 승소한 사례</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <div>
                    <strong>이의제기서</strong>
                    <p className="text-gray-500">거절 사유에 대한 반박 내용을 정리한 문서</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5">
              <h3 className="font-semibold text-yellow-800 mb-2">이의제기 기한</h3>
              <p className="text-yellow-700 text-sm">
                거절 통보를 받은 날로부터 <strong>가능한 빨리</strong> 이의제기하세요.
                보험사마다 내부 처리 기한이 있으며, 늦어지면 대응이 어려워질 수 있습니다.
              </p>
            </div>
          </section>

          {/* 섹션 4 */}
          <section id="step3" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 3단계: 금융감독원 민원</h2>

            <p className="text-gray-700 mb-6">
              보험사 이의제기가 받아들여지지 않으면, 금융감독원에 민원을 제기할 수 있습니다.
            </p>

            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-indigo-900 mb-4">금감원 민원 신청 방법</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  <div>
                    <span className="text-indigo-800 font-medium">금융감독원 홈페이지 접속</span>
                    <p className="text-indigo-600 text-sm">www.fss.or.kr → 민원신청</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  <div>
                    <span className="text-indigo-800 font-medium">민원 내용 작성</span>
                    <p className="text-indigo-600 text-sm">사고 경위, 거절 사유, 이의제기 경과 상세히 기술</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  <div>
                    <span className="text-indigo-800 font-medium">증빙자료 첨부</span>
                    <p className="text-indigo-600 text-sm">거절 통보서, 진료기록, 소견서 등</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">처리 기간</h3>
              <p className="text-gray-700 text-sm">
                금감원 민원은 접수 후 평균 <strong>14~30일</strong> 내에 처리됩니다.
                금감원이 보험사에 사실조회를 하고, 결과를 통보합니다.
              </p>
            </div>
          </section>

          {/* 섹션 5 */}
          <section id="step4" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 4단계: 분쟁조정 신청</h2>

            <p className="text-gray-700 mb-6">
              금감원 민원으로도 해결되지 않으면 <strong>금융분쟁조정위원회</strong>에
              분쟁조정을 신청할 수 있습니다.
            </p>

            <div className="bg-white border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">분쟁조정 vs 소송</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">구분</th>
                    <th className="text-left py-2">분쟁조정</th>
                    <th className="text-left py-2">소송</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2">비용</td>
                    <td className="text-green-600">무료</td>
                    <td>변호사 비용 발생</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">기간</td>
                    <td>2~4개월</td>
                    <td>6개월~1년 이상</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">구속력</td>
                    <td>2천만원 이하 시 보험사 구속</td>
                    <td>판결로 강제</td>
                  </tr>
                  <tr>
                    <td className="py-2">추천</td>
                    <td className="text-blue-600">먼저 시도</td>
                    <td>분쟁조정 후</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 섹션 6 */}
          <section id="expert" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 전문가 도움받기</h2>

            <p className="text-gray-700 mb-6">
              혼자 대응하기 어렵다면 전문가의 도움을 받는 것이 효과적입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">손해사정사</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 보험금 산정 전문가</li>
                  <li>• 성공보수제 (보험금 수령 시에만 비용)</li>
                  <li>• 수수료: 보통 10~15%</li>
                </ul>
                <p className="text-blue-600 text-sm mt-3">
                  → 복잡한 사안, 고액 청구에 추천
                </p>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">변호사</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 법률 전문가</li>
                  <li>• 소송 대리 가능</li>
                  <li>• 착수금 + 성공보수</li>
                </ul>
                <p className="text-blue-600 text-sm mt-3">
                  → 소송이 필요한 경우
                </p>
              </div>
            </div>
          </section>

          {/* 섹션 7 */}
          <section id="cases" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 실제 해결 사례</h2>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 font-semibold">사례 1</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">성공</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">고지의무 위반 거절 → 전액 지급</h3>
                <p className="text-sm text-gray-600">
                  5년 전 위염 미고지로 암보험 거절 → 위염과 암의 인과관계 없음 입증 → 진단비 전액 수령
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 font-semibold">사례 2</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">성공</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">입원 필요성 부정 → 80% 인정</h3>
                <p className="text-sm text-gray-600">
                  디스크로 2주 입원, 보험사 "통원 가능" 주장 → 주치의 소견서 + 영상자료 제출 → 80% 지급
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 font-semibold">사례 3</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">성공</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">수술 해당 안됨 → 수술로 인정</h3>
                <p className="text-sm text-gray-600">
                  내시경 시술 수술비 거절 → 의료법상 수술 분류 기준 제시 → 수술비 지급
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/cases" className="text-blue-600 hover:underline text-sm">
                더 많은 해결 사례 보기 →
              </Link>
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 text-center text-white mt-12">
          <h2 className="text-xl font-bold mb-2">
            보험금 거절, 혼자 고민하지 마세요
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            손해사정사가 무료로 검토해드립니다
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
              무료 상담 신청
            </button>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
