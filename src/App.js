import React, { Fragment } from "react";
import "./App.css";
import { useKakao } from "./components";
import {
  Marker,
  MarkerClusterer,
  CustomOverlay,
  Polyline
} from "./components/kakaomap";
import { vehicles } from "./data/vehicles";
import { path } from "./data/path";

function App() {
  const gps = { lat: 37.54074492224992, lng: 126.96414483172607 };
  const Kakao = useKakao(
    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      process.env.REACT_APP_KAKAO_API_KEY
    }&libraries=services,clusterer,drawing&autoload=false`
  );

  const Markers = vehicles.map(({ lat, lng, plateNumber }, index) => (
    <Fragment key={index}>
      <Marker
        options={{
          lat,
          lng,
          image: {
            url: require("./images/down-arrow-icon.svg"),
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
  ));

  const options = {
    gridSize: 35,
    averageCenter: true,
    minLevel: 6,
    disableClickZoom: true
  };

  return (
    <div className="App">
      <Kakao options={{ lng: gps.lng, lat: gps.lat, zoom: "BOTTOMRIGHT" }}>
        <MarkerClusterer options={options}>{Markers}</MarkerClusterer>
        <Polyline
          options={{ path: path, strokeColor: "#0000ff", strokeWeight: 4 }}
        />
      </Kakao>
    </div>
  );
}
export default App;
