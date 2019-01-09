import React, { Component } from 'react';
import GameList from './components/GameList';
import TeamService from './services/TeamService';
import GameService from './services/GameService';
class App extends Component {
  state = {
    isLoading: false,
    upcomingGames: [],
    liveGames: [],
    finishedGames: [],
    teams: []
  };

  async componentWillMount() {
    try {
      this.setState({ isLoading: true });
      const teams = await TeamService.getTeams();
      let games = await GameService.getGames();

      // add full name to home and visting teams
      games = games.map(g => {
        const hTeam = teams.find(t => g.hTeam.teamId === t.teamId);
        const vTeam = teams.find(t => g.vTeam.teamId === t.teamId);

        g.vTeam.fullName = vTeam.fullName;
        g.hTeam.fullName = hTeam.fullName;
        return g;
      });

      this.setState({
        teams: teams.data,
        upcomingGames: games.filter(g => g.statusNum === 1),
        liveGames: games.filter(g => g.statusNum === 2),
        finishedGames: games.filter(g => g.statusNum === 3),
        isLoading: false
      });
    } catch (e) {
      this.setState({ isLoading: false });
      alert('error occured');
      console.log(e);
    }
  }

  render() {
    return this.state.isLoading === true ? (
      <div className="container">
        <div className="col-12 mx-auto text-center loading-icon-small">
          <i className="fa fa-spinner fa-3x fa-spin" />
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <GameList title="Upcoming" games={this.state.upcomingGames} />
            <GameList title="Live" games={this.state.liveGames} />
            <GameList title="Finished" games={this.state.finishedGames} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
