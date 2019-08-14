import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./KakaoMap";

const CustomOverlay = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    overlay: null,
    kakao,
    map
  });

  useEffect(() => {
    const { lat, lng } = props.options;
    if (state.overlay !== null) return;
    const content = document.createElement("div");
    content.className = props.className;
    content.innerHTML = props.options.content;
    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content: content
    });
    overlay.setMap(map);
    setState({ ...state, overlay });
    return () => {
      overlay.setMap(null);
    };
  }, []);

  useEffect(() => {
    const { lat, lng } = props.options;
    const { overlay } = state;
    if (overlay === null) return;
    overlay.setPosition(new kakao.maps.LatLng(lat, lng));
  }, [props.options]);

  return null;
};

export default CustomOverlay;
