import React from "react";
// import Loadable from "react-loadable";

// const Loading = () => {
//   return <div>Kakao 지도 로딩중...</div>;
// };

// const KakaoMap = Loadable({
//   loader: () => import("./KakaoMap"),
//   loading: Loading
// });

import KakaoMap from "./KakaoMap";
export default KakaoMap;
export { default as Marker } from "./Marker";
export { default as MarkerClusterer } from "./MarkerClusterer";
export { default as CustomOverlay } from "./CustomOverlay";
export { default as Polyline } from "./Polyline";
export { default as InfoWindoWithMarker } from "./InfoWindoWithMarker";
// export const Marker = lazy(() => import('./Marker'));
