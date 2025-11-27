// lib/image-utils.js
// 이미지 압축 유틸리티

const sharp = require('sharp');

/**
 * Base64 이미지를 압축하여 용량 줄이기
 * @param {string} base64Data - 원본 base64 데이터
 * @param {string} mimeType - 원본 MIME 타입
 * @returns {Promise<string>} - 압축된 data URL
 */
async function compressBase64Image(base64Data, mimeType) {
  try {
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const originalSize = Math.round(imageBuffer.length / 1024);

    // 800x450 크기로 리사이즈하고 JPEG 60% 품질로 압축
    const compressedBuffer = await sharp(imageBuffer)
      .resize(800, 450, { fit: 'cover' })
      .jpeg({ quality: 60 })
      .toBuffer();

    const compressedSize = Math.round(compressedBuffer.length / 1024);
    const reduction = Math.round((1 - compressedSize / originalSize) * 100);
    console.log(`[INFO] 이미지 압축: ${originalSize}KB -> ${compressedSize}KB (${reduction}% 감소)`);

    return `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('[WARN] 이미지 압축 실패:', error.message);
    // 압축 실패시 원본 반환
    return `data:${mimeType};base64,${base64Data}`;
  }
}

module.exports = {
  compressBase64Image,
};
