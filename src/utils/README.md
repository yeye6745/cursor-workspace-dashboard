# Utils

프로토타입 구현에 필요한 유틸리티 함수들을 포함합니다.

## figmaAssets.js

Figma asset 경로를 로컬 이미지 경로로 변환하는 헬퍼 함수를 제공합니다.

### 사용 예시

```jsx
import { getFigmaAsset } from '../utils/figmaAssets';

// Figma에서 생성된 코드의 figma:asset 경로를 치환
function Icon({ figmaPath, localFile }) {
  return <img src={getFigmaAsset(figmaPath, localFile)} alt="icon" />;
}
```
