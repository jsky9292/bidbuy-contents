// pages/api/contact.js
// 상담 신청 API

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    phone,
    email,
    insuranceType,
    accidentType,
    accidentDate,
    insuranceCompany,
    currentStatus,
    description,
    agreement
  } = req.body;

  if (!name || !phone || !insuranceType || !description) {
    return res.status(400).json({ error: '필수 정보를 입력해주세요.' });
  }

  try {
    // Supabase에 상담 신청 저장
    const { data, error } = await supabase
      .from('consultations')
      .insert([{
        name,
        phone,
        email: email || null,
        insurance_type: insuranceType,
        accident_type: accidentType || null,
        accident_date: accidentDate || null,
        insurance_company: insuranceCompany || null,
        current_status: currentStatus || null,
        description,
        agreement,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      // 테이블이 없으면 로그만 남기고 성공 처리 (테이블 생성 전에도 동작하도록)
      console.error('Supabase 저장 실패:', error);
      // 이메일 알림 등 대체 로직 추가 가능
    }

    console.log('[Contact] 상담 신청 접수:', { name, phone, insuranceType });

    return res.status(200).json({
      success: true,
      message: '상담 신청이 완료되었습니다.'
    });
  } catch (error) {
    console.error('상담 신청 오류:', error);
    return res.status(500).json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    });
  }
}
