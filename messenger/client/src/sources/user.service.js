import backendApiService from './backend-api.service';

class UserService {

  _getFetchUserQuery() {
    return `
      {
        user {
          id,
          name
        }
      }
    `;
  }

  fetchUsers() {
    return backendApiService.request()
  }

}

export default new UserService();
