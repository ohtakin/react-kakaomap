import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./KakaoMap";
import { MarkerClustererContext } from "./MarkerClusterer";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

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
    const { onMouseOver, onMouseOut, options, delay } = props;
    const { lat, lng, image } = options;
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng)
    });
    if (image) setMarkerImage(marker, image);

    const delayedTime = interval(delay ? delay : 0);
    delayedTime.pipe(take(1)).subscribe(x => {
      clusterer ? clusterer.addMarker(marker) : marker.setMap(map);
    });

    const mouseOver = () => {
      if (onMouseOver) onMouseOver(marker);
    };
    const mouseOut = () => {
      if (onMouseOut) onMouseOut(marker);
    };
    kakao.maps.event.addListener(marker, "mouseover", mouseOver);
    kakao.maps.event.addListener(marker, "mouseout", mouseOut);

    setState({ ...state, marker });

    return () => {
      marker.setMap(null);
      kakao.maps.event.removeListener(marker, "mouseover", mouseOver);
      kakao.maps.event.removeListener(marker, "mouseout", mouseOut);
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
