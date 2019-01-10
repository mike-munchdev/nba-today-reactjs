import React, { Component } from 'react';
import GameItem from './GameItem';

class GameItemList extends Component {
  state = {};
  
  render() {
    return (
      <ul className="list-group">
        {this.props.games
          ? this.props.games.map(g => <GameItem game={g} key={g.gameId} />)
          : ''}
      </ul>
    );
  }
}

export default GameItemList;
