class Api {
  static getAllCards() {
    return fetch('http://webtest.multiverseworks.com/triple-triad/game/cards')
      .then(response => {
        return response.json();
      }).then(data => {
        return data;
      })

  }
}

export default Api;
