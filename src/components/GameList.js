import React, { Component } from 'react';

import GameItemList from './GameItemList';

class GameList extends Component {
  state = {};
  render() {
    return this.props.games.length > 0 ? (
      <div className="game-listing">
        <div className="row">
          <div className="col-12 mx-auto">
            <h2 className="list-title">{this.props.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            {this.props.games ? <GameItemList games={this.props.games} /> : ''}
          </div>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default GameList;
