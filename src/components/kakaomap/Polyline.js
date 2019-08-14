import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./KakaoMap";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

const Polyline = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    polyline: null,
    kakao,
    map
  });

  useEffect(() => {
    const { options, delay, bounds } = props;
    const path = options.path.map(p => {
      const { lat, lng } = p;
      return new kakao.maps.LatLng(lat, lng);
    });

    if (bounds === true) {
      const latLngBounds = new kakao.maps.LatLngBounds();
      Object.values(path).forEach(b => {
        latLngBounds.extend(b);
      });
      map.setBounds(latLngBounds);
    } else if (bounds === false) {
      map.setCenter(Object.values(path)[0]);
    }

    const polyline = new kakao.maps.Polyline({ ...options });
    if (delay) {
      path.forEach((p, index) => {
        const delayedTime = interval(delay * index);
        delayedTime.pipe(take(1)).subscribe(x => {
          polyline.setPath(path.slice(0, index));
          polyline.setMap(map);
        });
      });
    } else {
      polyline.setPath(path);
      polyline.setMap(map);
    }

    setState({ ...state, polyline });
    return () => {
      polyline.setMap(null);
    };
  }, []);

  return null;
};

export default Polyline;
