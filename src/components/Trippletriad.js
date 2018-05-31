import React, { Component } from 'react';
import Api from '../api/Api';

class Trippletriad extends Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  componentDidMount() {
    let hmm = null;
    Api.getAllCards().then(data => {
      this.setState({
        cards: data.cards
      })
    })
  }


  render() {
    if(this.state.cards) {
      const {cards} = this.state
      console.log(cards)
      for (const key of Object.keys(cards)) {
        console.log(key, cards[key].url);
      }

      return(
        <div>

        </div>

      )
    }
    else {
      return(
        <h2>Waiting for api</h2>
      )
    }
  }

}

export default Trippletriad;
