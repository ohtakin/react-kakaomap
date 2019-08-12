import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./KakaoMap";
import { MarkerClustererContext } from "./MarkerClusterer";

const Marker = props => {
  const { kakao, map } = useContext(MapContext);
  const { clusterer } = useContext(MarkerClustererContext);
  const [state, setState] = useState({
    marker: null,
    kakao,
    map,
    clusterer
  });

  const setMarkerImage = (marker, image) => {
    const { url, width, height } = image;
    const markerImage = new kakao.maps.MarkerImage(
      url,
      new kakao.maps.Size(width, height)
    );
    marker.setImage(markerImage);
  };

  useEffect(() => {
    const { onMouseOver, onMouseOut, options } = props;
    const { lat, lng, image } = options;
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng)
    });
    if (image) setMarkerImage(marker, image);
    clusterer ? clusterer.addMarker(marker) : marker.setMap(map);
    kakao.maps.event.addListener(marker, "mouseover", () => {
      if (onMouseOver) onMouseOver(marker);
    });
    kakao.maps.event.addListener(marker, "mouseout", () => {
      if (onMouseOut) onMouseOut(marker);
    });
    setState({ ...state, marker });
    return () => {
      marker.setMap(null);
      kakao.maps.event.removeListener(marker, "mouseover");
      kakao.maps.event.removeListener(marker, "mouseout");
    };
  }, []);

  useEffect(() => {
    const { lat, lng } = props.options;
    const { marker } = state;
    if (marker === null) return;
    const position = new kakao.maps.LatLng(lat, lng);
    marker.setPosition(position);
  }, [props.options.lat, props.options.lng]);

  useEffect(() => {
    const { image } = props.options;
    const { marker } = state;
    if (marker === null || image === null) return;
    if (image) setMarkerImage(marker, image);
  }, [props.options.image]);

  return null;
};

export default Marker;
