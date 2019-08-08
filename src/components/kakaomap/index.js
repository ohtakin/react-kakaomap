import React from "react";
import Loadable from "react-loadable";

const Loading = () => {
  return <div>Kakao 지도 로딩중...</div>;
};

const KakaoMap = Loadable({
  loader: () => import("./KakaoMap"),
  loading: Loading
});

export default KakaoMap;
export { default as Marker } from "./Marker";
export { default as MarkerClusterer } from "./MarkerClusterer";
