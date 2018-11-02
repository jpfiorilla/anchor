import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import memoize from 'memoize-one';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false
    };
  }

  handleClick = e => {
    e.preventDefault();
    this.props.onPlayPause();
  };

  handleClickFullscreen = () => {
    this.setState(({ isFullscreen }) => ({
      isFullscreen: !isFullscreen
    }));
  };

  fullScreenOnChange = isFullscreen => {
    this.setState({ isFullscreen });
  };

  pauseOrPlayIfPropsChange = memoize((isCurrentIndex, paused) => {
    if (this.video)
      isCurrentIndex && this.video.paused && !paused
        ? this.video.play()
        : this.video.pause();
  });

  render() {
    const { isCurrentIndex, mediaObj, paused } = this.props;
    const { isFullscreen } = this.state;
    this.pauseOrPlayIfPropsChange(isCurrentIndex, paused);
    return (
      <React.Fragment>
        {!(isCurrentIndex && !paused) && (
          <div className="playPause" onClick={this.handleClick}>
            ►
          </div>
        )}
        <Fullscreen enabled={isFullscreen} onChange={this.fullScreenOnChange}>
          <video
            className={`video ${isFullscreen ? 'isFullscreen' : ''}`}
            ref={ele => {
              this.video = ele;
            }}
            onClick={this.handleClick}
            onEnded={this.props.onEnded}
          >
            <source src={mediaObj.mediaUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <img
            alt=""
            className="fullscreenToggle"
            onClick={this.handleClickFullscreen}
            src="/fullscreen.svg"
          />
        </Fullscreen>
        <img
          alt=""
          className="fullscreenToggle"
          onClick={this.handleClickFullscreen}
          src="/fullscreen.svg"
        />
      </React.Fragment>
    );
  }
}
