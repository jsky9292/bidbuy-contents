// pages/quiz.js
// 보담 - 보험금 자가진단 퀴즈

import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const quizData = {
  auto: {
    title: '자동차보험 보험금 진단',
    icon: '🚗',
    questions: [
      {
        question: '사고 유형은 무엇인가요?',
        options: [
          { text: '내 차 파손 (자차)', score: 10 },
          { text: '상대방 차 파손', score: 15 },
          { text: '상대방 부상', score: 25 },
          { text: '내 부상', score: 20 },
        ]
      },
      {
        question: '사고 과실 비율은 어떻게 되나요?',
        options: [
          { text: '내 과실 0% (완전 피해자)', score: 30 },
          { text: '내 과실 30% 이하', score: 20 },
          { text: '내 과실 50%', score: 10 },
          { text: '내 과실 70% 이상', score: 5 },
        ]
      },
      {
        question: '현재 치료 상태는?',
        options: [
          { text: '치료 완료', score: 10 },
          { text: '치료 중 (통원)', score: 15 },
          { text: '입원 치료 중', score: 25 },
          { text: '후유장해 진단받음', score: 35 },
        ]
      },
      {
        question: '보험사와 합의 진행 상태는?',
        options: [
          { text: '아직 합의 전', score: 20 },
          { text: '합의 진행 중', score: 15 },
          { text: '합의금 제시받음', score: 10 },
          { text: '합의 거절/분쟁 중', score: 25 },
        ]
      }
    ]
  },
  health: {
    title: '실손보험 청구 진단',
    icon: '🏥',
    questions: [
      {
        question: '어떤 치료를 받으셨나요?',
        options: [
          { text: '외래 진료/약 처방', score: 10 },
          { text: '검사 (MRI, CT 등)', score: 15 },
          { text: '입원 치료', score: 25 },
          { text: '수술', score: 30 },
        ]
      },
      {
        question: '보험 가입 시기는?',
        options: [
          { text: '1세대 실손 (2009년 이전)', score: 30 },
          { text: '2세대 실손 (2009-2017)', score: 25 },
          { text: '3세대 실손 (2017-2021)', score: 15 },
          { text: '4세대 실손 (2021년 이후)', score: 10 },
        ]
      },
      {
        question: '청구 금액 규모는?',
        options: [
          { text: '10만원 미만', score: 5 },
          { text: '10-50만원', score: 15 },
          { text: '50-200만원', score: 25 },
          { text: '200만원 이상', score: 35 },
        ]
      },
      {
        question: '이전 청구 거절 경험이 있나요?',
        options: [
          { text: '없음', score: 10 },
          { text: '일부 삭감됨', score: 20 },
          { text: '전액 거절됨', score: 30 },
          { text: '모름', score: 15 },
        ]
      }
    ]
  },
  life: {
    title: '생명/건강보험 진단',
    icon: '💰',
    questions: [
      {
        question: '청구하려는 보험금 종류는?',
        options: [
          { text: '입원/수술비', score: 15 },
          { text: '진단비 (암, 뇌, 심장 등)', score: 30 },
          { text: '후유장해 보험금', score: 35 },
          { text: '사망보험금', score: 25 },
        ]
      },
      {
        question: '보험 가입 후 경과 기간은?',
        options: [
          { text: '2년 미만', score: 10 },
          { text: '2-5년', score: 20 },
          { text: '5-10년', score: 25 },
          { text: '10년 이상', score: 30 },
        ]
      },
      {
        question: '고지의무 위반 가능성은?',
        options: [
          { text: '없음 (건강하게 가입)', score: 30 },
          { text: '경미한 질병 미고지', score: 15 },
          { text: '중요 질병 미고지', score: 5 },
          { text: '모르겠음', score: 10 },
        ]
      },
      {
        question: '보험사 심사 결과는?',
        options: [
          { text: '아직 청구 전', score: 20 },
          { text: '심사 중', score: 15 },
          { text: '일부 지급', score: 25 },
          { text: '지급 거절', score: 35 },
        ]
      }
    ]
  }
};

export default function Quiz() {
  const [selectedType, setSelectedType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < quizData[selectedType].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTotalScore = () => answers.reduce((a, b) => a + b, 0);

  const getResultMessage = () => {
    const score = getTotalScore();
    if (score >= 80) {
      return {
        level: '높음',
        color: 'emerald',
        message: '추가 보험금 수령 가능성이 매우 높습니다!',
        detail: '전문 손해사정사 상담을 강력히 권장합니다. 적정 보상금을 놓치고 계실 수 있습니다.'
      };
    } else if (score >= 50) {
      return {
        level: '보통',
        color: 'yellow',
        message: '추가 보험금 가능성이 있습니다.',
        detail: '구체적인 상황에 따라 추가 보상이 가능할 수 있습니다. 전문가 검토를 받아보세요.'
      };
    } else {
      return {
        level: '낮음',
        color: 'gray',
        message: '현재 상황에서는 추가 보험금 가능성이 낮습니다.',
        detail: '다만, 세부 사항에 따라 달라질 수 있으니 궁금하시면 상담 신청해주세요.'
      };
    }
  };

  const resetQuiz = () => {
    setSelectedType(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <Layout title="보험금 자가진단 퀴즈" description="내 보험금, 제대로 받고 있을까? 간단한 퀴즈로 확인해보세요.">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">보험금 자가진단</h1>
            <p className="text-gray-600">
              간단한 질문에 답하고 내 보험금 상황을 진단받아보세요.
            </p>
          </div>

          {/* 보험 유형 선택 */}
          {!selectedType && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6 text-center">어떤 보험을 진단받고 싶으세요?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(quizData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleTypeSelect(key)}
                    className="p-6 border-2 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center"
                  >
                    <div className="text-4xl mb-3">{data.icon}</div>
                    <div className="font-semibold">{data.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 퀴즈 진행 */}
          {selectedType && !showResult && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* 진행 바 */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{quizData[selectedType].title}</span>
                  <span>{currentQuestion + 1} / {quizData[selectedType].questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quizData[selectedType].questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* 질문 */}
              <h2 className="text-xl font-bold mb-6">
                {quizData[selectedType].questions[currentQuestion].question}
              </h2>

              {/* 선택지 */}
              <div className="space-y-3">
                {quizData[selectedType].questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full p-4 text-left border-2 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="mt-6 text-gray-500 text-sm hover:text-gray-700"
              >
                ← 처음으로 돌아가기
              </button>
            </div>
          )}

          {/* 결과 */}
          {showResult && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">
                  {getTotalScore() >= 80 ? '🎯' : getTotalScore() >= 50 ? '💡' : '📋'}
                </div>
                <h2 className="text-2xl font-bold mb-2">진단 결과</h2>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  getResultMessage().color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                  getResultMessage().color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  추가 보험금 가능성: {getResultMessage().level}
                </div>
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {getResultMessage().message}
                </p>
                <p className="text-gray-600">
                  {getResultMessage().detail}
                </p>
              </div>

              {/* 점수 바 */}
              <div className="mb-8 bg-gray-100 rounded-xl p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">진단 점수</span>
                  <span className="font-bold text-emerald-600">{getTotalScore()}점</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      getTotalScore() >= 80 ? 'bg-emerald-500' :
                      getTotalScore() >= 50 ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${Math.min(getTotalScore(), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Link href="/contact">
                  <button className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                    무료 상담 신청하기
                  </button>
                </Link>
                <button
                  onClick={resetQuiz}
                  className="w-full py-4 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  다시 진단받기
                </button>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <p className="text-center text-sm text-gray-500 mt-8">
            * 본 진단은 참고용이며, 정확한 판단은 전문가 상담을 통해 받으시기 바랍니다.
          </p>
        </div>
      </div>
    </Layout>
  );
}
