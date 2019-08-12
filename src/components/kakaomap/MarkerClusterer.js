import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./KakaoMap";

export const MarkerClustererContext = React.createContext({});

const MarkerClusterer = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    clusterer: null
  });

  useEffect(() => {
    const { options } = props;
    const clusterer = new kakao.maps.MarkerClusterer(options);
    clusterer.setMap(map);
    kakao.maps.event.addListener(clusterer, "clustered", () => {});
    setState({ clusterer });
    return () => {
      clusterer.setMap(null);
    };
  }, []);

  useEffect(() => {
    const {
      gridSize,
      averageCenter,
      minLevel,
      disableClickZoom
    } = props.options;
    const { clusterer } = state;
    if (clusterer === null) return;
    if (gridSize) clusterer.setGridSize(gridSize);
    if (averageCenter) clusterer.setAverageCenter(averageCenter);
    if (minLevel) clusterer.setMinLevel(minLevel);
    if (disableClickZoom) clusterer.setDisableClickZoom(disableClickZoom);
  }, [props.options]);

  if (state.clusterer === null) {
    return null;
  } else {
    return (
      <MarkerClustererContext.Provider value={state}>
        {state.clusterer === null ? null : props.children}
      </MarkerClustererContext.Provider>
    );
  }
};

export default MarkerClusterer;
