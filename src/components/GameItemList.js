import React, { Component } from 'react';
import GameItem from './GameItem';

class GameItemList extends Component {
  state = {};
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  render() {
    return (
      <ul className="list-group">
        {this.props.games
          ? this.props.games.map(g => <GameItem game={g} />)
          : ''}
      </ul>
    );
  }
}

export default GameItemList;
