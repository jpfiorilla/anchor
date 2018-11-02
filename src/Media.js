import React, { Component } from 'react';
import Audio from './Audio';
import Video from './Video';

const isVideo = (mediaUrl = '') =>
  mediaUrl.substring(mediaUrl.length - 4) === '.m4v';

export default class Media extends Component {
  constructor(props) {
    super(props);
    this.mediaType = isVideo(props.mediaObj.mediaUrl) ? 'video' : 'audio';
  }

  handlePlayPause = () => {
    this.props.onPlayPause(this.props.index);
  };

  render() {
    const { mediaObj, isCurrentIndex, paused } = this.props;
    return (
      <div className="media">
        {this.mediaType === 'video' ? (
          <Video
            isCurrentIndex={isCurrentIndex}
            mediaObj={mediaObj}
            onEnded={this.props.onEnded}
            onPlayPause={this.handlePlayPause}
            paused={paused}
          />
        ) : (
          <Audio
            isCurrentIndex={isCurrentIndex}
            mediaObj={mediaObj}
            onEnded={this.props.onEnded}
            onPlayPause={this.handlePlayPause}
            paused={paused}
          />
        )}
      </div>
    );
  }
}
