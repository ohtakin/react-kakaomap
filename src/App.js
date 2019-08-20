import React, { useState, Fragment } from "react";
import "./App.css";
import {
  withJs,
  withKakaoMap,
  KakaoMap,
  MarkerClusterer,
  InfoWindoWithMarker,
  CustomOverlay,
  Polyline
} from "react-kakaomap-api";
import { FullScreen } from "./components/fullscreen";
import { vehicles } from "./data/vehicles";
import { path } from "./data/path";

const Kakao = withJs(
  `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    process.env.REACT_APP_KAKAO_API_KEY
  }&libraries=services,clusterer,drawing&autoload=false`
)(withKakaoMap(KakaoMap));

function App() {
  const gps = { lat: 37.54074492224992, lng: 126.96414483172607 };
  const bounds = [];
  const Markers = vehicles.map(({ lat, lng, plateNumber }, index) => {
    bounds.push({ lat, lng });
    return (
      <Fragment key={index}>
        <InfoWindoWithMarker
          delay={100 * index}
          options={{
            lat,
            lng,
            content: plateNumber,
            image: {
              url: require("./images/map-pin.png"),
              width: 30,
              height: 30
            }
          }}
        />
        <CustomOverlay
          className="custom_overlay"
          options={{ lng, lat, content: plateNumber }}
        />
      </Fragment>
    );
  });

  const polylineBounds = [];
  path.forEach(p => {
    const { lat, lng } = p;
    polylineBounds.push({ lat, lng });
  });

  const options = {
    gridSize: 35,
    averageCenter: true,
    minLevel: 6,
    disableClickZoom: true
  };

  const onZoomChang = map => {
    const level = map.getLevel();
  };

  return (
    <div className="App">
      <Kakao
        onZoomChang={onZoomChang}
        options={{
          lat: gps.lat,
          lng: gps.lng,
          // bounds: bounds,
          zoom: "BOTTOMRIGHT",
          mapType: "TOPLEFT"
        }}
      >
        <MarkerClusterer options={options}>{Markers}</MarkerClusterer>
        <Polyline
          delay={10}
          bounds={true}
          options={{ path: path, strokeColor: "#0000ff", strokeWeight: 4 }}
        />
      </Kakao>
      <FullScreen id="full-screen" canvas="map-canvas" />
    </div>
  );
}
export default App;
