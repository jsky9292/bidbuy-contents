// pages/privacy.js
// 보담 - 개인정보처리방침

import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout title="개인정보처리방침">
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              보담(이하 "회사")은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고
              개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-600 mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>상담 서비스 제공 및 상담 내역 관리</li>
              <li>서비스 개선 및 맞춤 서비스 제공</li>
              <li>고지사항 전달, 불만처리 등 원활한 의사소통 경로 확보</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">2. 수집하는 개인정보 항목</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>필수항목:</strong> 이름, 연락처, 상담 내용</li>
              <li><strong>선택항목:</strong> 이메일, 보험 종류, 사고 유형, 사고일자, 보험사, 진행 상태</li>
              <li><strong>자동 수집:</strong> IP주소, 접속일시, 브라우저 정보</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-600 mb-6">
              이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기합니다.
              단, 관계법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>상담 완료 후 1년간 보관 (서비스 품질 관리 목적)</li>
              <li>전자상거래법에 따른 표시/광고에 관한 기록: 6개월</li>
              <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-600 mb-6">
              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">5. 개인정보의 파기</h2>
            <p className="text-gray-600 mb-6">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. 이용자의 권리와 행사방법</h2>
            <p className="text-gray-600 mb-4">
              이용자는 언제든지 다음의 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">7. 개인정보 보호책임자</h2>
            <p className="text-gray-600 mb-6">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보 처리와 관련한 이용자의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-600">
                <strong>개인정보 보호책임자</strong><br />
                이메일: privacy@bodam.kr
              </p>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">8. 개인정보처리방침의 변경</h2>
            <p className="text-gray-600 mb-6">
              이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
              변경사항이 있을 경우 웹사이트를 통해 공지하겠습니다.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
