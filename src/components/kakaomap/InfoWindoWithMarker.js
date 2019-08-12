import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./KakaoMap";
import Marker from "./Marker";

const InfoWindoWithMarker = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    infoWindow: null,
    kakao,
    map
  });

  const onMouseOver = marker => {
    const { infoWindow } = state;
    infoWindow.open(map, marker);
  };

  const onMouseOut = marker => {
    const { infoWindow } = state;
    infoWindow.close(map);
  };

  useEffect(() => {
    const { lat, lng } = props.options;
    const infoWindow = new kakao.maps.InfoWindow({
      position: new kakao.maps.LatLng(lat, lng),
      content: props.options.content
    });
    setState({ ...state, infoWindow });
    return () => {
      infoWindow.setMap(null);
    };
  }, []);

  return state.infoWindow === null ? null : (
    <Marker
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      options={props.options}
    />
  );
};

export default InfoWindoWithMarker;
