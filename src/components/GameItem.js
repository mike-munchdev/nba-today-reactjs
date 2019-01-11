import React, { Component } from 'react';

class GameItem extends Component {
  state = {};

  getPeriodWithOrdinal = period => {
    switch (period) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 4:
        return '4th';
      default:
        return 'OT';
    }
  };

  getTeamLogoUrl = triCode => {
    return `assets/${triCode}.png`;
  };

  getGameStart = game => {
    if (game.period.isHalftime === true) {
      return <div className="game-time text-right font-weight-bold">Half</div>;
    } else if (game.period.current === 0) {
      const startTime = new Date(game.startTimeUTC);
      return (
        <div className="game-time text-right text-muted">
          {startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </div>
      );
    } else {
      switch (game.statusNum) {
        case 2:
          return (
            <div className="game-time text-right">
              {game.period.isEndOfPeriod ? 'End of ' : game.clock}{' '}
              {this.getPeriodWithOrdinal(game.period.current)}
            </div>
          );
        case 3:
          return (
            <div className="game-time text-right text-muted font-weight-bold">
              Final
            </div>
          );
        default:
          return <div className="game-time text-right text-muted" />;
      }
    }
  };

  getScore = (game, team) => {
    if (game.period.current === 0) {
      return <span className="team-record">{`${team.win} - ${team.loss}`}</span>;
    } else {
      return <span className="team-score">{`${team.score}`}</span>;
    }
  };

  getTeamLine = (game, team) => {
    return (
      <div className="row team-row">
        <div className="col-2">
          <img
            src={this.getTeamLogoUrl(team.triCode)}
            alt={`${team.fullName} logo`}
            width="30"
            height="30"
            className="float-right"
          />
        </div>
        <div className="col-7">
          <span className="team-name text-center h-100">{team.fullName}</span>
        </div>
        <div className="col-3 text-right">{this.getScore(game, team)}</div>
      </div>
    );
  };

  render() {
    return (
      <li className="list-group-item game">
        {this.getGameStart(this.props.game)}
        {this.getTeamLine(this.props.game, this.props.game.vTeam)}
        {this.getTeamLine(this.props.game, this.props.game.hTeam)}        
      </li>
    );
  }
}

export default GameItem;
