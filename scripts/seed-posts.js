// scripts/seed-posts.js
// 초기 블로그 포스트 데이터 삽입

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxpwlbwhacelukvpllxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cHdsYndoYWNlbHVrdnBsbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU5NTksImV4cCI6MjA4MDI1MTk1OX0.gtok46jJqAoQ3JU1Snc4m00bsmkNEuhsw3xnq6Y4yTo';

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
  {
    id: 'osaka-3night-4day-travel',
    title: '오사카 3박4일 여행 코스 완벽 가이드 - 도톤보리, 유니버셜, 교토까지',
    slug: 'osaka-3night-4day-travel-guide',
    category: 'travel',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    meta_description: '오사카 3박4일 여행 코스를 완벽하게 정리했습니다. 도톤보리, 유니버셜 스튜디오, 교토 당일치기까지 알찬 일정을 소개합니다.',
    keywords: '오사카여행, 오사카3박4일, 도톤보리, 유니버셜스튜디오, 교토여행, 일본여행',
    content: `<h2>오사카 3박4일, 이렇게 다녀오세요!</h2>
<p>일본 여행의 대표 도시 오사카! 3박4일이면 오사카의 핵심 명소는 물론 교토까지 충분히 둘러볼 수 있습니다. 이 글에서는 효율적인 동선과 꼭 가봐야 할 명소를 정리해드립니다.</p>

<h2>Day 1: 도톤보리 & 난바 탐방</h2>
<h3>오전 - 간사이 공항 도착</h3>
<p>간사이 공항에서 난바역까지는 난카이 라피트 특급열차로 약 40분이 소요됩니다. 호텔에 짐을 맡기고 바로 탐방을 시작하세요!</p>

<h3>오후 - 도톤보리 거리</h3>
<p>오사카의 상징 <strong>글리코 간판</strong> 앞에서 인증샷은 필수! 도톤보리 강을 따라 걸으며 오사카의 활기찬 분위기를 느껴보세요.</p>
<ul>
<li><strong>이치란 라멘</strong> - 혼자서도 편하게 먹을 수 있는 칸막이 라멘집</li>
<li><strong>타코야끼</strong> - 아이즈야, 쿠쿠루 등 유명 맛집이 즐비</li>
<li><strong>쿠시카츠</strong> - 다루마 쿠시카츠 추천</li>
</ul>

<h3>저녁 - 신사이바시 쇼핑</h3>
<p>도톤보리와 연결된 신사이바시 쇼핑거리에서 드럭스토어, 돈키호테 등을 둘러보세요. 면세 쇼핑 기회!</p>

<h2>Day 2: 유니버셜 스튜디오 재팬</h2>
<h3>팁: 익스프레스 패스 구매 추천</h3>
<p>인기 어트랙션 대기시간을 줄이려면 익스프레스 패스는 필수입니다. 특히 <strong>슈퍼 닌텐도 월드</strong>와 <strong>해리포터 존</strong>은 패스 없이는 2-3시간 대기가 기본!</p>

<h3>필수 어트랙션</h3>
<ul>
<li><strong>슈퍼 닌텐도 월드</strong> - 마리오 카트, 쿠파 주니어 파이널 배틀</li>
<li><strong>해리포터 금지된 여행</strong> - 호그와트 성 내부 체험</li>
<li><strong>쥬라기 월드</strong> - 스릴 넘치는 물놀이 어트랙션</li>
<li><strong>미니언 파크</strong> - 귀여운 미니언들과 함께</li>
</ul>

<h2>Day 3: 교토 당일치기</h2>
<h3>오전 - 후시미 이나리 신사</h3>
<p>오사카에서 JR로 약 40분, 유명한 <strong>천 개의 도리이</strong>를 볼 수 있는 후시미 이나리 신사입니다. 이른 아침에 가면 사람이 적어 사진 찍기 좋아요.</p>

<h3>오후 - 기온 & 청수사</h3>
<p>게이샤 거리로 유명한 <strong>기온</strong>을 거닐고, <strong>청수사(기요미즈데라)</strong>에서 교토 시내를 한눈에 내려다보세요. 특히 단풍철이나 벚꽃철에는 환상적인 풍경을 볼 수 있습니다.</p>

<h3>저녁 - 니시키 시장</h3>
<p>교토의 부엌이라 불리는 니시키 시장에서 다양한 일본 먹거리를 맛보세요. 유바(두부껍질), 교토 절임 등 교토만의 음식을 경험할 수 있습니다.</p>

<h2>Day 4: 오사카 성 & 귀국</h2>
<h3>오전 - 오사카 성</h3>
<p>일본 3대 명성 중 하나인 오사카 성! 천수각에 올라가 오사카 시내를 조망하고, 성 주변 공원을 산책해보세요.</p>

<h3>점심 - 쿠로몬 시장</h3>
<p>오사카의 부엌 <strong>쿠로몬 시장</strong>에서 신선한 해산물 브런치를 즐기세요. 성게, 참치, 딸기 등 다양한 먹거리가 있습니다.</p>

<h3>오후 - 공항으로 이동</h3>
<p>여유롭게 공항으로 이동하여 면세점 쇼핑까지 마무리!</p>

<h2>예상 경비 (1인 기준)</h2>
<table>
<tr><td>항공권</td><td>20-40만원</td></tr>
<tr><td>숙소 (3박)</td><td>15-30만원</td></tr>
<tr><td>교통비</td><td>5-8만원</td></tr>
<tr><td>식비</td><td>10-15만원</td></tr>
<tr><td>입장료</td><td>8-15만원</td></tr>
<tr><td><strong>총합</strong></td><td><strong>약 60-110만원</strong></td></tr>
</table>

<h2>꿀팁</h2>
<ul>
<li>오사카 주유패스 2일권 구매하면 지하철 무제한 + 주요 관광지 무료입장</li>
<li>이코카(ICOCA) 카드 미리 준비하면 교통비 결제 편리</li>
<li>일본 입국 시 Visit Japan Web 미리 등록 필수</li>
</ul>

<p>즐거운 오사카 여행 되세요! 일본 구매대행이 필요하시면 <a href="https://bidbuy.co.kr" target="_blank">비드바이</a>를 이용해주세요.</p>`,
    view_count: 128,
    published_at: new Date().toISOString()
  },
  {
    id: 'yen-exchange-timing-guide',
    title: '엔화 환전 타이밍 완벽 가이드 - 환율 저점에 환전하는 방법',
    slug: 'yen-exchange-timing-guide',
    category: 'exchange',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    meta_description: '엔화 환전 최적의 타이밍을 알려드립니다. 환율 변동 패턴, 환전 꿀팁, 수수료 절약 방법까지 총정리.',
    keywords: '엔화환전, 일본환율, 환전타이밍, 엔화환율, 일본여행환전',
    content: `<h2>엔화 환전, 언제가 가장 좋을까?</h2>
<p>일본 여행을 계획할 때 가장 고민되는 것 중 하나가 바로 <strong>환전 타이밍</strong>입니다. 같은 금액이라도 환율에 따라 수만 원의 차이가 날 수 있기 때문이죠. 이 글에서는 엔화 환전의 최적 타이밍과 노하우를 알려드립니다.</p>

<h2>엔화 환율 변동 패턴 이해하기</h2>
<h3>1. 연간 패턴</h3>
<ul>
<li><strong>1-2월</strong>: 일본 기업 결산 시즌으로 엔화 강세 경향</li>
<li><strong>3-4월</strong>: 일본 신학기/회계연도 시작, 변동성 증가</li>
<li><strong>7-8월</strong>: 여름 휴가철, 수요 증가로 환율 상승 경향</li>
<li><strong>11-12월</strong>: 연말 정산 시즌, 상대적 안정세</li>
</ul>

<h3>2. 주간 패턴</h3>
<ul>
<li><strong>월요일</strong>: 주말 뉴스 반영으로 변동성 큼</li>
<li><strong>화-목요일</strong>: 상대적으로 안정적</li>
<li><strong>금요일</strong>: 주말 대비 포지션 정리로 변동 가능</li>
</ul>

<h2>환전 방법별 수수료 비교</h2>
<table>
<tr><th>환전 방법</th><th>수수료율</th><th>장점</th><th>단점</th></tr>
<tr><td>시중은행 영업점</td><td>1.5-1.75%</td><td>안전, 신뢰</td><td>높은 수수료</td></tr>
<tr><td>인터넷/모바일뱅킹</td><td>0.5-1.0%</td><td>우대환율</td><td>수령 번거로움</td></tr>
<tr><td>환전소 (명동 등)</td><td>0.3-0.8%</td><td>낮은 수수료</td><td>직접 방문 필요</td></tr>
<tr><td>공항 환전</td><td>2.0% 이상</td><td>편리함</td><td>가장 비쌈</td></tr>
<tr><td>트래블월렛/카드</td><td>0-0.5%</td><td>실시간 환율</td><td>한도 제한</td></tr>
</table>

<h2>환전 꿀팁 5가지</h2>
<h3>1. 환율 알림 설정하기</h3>
<p>네이버, 카카오뱅크 등에서 <strong>목표 환율 알림</strong>을 설정해두세요. 원하는 환율에 도달하면 바로 알림을 받을 수 있습니다.</p>

<h3>2. 분할 환전 전략</h3>
<p>한 번에 모든 금액을 환전하지 말고 <strong>2-3회에 나눠서</strong> 환전하세요. 환율 변동 리스크를 줄일 수 있습니다.</p>

<h3>3. 트래블월렛 활용</h3>
<p>토스, 카카오페이, 트래블월렛 등의 서비스를 이용하면 <strong>실시간 환율</strong>로 결제할 수 있고, 수수료도 저렴합니다.</p>

<h3>4. 출발 2주 전부터 모니터링</h3>
<p>여행 출발 최소 <strong>2주 전</strong>부터 환율을 체크하세요. 급격한 변동이 있을 때 대응할 시간이 필요합니다.</p>

<h3>5. 현지 ATM 활용</h3>
<p>일본 세븐일레븐 ATM에서 <strong>해외 출금</strong>하면 의외로 환율이 좋은 경우가 많습니다. 단, 출금 수수료 확인 필수!</p>

<h2>현재 엔화 환율 동향</h2>
<p>2024년 엔화는 역사적 약세를 보이고 있어 <strong>일본 여행의 적기</strong>입니다. 100엔당 850-900원대를 유지하고 있어, 예전 1,100-1,200원대와 비교하면 20-30% 저렴하게 여행할 수 있습니다.</p>

<h2>환전 체크리스트</h2>
<ul>
<li>여행 2주 전: 환율 모니터링 시작</li>
<li>여행 1주 전: 1차 환전 (전체 금액의 50%)</li>
<li>여행 3일 전: 2차 환전 (나머지 금액)</li>
<li>비상금: 트래블월렛에 10만원 정도 충전</li>
</ul>

<p>환전도 전략이 필요합니다! 일본에서 쇼핑할 계획이라면 <a href="https://bidbuy.co.kr" target="_blank">비드바이 구매대행</a>도 함께 알아보세요.</p>`,
    view_count: 95,
    published_at: new Date().toISOString()
  },
  {
    id: 'yahoo-auction-beginner-guide',
    title: '야후옥션 입찰 가이드 - 처음 시작하는 일본 경매 완벽 정리',
    slug: 'yahoo-auction-beginner-guide',
    category: 'proxy',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    meta_description: '야후재팬 옥션 입찰 방법을 초보자도 쉽게 따라할 수 있도록 정리했습니다. 회원가입부터 낙찰까지 A to Z.',
    keywords: '야후옥션, 야후재팬옥션, 일본경매, 구매대행, 비드바이',
    content: `<h2>야후옥션이란?</h2>
<p><strong>야후재팬 옥션(ヤフオク!)</strong>은 일본 최대의 온라인 경매 사이트입니다. 한국의 이베이코리아나 중고나라와 비슷하지만, 규모와 상품 다양성에서 압도적입니다. 특히 <strong>한정판 피규어, 빈티지 카메라, 중고 명품, 일본 전통 공예품</strong> 등을 저렴하게 구할 수 있어 한국에서도 인기가 많습니다.</p>

<h2>야후옥션의 장점</h2>
<ul>
<li><strong>압도적인 상품 수</strong>: 상시 5,000만 개 이상의 상품 등록</li>
<li><strong>저렴한 가격</strong>: 경매 방식으로 시세보다 싸게 구매 가능</li>
<li><strong>희귀 상품</strong>: 한국에서 구할 수 없는 일본 한정판</li>
<li><strong>중고 명품</strong>: 상태 좋은 중고 명품을 합리적 가격에</li>
</ul>

<h2>구매대행 이용 방법</h2>
<p>야후옥션은 <strong>일본 내 배송만</strong> 지원하기 때문에, 한국에서 구매하려면 구매대행 서비스를 이용해야 합니다.</p>

<h3>구매대행 흐름</h3>
<ol>
<li><strong>상품 검색</strong>: 야후옥션에서 원하는 상품 찾기</li>
<li><strong>대행 신청</strong>: 구매대행 사이트에 상품 URL 등록</li>
<li><strong>입찰 진행</strong>: 대행업체가 대신 입찰</li>
<li><strong>낙찰 & 결제</strong>: 낙찰되면 상품가 + 대행 수수료 결제</li>
<li><strong>일본 내 배송</strong>: 판매자 → 대행업체 창고</li>
<li><strong>한국 배송</strong>: 대행업체 → 고객님 주소</li>
</ol>

<h2>입찰 용어 정리</h2>
<table>
<tr><th>용어</th><th>의미</th></tr>
<tr><td>現在価格 (현재가격)</td><td>현재 입찰가</td></tr>
<tr><td>即決価格 (즉결가격)</td><td>즉시 구매 가격</td></tr>
<tr><td>入札 (입찰)</td><td>경매 참여</td></tr>
<tr><td>落札 (낙찰)</td><td>경매 승리</td></tr>
<tr><td>送料 (송료)</td><td>배송비</td></tr>
<tr><td>新品 (신품)</td><td>새 상품</td></tr>
<tr><td>中古 (중고)</td><td>중고 상품</td></tr>
<tr><td>未使用 (미사용)</td><td>미개봉/미사용</td></tr>
</table>

<h2>입찰 꿀팁</h2>
<h3>1. 스나이핑(Sniping) 전략</h3>
<p>경매 종료 직전에 입찰하는 전략입니다. 너무 일찍 입찰하면 가격이 올라가므로, <strong>종료 5분 전</strong>에 입찰하는 것이 유리합니다.</p>

<h3>2. 판매자 평가 확인</h3>
<p>판매자의 <strong>평가 점수</strong>와 <strong>거래 후기</strong>를 꼭 확인하세요. 평가가 낮거나 부정적 후기가 많으면 피하는 것이 좋습니다.</p>

<h3>3. 상품 상태 꼼꼼히 체크</h3>
<p>사진과 설명을 꼼꼼히 확인하세요. 특히 <strong>ジャンク(정크/고장품)</strong> 표시가 있는지 확인!</p>

<h3>4. 배송비 함정 주의</h3>
<p>상품가가 싸도 <strong>배송비가 비싼 경우</strong>가 많습니다. 입찰 전 배송비를 꼭 확인하세요.</p>

<h3>5. 환율 계산 필수</h3>
<p>엔화 표시 가격에 <strong>현재 환율</strong>을 적용해서 원화로 계산해보세요. 대행 수수료, 국제배송비까지 포함하면 생각보다 비쌀 수 있습니다.</p>

<h2>주의사항</h2>
<ul>
<li><strong>위조품 주의</strong>: 너무 싼 명품은 가품일 가능성</li>
<li><strong>관세</strong>: 15만원 이상 상품은 관세 부과 가능</li>
<li><strong>배송 불가 품목</strong>: 배터리, 액체류 등 항공 운송 제한</li>
<li><strong>A/S 불가</strong>: 일본 제품은 한국 A/S 어려움</li>
</ul>

<h2>인기 카테고리</h2>
<ul>
<li><strong>피규어/프라모델</strong>: 반다이, 굿스마일컴퍼니 한정판</li>
<li><strong>카메라/렌즈</strong>: 빈티지 필름 카메라, 중고 렌즈</li>
<li><strong>시계</strong>: 세이코, 카시오 한정판</li>
<li><strong>패션</strong>: 일본 브랜드 의류, 중고 명품</li>
<li><strong>음반/DVD</strong>: 일본판 한정 음반, 블루레이</li>
</ul>

<p>야후옥션 구매대행은 <a href="https://bidbuy.co.kr" target="_blank"><strong>비드바이</strong></a>에서 편리하게 이용하실 수 있습니다. 입찰부터 배송까지 원스톱으로 도와드립니다!</p>`,
    view_count: 156,
    published_at: new Date().toISOString()
  }
];

async function seedPosts() {
  console.log('블로그 포스트 데이터 삽입 시작...');

  for (const post of posts) {
    const { data, error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`오류 - ${post.title}:`, error.message);
    } else {
      console.log(`성공 - ${post.title}`);
    }
  }

  console.log('완료!');
}

seedPosts();
