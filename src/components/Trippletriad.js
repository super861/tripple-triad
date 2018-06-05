import React, { Component } from 'react';
import Api from '../api/Api';
import { connect } from 'react-redux';
import { requestCards } from '../actions/index';

const mapStateToProps = state => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCards: () => dispatch(requestCards())
  }
}

class ConnectedTrippletriad extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.requestCards().then(() => {
      const {cards} = this.props
      const cardList = [];
      for (const key of Object.keys(cards)) {
        cardList.push(cards[key]);
      }

      this.setState({
        cards: cardList
      })
    });

  }

  renderCards() {
    const {cards} = this.state;
    return(
      <div>
        {cards.map(el => (
          <img
            src={Api.apiUrl() + el.url.neutral}
            alt="card"
          />
        ))}
      </div>
    );


  }


  render() {
    if(this.state.cards) {
      return(
        <div>
          {this.renderCards()}
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

const Trippletriad = connect(mapStateToProps, mapDispatchToProps)(ConnectedTrippletriad)

export default Trippletriad;
