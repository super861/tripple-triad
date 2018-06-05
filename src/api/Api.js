class Api {
  static getAllCards() {
    return fetch(Api.apiUrl() + '/game/cards')
      .then(response => {
        return response.json();
      }).catch(error => {
        console.log(error);
      })

  }

  static apiUrl() {
    return "http://webtest.multiverseworks.com/triple-triad/"
  }
}

export default Api;
