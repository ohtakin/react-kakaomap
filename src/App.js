import React from "react";
import "./App.css";
import { useKakao } from "./components";
import { Marker, MarkerClusterer } from "./components/kakaomap";
import { vehicles } from "./data/vehicles";

function App() {
  const gps = { lat: 37.54074492224992, lng: 126.96414483172607 };
  const Kakao = useKakao(
    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      process.env.REACT_APP_KAKAO_API_KEY
    }&libraries=services,clusterer,drawing&autoload=false`
  );

  const Markers = vehicles.map(({ lat, lng }, index) => (
    <Marker
      key={index}
      position={{ lat, lng }}
      image={{
        url: require("./images/down-arrow-icon.svg"),
        width: 30,
        height: 30
      }}
    />
  ));

  const options = {
    gridSize: 35,
    averageCenter: true,
    minLevel: 6,
    disableClickZoom: true
  };

  return (
    <div className="App">
      <Kakao lng={gps.lng} lat={gps.lat}>
        <MarkerClusterer options={options}>
          {Markers}
        </MarkerClusterer>
      </Kakao>
    </div>
  );
}
export default App;
