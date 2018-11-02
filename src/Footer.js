import React, { Component } from 'react';
import memoize from 'memoize-one';

export default class Footer extends Component {
  static defaultProps = {
    currentMediaObj: {}
  };

  computeAlbumArtStyle = memoize(currentMediaObj => ({
    background: `url(${currentMediaObj.imageUrl})`
  }));

  handlePlayPause = () => {
    this.props.onPlayPause(this.props.currentlyPlaying);
  };

  render() {
    const { currentMediaObj, paused } = this.props;
    const albumArtStyle = this.computeAlbumArtStyle(currentMediaObj);
    return (
      <div id="Footer">
        <div className="trackInfo">
          <div className="albumArt" style={albumArtStyle} />
          <div className="trackTitle">{currentMediaObj.title}</div>
        </div>
        <div className="controls">
          <div className="previous" onClick={this.props.onPlayPrevious}>
            |◄
          </div>
          <div className="playPause" onClick={this.handlePlayPause}>
            {paused ? '►' : '||'}
          </div>
          <div className="next" onClick={this.props.onPlayNext}>
            ►|
          </div>
        </div>
      </div>
    );
  }
}
