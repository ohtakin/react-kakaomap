import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./KakaoMap";
import { Observable } from "rxjs";

const Polyline = props => {
  const { kakao, map } = useContext(MapContext);
  const [state, setState] = useState({
    polyline: null,
    kakao,
    map
  });

  const delayObservable = (path, delay) => {
    return new Observable(observer => {
      if (delay) {
        map.setDraggable(false);
        path.forEach((p, index) => {
          setTimeout(() => {
            observer.next(path.slice(0, index));
            if (index + 1 === path.length) observer.complete();
          }, delay * index);
        });
      } else {
        observer.next(path);
        observer.complete();
      }
    });
  };

  useEffect(() => {
    const { options } = props;
    const polyline = new kakao.maps.Polyline({ ...options });
    setState({ ...state, polyline });
    return () => {
      polyline.setMap(null);
    };
  }, []);

  useEffect(() => {
    const { options, delay, bounds } = props;
    const polyline = state.polyline;
    if (polyline === null) return;

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
    const subscription = delayObservable(path, delay).subscribe({
      next(p) {
        polyline.setPath(p);
        polyline.setMap(map);
      },
      error(err) {},
      complete() {
        map.setDraggable(true);
      }
    });

    setState({ ...state, polyline });
    return () => {
      subscription.unsubscribe();
    };
  }, [state.polyline, props.options.path]);

  return null;
};

export default Polyline;
