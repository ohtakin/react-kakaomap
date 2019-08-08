import React, { useState, useEffect } from "react";

const withKakaoMap = BaseComponent => {
  return props => {
    const [state, setState] = useState({
      kakaoLoaded: false,
      kakao: null
    });

    useEffect(() => {
      const kakao = window.kakao;
      kakao.maps.load(() => {
        setState({ kakaoLoaded: true, kakao });
      });
    }, []);

    if (state.kakaoLoaded) {
      return <BaseComponent {...props} kakao={state.kakao} />;
    } else {
      return <div />;
    }
  };
};

export default withKakaoMap;
