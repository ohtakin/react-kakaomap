import React, { useContext, useState, useEffect, useCallback } from "react";
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

  const setMarkerImage = useCallback((marker, image) => {
    const { url, witdh, hight } = image;
    const markerImage = new kakao.maps.MarkerImage(
      url,
      new kakao.maps.Size(witdh, hight)
    );
    marker.setImage(markerImage);
  });

  useEffect(() => {
    const { position, image } = props;
    const { lat, lng } = position;
    const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });

    if (image) setMarkerImage(marker, image);
    (clusterer)? clusterer.addMarker(marker) : marker.setMap(map);
    
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
    setState({ ...state, marker: marker });
    return () => {
      marker.setMap(null);
      kakao.maps.event.removeListener(state.marker, "mouseover", onMouseOver);
      kakao.maps.event.removeListener(state.marker, "mouseout", onMouseOut);
    };
  }, []);

  if(state.marker === null) {
    return null;
  } else {
    return (
      <MapContext.Provider value={state}>
        {props.children}
      </MapContext.Provider>
    );
  }
};

export default Marker;
