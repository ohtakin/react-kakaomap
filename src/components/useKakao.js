import { withKakaoMap, withJs } from "./";

import KakaoMap from "./kakaomap";

const useKakao = url => {
  const kakao = withJs(url)(withKakaoMap(KakaoMap));
  return kakao;
};

export default useKakao;
