import React, { useState, useEffect } from "react";
import scriptjs from "scriptjs";

const withJs = url => BaseComponent => {
  return props => {
    const [state, setState] = useState({
      jsLoaded: false
    });

    const handleLoaded = () => {
      setState({ jsLoaded: true });
    };

    useEffect(() => {
      scriptjs(url, handleLoaded);
    }, []);

    if (state.jsLoaded) {
      return <BaseComponent {...props} />;
    } else {
      return <div />;
    }
  };
};

export default withJs;
