import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCards, fetchSetup } from '../actions/index';
import Cell from './Cell';
import { BASE_URL } from '../constants/constants';
import Board from './Board'

class Trippletriad extends Component {
  constructor() {
    super();

    this.state = {
      showCards: false,
      gameStart: false
    };
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  renderCards() {
    const {cards} = this.props.cards
    const cardList = [];
    for (const key of Object.keys(cards)) {
      cardList.push(cards[key]);
    }

    return(
      <div className="cards container">
          {cardList.map((el, index) => (
            <Cell bg={BASE_URL + el.url.neutral} cellId={'card' + index} key={'card' + index} />
          ))}
      </div>
    );
  }

  renderGame() {
    const {cards, game} = this.props;
    return <Board cards={cards} game={game.game} />
  }

  showCardsOnClickHandler(e) {
    this.setState({
      showCards: !this.state.showCards
    })
  }

  startGameOnclickHandler(e) {
    this.props.fetchSetup().then(() => {
      this.setState({
        gameStart: true
      })

    }).catch(() => {
      this.setState({
        gameStart: !this.state.gameStart
      })
    })
  }


  render() {
    if(this.props.cards) {
      return(
        <div>
          <button className="btn btn-primary m-5 showcards" onClick={this.showCardsOnClickHandler.bind(this)}>Show cards</button>
          {this.state.showCards && this.renderCards()}
          <button className="btn btn-success m-5 gamestart" onClick={this.startGameOnclickHandler.bind(this)} disabled={this.state.gameStart}>Start game</button>
          {this.state.gameStart && this.renderGame()}
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

const mapStateToProps = state => {
  const {cards, game} = state
  return {
    cards,
    game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCards: () => dispatch(fetchCards()),
    fetchSetup: () => dispatch(fetchSetup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trippletriad)
