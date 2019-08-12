import React, { createRef, useState, useContext, useEffect } from "react";
import { MapContext } from "./KakaoMap";

const CustomOverlay = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    overlay: null,
    kakao,
    map
  });

  const wrapperHTML = createRef();
  useEffect(() => {
    const { lat, lng } = props.options;
    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content: wrapperHTML.current
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

  return (
    <div className={props.className} ref={wrapperHTML}>
      {props.options.content}
    </div>
  );
};

export default CustomOverlay;
