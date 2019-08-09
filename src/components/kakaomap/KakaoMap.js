import React, { useState, useCallback } from "react";
import FullScreen from "../fullscreen/FullScreen";
import Wrapper from "../Wrapper";

export const MapContext = React.createContext({});

const KakaoMap = props => {
  const [state, setState] = useState({
    map: null,
    kakao: props.kakao
  });

  const handleLoaded = useCallback(node => {
    const { kakao } = props;
    const { lat, lng, level, zoom } = props.options;
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
  }, []);

  return (
    <Wrapper id="map-canvas">
      <FullScreen id="full-screen" canvas="map-canvas" />
      <Wrapper id="kakao-map" ref={handleLoaded}>
        {state.map === null ? null : (
          <MapContext.Provider value={state}>
            {props.children}
          </MapContext.Provider>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default KakaoMap;
