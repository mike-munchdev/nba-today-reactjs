import axios from 'axios';

class TeamService {
  static getTeams () {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/teams');
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default TeamService;
