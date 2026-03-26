/**
 * Figma asset 경로를 로컬 이미지 경로로 변환하는 유틸리티
 * 
 * Figma 자동 생성 코드의 figma:asset 형태를 
 * src/assets/figma/icon 경로의 로컬 이미지로 치환합니다.
 * 
 * @param {string} figmaAssetPath - Figma asset 경로 (예: "figma:asset:...")
 * @param {string} localFileName - 로컬 파일명 (예: "icon-home.svg")
 * @returns {string} 로컬 이미지 경로
 * 
 * @example
 * // Figma 코드: <img src="figma:asset:abc123" />
 * // 사용: <img src={getFigmaAsset('figma:asset:abc123', 'icon-home.svg')} />
 */
export function getFigmaAsset(figmaAssetPath, localFileName) {
  // figma:asset 형태의 경로를 로컬 경로로 변환
  if (figmaAssetPath && figmaAssetPath.startsWith('figma:asset:')) {
    return `/src/assets/figma/icon/${localFileName}`;
  }
  return figmaAssetPath;
}

/**
 * 이미지 import를 위한 동적 경로 생성
 * Vite에서 동적 import를 사용할 때 유용합니다.
 * 
 * @param {string} fileName - 이미지 파일명
 * @returns {Promise} 이미지 모듈
 */
export async function importFigmaIcon(fileName) {
  try {
    return await import(`/src/assets/figma/icon/${fileName}`);
  } catch (error) {
    console.warn(`Figma icon not found: ${fileName}`, error);
    return null;
  }
}
