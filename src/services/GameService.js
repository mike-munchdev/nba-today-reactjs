import axios from 'axios';

class GameService {
  static getGames (date) {
    return new Promise(async (resolve, reject) => {
      try {
        // https://stackoverflow.com/a/3067896
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const gameDate = [
          date.getFullYear(),
          (month > 9 ? '' : '0') + month,
          (day > 9 ? '' : '0') + day
        ].join('');
        const response = await axios.get(`https://md-nba-today.herokuapp.com/api/v1/games/${gameDate}`);
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default GameService;
