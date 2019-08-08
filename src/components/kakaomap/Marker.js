import React, { useContext, useState, useEffect, useCallback } from "react";
import { MapContext } from "./KakaoMap";
const Marker = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    marker: null,
    kakao,
    map
  });

  const setMarker = useCallback(
    (lat, lng) =>
      new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) })
  );

  const setMarkerImage = useCallback((marker, image) => {
    const { url, witdh, hight } = image;
    const markerImage = new kakao.maps.MarkerImage(
      url,
      new kakao.maps.Size(witdh, hight)
    );
    marker.setImage(markerImage);
  });

  useEffect(() => {
    const { position, image, clusterer } = props;
    const { lat, lng } = position;
    const marker = setMarker(lat, lng);

    if (image) setMarkerImage(marker, image);
    if (clusterer) {
      clusterer.addMarker(marker);
    } else {
      marker.setMap(map);
    }

    setState({ ...state, marker: marker });
    return () => {
      marker.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    const { marker } = state;
    if (marker === null) return;
    const onMouseOver = () => {
      const { onMouseOver } = props;
      if (onMouseOver) props.onMouseOver();
    };
    const onMouseOut = () => {
      const { onMouseOut } = props;
      if (onMouseOut) onMouseOut();
    };
    kakao.maps.event.addListener(marker, "mouseover", onMouseOver);
    kakao.maps.event.addListener(marker, "mouseout", onMouseOut);
    return () => {
      kakao.maps.event.removeListener(state.marker, "mouseover", onMouseOver);
      kakao.maps.event.removeListener(state.marker, "mouseout", onMouseOut);
    };
  }, [state.marker]);

  return (
    <MapContext.Provider value={state}>{props.children}</MapContext.Provider>
  );
};

export default Marker;
