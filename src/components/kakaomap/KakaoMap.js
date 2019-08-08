import React, { useState, useCallback } from "react";
import FullScreen from "../fullscreen/FullScreen";
import Wrapper from "../Wrapper";

export const MapContext = React.createContext({});

const KakaoMap = props => {
  const [state, setState] = useState({
    map: null,
    kakao: props.kakao
  });
  const canvas_id = "map-canvas";
  const handleLoaded = useCallback(node => {
    const { kakao, lat, lng, level, zoom } = props;
    if (state.map || node === null) {
      return;
    }

    const map = new kakao.maps.Map(node, {
      level: level || 9,
      center: new kakao.maps.LatLng(lat, lng)
    });

    if (zoom) {
      map.addControl(
        new kakao.maps.ZoomControl(),
        kakao.maps.ControlPosition[zoom]
      );
    }
    setState({ map, kakao });
  });
  
  return (
    <Wrapper id={canvas_id}>
      <FullScreen id="full-screen" canvas={canvas_id} />
      <Wrapper id="kakao-map" ref={handleLoaded}>
        {state.map === null? null : 
          <MapContext.Provider value={state}>
          {props.children}
        </MapContext.Provider>}
      </Wrapper>
    </Wrapper>
  );
};

export default KakaoMap;
