import React, { useState, useCallback } from "react";
import FullScreen from "../fullscreen/FullScreen";
import Wrapper from "../Wrapper";

export const MapContext = React.createContext({});

const KakaoMap = props => {
  const [state, setState] = useState({
    map: null,
    kakao: props.kakao
  });

  const addZoomControl = (map, kakao, zoom) => {
    if (zoom) {
      map.addControl(
        new kakao.maps.ZoomControl(),
        kakao.maps.ControlPosition[zoom]
      );
    }
  };

  const addMapTypeControl = (map, kakao, mapType) => {
    if (mapType) {
      map.addControl(
        new kakao.maps.MapTypeControl(),
        kakao.maps.ControlPosition[mapType]
      );
    }
  };

  const setLatLngBounds = (map, kakao, bounds) => {
    if (bounds) {
      const latLngBounds = new kakao.maps.LatLngBounds();
      bounds.forEach(b => {
        latLngBounds.extend(new kakao.maps.LatLng(b.lat, b.lng));
      });
      map.setBounds(latLngBounds);
    }
  };

  const handleLoaded = useCallback(node => {
    const { kakao, onZoomChang } = props;
    const { lat, lng, level, zoom, mapType, bounds } = props.options;
    if (state.map || node === null) {
      return;
    }

    const map = new kakao.maps.Map(node, {
      level: level || 9,
      center: new kakao.maps.LatLng(lat, lng)
    });

    addZoomControl(map, kakao, zoom);
    addMapTypeControl(map, kakao, mapType);
    setLatLngBounds(map, kakao, bounds);

    const zoomChange = () => {
      if (onZoomChang) onZoomChang(map);
    };
    kakao.maps.event.addListener(map, "zoom_changed", zoomChange);

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
