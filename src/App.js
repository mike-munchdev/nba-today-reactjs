import React, { Component } from 'react';
import GameList from './components/GameList';
import GameService from './services/GameService';
class App extends Component {
  state = {
    isLoading: false,
    upcomingGames: [],
    liveGames: [],
    finishedGames: []
  };
  getGames = async (date) => {
    try {
      const dateParam = date || new Date();
      this.setState({ isLoading: true });
      const games = await GameService.getGames(dateParam);

      this.setState({
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
  };
  componentWillMount() {
    this.getGames(new Date());
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
            <button
              className="btn btn-outline-primary btn-block mt-2"
              onClick={e => this.getGames()}
            >
              Refresh
            </button>
            <GameList title="Live" games={this.state.liveGames} />
            <GameList title="Upcoming" games={this.state.upcomingGames} />            
            <GameList title="Finished" games={this.state.finishedGames} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
