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
  }, []);

  return (
    <div className={props.className} ref={wrapperHTML}>
      {props.options.content}
    </div>
  );
};

export default CustomOverlay;
