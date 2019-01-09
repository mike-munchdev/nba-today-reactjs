import axios from 'axios';

class GameService {
  static getGames () {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/games');
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default GameService;
