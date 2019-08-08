import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./KakaoMap";

export const MarkerClustererContext = React.createContext({});

const MarkerClusterer = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    clusterer: null
  });
  
  const { options } = props;
  useEffect(() => {
    const clusterer = new kakao.maps.MarkerClusterer(options);
    clusterer.setMap(map);
    kakao.maps.event.addListener(clusterer, "clustered", () => {});
    setState({ clusterer: clusterer })
    return () => {
      clusterer.setMap(null);
    }
  }, []);

  if(state.clusterer === null) {
    return null;
  } else {
    return (
      <MarkerClustererContext.Provider value={state}>
        {props.children}
      </MarkerClustererContext.Provider>
    );
  }
};

export default MarkerClusterer;