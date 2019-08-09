import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./KakaoMap";

const Polyline = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    polyline: null,
    kakao,
    map
  });

  useEffect(() => {
    const path = props.options.path.map(p => {
      const { lat, lng } = p;
      return new kakao.maps.LatLng(lat, lng);
    });
    const polyline = new kakao.maps.Polyline({ ...props.options, path });
    polyline.setMap(map);
    setState({ ...state, polyline });
    return () => {
      polyline.setMap(null);
    };
  }, [props.options]);

  return null;
};

export default Polyline;
