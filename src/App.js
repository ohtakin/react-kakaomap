import React from "react";
import "./App.css";
import { withJs, withKakaoMap } from "./components";
import KakaoMap from "./components/kakaomap";
import Tmap from "./components/tmap";

const Kakao = withJs(
  `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    process.env.REACT_APP_KAKAO_API_KEY
  }&libraries=services,clusterer,drawing&autoload=false`
)(withKakaoMap(KakaoMap));

function App() {
  const gps = { lat: 37.54074492224992, lng: 126.96414483172607 };
  return (
    <div className="App">
      <Kakao lng={gps.lng} lat={gps.lat} />
    </div>
  );
}

export default App;
