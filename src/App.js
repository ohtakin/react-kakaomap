import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { useKakao } from "./components";
import {
  Marker,
  MarkerClusterer,
  CustomOverlay,
  Polyline,
  InfoWindoWithMarker
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
  const [vehicleData, setvehicleData] = useState(vehicles);

  const Markers = vehicleData.map(
    ({ lat, lng, plateNumber, visible }, index) => (
      <Fragment key={index}>
        <InfoWindoWithMarker
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
    )
  );

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
