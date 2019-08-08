import React, { Component } from "react";
import styles from "./FullScreen.module.scss";
import PropTypes from "prop-types";

class FullScreen extends Component {
  state = {
    screenState: false
  };

  handleFullscreenChange = () => {
    this.setState({
      screenState: document.fullscreen
    });
  };

  onClick = e => {
    e.preventDefault();
    const canvas = document.getElementById(this.props.canvas);
    if (!document.fullscreenElement) {
      if (canvas) {
        canvas.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  bindHandler = canvas => {
    if (canvas)
      canvas.onfullscreenchange = this.handleFullscreenChange.bind(canvas);
  };

  componentDidMount() {
    this.bindHandler(document.getElementById(this.props.canvas));
  }

  render() {
    return document.fullscreenEnabled ? (
      <button
        className={`${styles.full_screen} ${
          document.fullscreen ? styles.full : ""
        }`}
        onClick={this.onClick}
      />
    ) : (
      ""
    );
  }
}

FullScreen.propTypes = {
  canvas: PropTypes.string
};

export default FullScreen;
