// pages/admin/settings.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Settings() {
  const router = useRouter();
  const [config, setConfig] = useState({
    youtube_api_key: '',
    gemini_api_key: '',
    telegram_bot_token: '',
    telegram_chat_id: '',
    min_views: 10000,
    max_results: 20,
    // SNS ì±„ë„
    sns_youtube: '',
    sns_instagram: '',
    sns_facebook: '',
    sns_twitter: '',
    sns_blog: '',
    sns_kakao: '',
  });

  const [validation, setValidation] = useState({
    youtube: false,
    gemini: false,
    telegram: false,
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [keyStatus, setKeyStatus] = useState({
    youtube: false,
    gemini: false,
    telegram: false,
  });

  // ?¤ì • ë¶ˆëŸ¬?¤ê¸°
  useEffect(() => {
    fetchConfig();
    fetchValidation();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.success) {
        // API ?¤ëŠ” ë¹?ë¬¸ì?´ë¡œ ?œì‹œ (ë³´ì•ˆ???œë²„?ì„œ ë§ˆìŠ¤?¹ëœ ê°’ë§Œ ??
        // ?ˆë¡œ??ê°’ì„ ?…ë ¥?´ì•¼ë§??€?¥ë¨
        setConfig({
          youtube_api_key: '',
          gemini_api_key: '',
          telegram_bot_token: '',
          telegram_chat_id: data.config.telegram_chat_id || '',
          min_views: data.config.min_views || 10000,
          max_results: data.config.max_results || 20,
          // SNS ì±„ë„
          sns_youtube: data.config.sns_youtube || '',
          sns_instagram: data.config.sns_instagram || '',
          sns_facebook: data.config.sns_facebook || '',
          sns_twitter: data.config.sns_twitter || '',
          sns_blog: data.config.sns_blog || '',
          sns_kakao: data.config.sns_kakao || '',
        });
        // ?€?¥ëœ ?¤ê? ?ˆëŠ”ì§€ ?œì‹œ
        setKeyStatus({
          youtube: !!data.config.youtube_api_key,
          gemini: !!data.config.gemini_api_key,
          telegram: !!data.config.telegram_bot_token,
        });
      }
    } catch (error) {
      console.error('?¤ì • ë¶ˆëŸ¬?¤ê¸° ?¤íŒ¨:', error);
    }
  };

  const fetchValidation = async () => {
    try {
      const res = await fetch('/api/config/validate');
      const data = await res.json();
      if (data.success) {
        setValidation(data.validation);
      }
    } catch (error) {
      console.error('ê²€ì¦??¤íŒ¨:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // ë¹?ê°’ì? ?œì™¸?˜ê³  ?„ì†¡ (ë¹?ë¬¸ì?´ì´ë©?ê¸°ì¡´ ê°?? ì?)
      const updateData = {};
      Object.keys(config).forEach((key) => {
        const value = config[key];
        if (typeof value === 'string' && value.trim() !== '') {
          updateData[key] = value.trim();
        } else if (typeof value === 'number') {
          updateData[key] = value;
        }
      });

      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: '???¤ì •???€?¥ë˜?ˆìŠµ?ˆë‹¤!' });
        alert('???¤ì •???±ê³µ?ìœ¼ë¡??€?¥ë˜?ˆìŠµ?ˆë‹¤!');
        fetchValidation();
        setTimeout(() => {
          fetchConfig();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: `??${data.error}` });
        alert(`???€???¤íŒ¨: ${data.error}`);
      }
    } catch (error) {
      setMessage({ type: 'error', text: `???€???¤íŒ¨: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">?™ï¸ ?œìŠ¤???¤ì •</h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ???€?œë³´?œë¡œ ?Œì•„ê°€ê¸?          </button>
        </div>
        <p className="text-gray-600 mb-8">
          API ??ë°??œìŠ¤???¤ì •??ê´€ë¦¬í•©?ˆë‹¤
        </p>

        {/* ?íƒœ ?œì‹œ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">?“Š API ?íƒœ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                validation.youtube
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">YouTube API</span>
                <span className="text-2xl">
                  {validation.youtube ? '?? : '??}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {validation.youtube ? '?•ìƒ ?‘ë™' : '???„ìš”'}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                validation.gemini
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Gemini API</span>
                <span className="text-2xl">
                  {validation.gemini ? '?? : '??}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {validation.gemini ? '?•ìƒ ?‘ë™' : '???„ìš”'}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                validation.telegram
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Telegram (? íƒ)</span>
                <span className="text-2xl">
                  {validation.telegram ? '?? : '??}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {validation.telegram ? '?•ìƒ ?‘ë™' : '? íƒ?¬í•­'}
              </p>
            </div>
          </div>
        </div>

        {/* ?¤ì • ??*/}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">?”‘ API ???¤ì •</h2>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* YouTube API */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Data API v3 ??<span className="text-red-500">*</span>
              {keyStatus.youtube && <span className="ml-2 text-green-600 text-xs">(?€?¥ë¨ ??</span>}
            </label>
            <input
              type="text"
              name="youtube_api_key"
              value={config.youtube_api_key}
              onChange={handleChange}
              placeholder={keyStatus.youtube ? "???¤ë? ?…ë ¥?˜ë©´ ê¸°ì¡´ ?¤ê? êµì²´?©ë‹ˆ?? : "AIza..."}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                Google Cloud Console?ì„œ ë°œê¸‰ ??              </a>
            </p>
          </div>

          {/* Gemini API */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Gemini API ??<span className="text-red-500">*</span>
              {keyStatus.gemini && <span className="ml-2 text-green-600 text-xs">(?€?¥ë¨ ??</span>}
            </label>
            <input
              type="text"
              name="gemini_api_key"
              value={config.gemini_api_key}
              onChange={handleChange}
              placeholder={keyStatus.gemini ? "???¤ë? ?…ë ¥?˜ë©´ ê¸°ì¡´ ?¤ê? êµì²´?©ë‹ˆ?? : "AIza..."}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                Google AI Studio?ì„œ ë°œê¸‰ ??              </a>
            </p>
          </div>

          {/* Telegram Bot */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telegram Bot Token (? íƒ?¬í•­)
              {keyStatus.telegram && <span className="ml-2 text-green-600 text-xs">(?€?¥ë¨ ??</span>}
            </label>
            <input
              type="text"
              name="telegram_bot_token"
              value={config.telegram_bot_token}
              onChange={handleChange}
              placeholder={keyStatus.telegram ? "??? í°???…ë ¥?˜ë©´ ê¸°ì¡´ ? í°??êµì²´?©ë‹ˆ?? : "1234567890:ABCdef..."}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telegram Chat ID (? íƒ?¬í•­)
            </label>
            <input
              type="text"
              name="telegram_chat_id"
              value={config.telegram_chat_id}
              onChange={handleChange}
              placeholder="123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://t.me/botfather"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                BotFather?ì„œ ë´??ì„± ??              </a>
            </p>
          </div>

          {/* SNS ì±„ë„ ?¤ì • */}
          <hr className="my-8" />
          <h2 className="text-xl font-semibold mb-6">?“± SNS ì±„ë„ ?¤ì •</h2>
          <p className="text-gray-600 mb-4 text-sm">
            ë¸”ë¡œê·??˜ë‹¨???œì‹œ??SNS ì±„ë„ ë§í¬ë¥??¤ì •?©ë‹ˆ?? ë¹?ì¹¸ìœ¼ë¡??ë©´ ?´ë‹¹ ?„ì´ì½˜ì´ ?œì‹œ?˜ì? ?ŠìŠµ?ˆë‹¤.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* YouTube ì±„ë„ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?“º YouTube ì±„ë„
              </label>
              <input
                type="url"
                name="sns_youtube"
                value={config.sns_youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@ì±„ë„ëª?
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?“· Instagram
              </label>
              <input
                type="url"
                name="sns_instagram"
                value={config.sns_instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/ê³„ì •ëª?
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?‘¤ Facebook
              </label>
              <input
                type="url"
                name="sns_facebook"
                value={config.sns_facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/?˜ì´ì§€ëª?
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Twitter/X */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?¦ Twitter (X)
              </label>
              <input
                type="url"
                name="sns_twitter"
                value={config.sns_twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/ê³„ì •ëª?
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* ?¤ì´ë²?ë¸”ë¡œê·?*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?“ ?¤ì´ë²?ë¸”ë¡œê·?              </label>
              <input
                type="url"
                name="sns_blog"
                value={config.sns_blog}
                onChange={handleChange}
                placeholder="https://blog.naver.com/ë¸”ë¡œê·¸ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* ì¹´ì¹´?¤í†¡ ì±„ë„ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?’¬ ì¹´ì¹´?¤í†¡ ì±„ë„
              </label>
              <input
                type="url"
                name="sns_kakao"
                value={config.sns_kakao}
                onChange={handleChange}
                placeholder="https://pf.kakao.com/ì±„ë„ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* ê²€???¤ì • */}
          <hr className="my-8" />
          <h2 className="text-xl font-semibold mb-6">?” ê²€???¤ì •</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ìµœì†Œ ì¡°íšŒ???„í„°
            </label>
            <input
              type="number"
              name="min_views"
              value={config.min_views}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              ??ì¡°íšŒ???´ìƒ???ìƒë§?ê²€??ê²°ê³¼???œì‹œ?©ë‹ˆ??            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ìµœë? ê²€??ê²°ê³¼ ??            </label>
            <input
              type="number"
              name="max_results"
              value={config.max_results}
              onChange={handleChange}
              min="5"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              ??ë²ˆì— ê²€?‰í•  ìµœë? ?ìƒ ??(5-50ê°?
            </p>
          </div>

          {/* ?œì¶œ ë²„íŠ¼ */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {loading ? '?€??ì¤?..' : '?’¾ ?¤ì • ?€??}
          </button>
        </form>

        {/* ?ˆë‚´ ë©”ì‹œì§€ */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">? ï¸</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                ë³´ì•ˆ ì£¼ì˜?¬í•­
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>API ?¤ëŠ” ?ˆë? ?¸ë???ê³µìœ ?˜ì? ë§ˆì„¸??/li>
                  <li>?•ê¸°?ìœ¼ë¡?API ?¤ë? ê°±ì‹ ?˜ì„¸??/li>
                  <li>Git ?€?¥ì†Œ??ì»¤ë°‹?˜ì? ?Šë„ë¡?ì£¼ì˜?˜ì„¸??/li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
