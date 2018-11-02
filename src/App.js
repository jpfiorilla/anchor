import React, { Component } from 'react';
import Header from './Header';
import Media from './Media';
import Footer from './Footer';
import './App.scss';

const apiUrl =
  'https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mediaList: [], currentlyPlaying: 0, paused: true };
  }

  componentDidMount() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({ mediaList: res.tracks });
      });
  }

  handlePlayPause = index => {
    this.setState(({ currentlyPlaying, paused }) => {
      if (index && currentlyPlaying !== index)
        return {
          currentlyPlaying: index,
          paused: false
        };
      else
        return {
          paused: !paused
        };
    });
  };

  handlePlayPrevious = () => {
    const { currentlyPlaying, mediaList } = this.state;
    this.handlePlayPause(
      currentlyPlaying === 0 ? mediaList.length - 1 : currentlyPlaying - 1
    );
  };

  handlePlayNext = () => {
    const { currentlyPlaying, mediaList } = this.state;
    this.handlePlayPause(
      currentlyPlaying === mediaList.length - 1 ? 0 : currentlyPlaying + 1
    );
  };

  handleEnded = () => {
    this.setState(({ currentlyPlaying }) => ({
      currentlyPlaying: currentlyPlaying + 1
    }));
  };

  render() {
    const { mediaList, currentlyPlaying, paused } = this.state;
    return (
      <div id="App">
        <Header />
        <div className="mediaOuter">
          {mediaList.map((mediaObj, i) => (
            <Media
              key={mediaObj.mediaUrl}
              isCurrentIndex={currentlyPlaying === i}
              index={i}
              mediaObj={mediaObj}
              onEnded={this.handleEnded}
              onPlayPause={this.handlePlayPause}
              paused={paused}
            />
          ))}
        </div>
        <Footer
          currentlyPlaying={currentlyPlaying}
          currentMediaObj={mediaList[currentlyPlaying]}
          onPlayNext={this.handlePlayNext}
          onPlayPause={this.handlePlayPause}
          onPlayPrevious={this.handlePlayPrevious}
          paused={paused}
        />
      </div>
    );
  }
}
