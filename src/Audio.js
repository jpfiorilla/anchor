import React, { Component } from 'react';
import memoize from 'memoize-one';

export default class Audio extends Component {
  computeOuterDivStyle = memoize(mediaObj => ({
    background: `url(${mediaObj.imageUrl})`
  }));

  pauseOrPlayIfPropsChange = memoize((isCurrentIndex, paused) => {
    if (this.audio)
      isCurrentIndex && this.audio.paused && !paused
        ? this.audio.play()
        : this.audio.pause();
  });

  render() {
    const { isCurrentIndex, mediaObj, paused } = this.props;
    this.pauseOrPlayIfPropsChange(isCurrentIndex, paused);
    const outerDivStyle = this.computeOuterDivStyle(mediaObj);
    return (
      <div
        className="audio"
        onClick={this.props.onPlayPause}
        style={outerDivStyle}
      >
        <div className="playPause">
          {isCurrentIndex && !paused ? '||' : '►'}
        </div>
        <audio
          src={mediaObj.mediaUrl}
          ref={ele => {
            this.audio = ele;
          }}
          onEnded={this.props.onEnded}
        />
      </div>
    );
  }
}
