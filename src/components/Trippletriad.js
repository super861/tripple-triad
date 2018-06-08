import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCards, fetchGame } from '../actions/index';
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
      <div className="cards ml-5 ">
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
    this.props.fetchGame('setup').then(() => {
      this.props.fetchGame('toss-coin').then(() => {
          this.setState({
            gameStart: true
          })

      })
    }).catch(() => {
      this.setState({
        gameStart: !this.state.gameStart
      })
    })
  }

  resetGameOnClickHandler(e) {
    this.setState({
      gameStart: false
    })

    this.props.fetchGame('setup').then(() => {
      this.props.fetchGame('toss-coin').then(() => {
        this.setState({
          gameStart: true
        })
      })
    })
  }

  render() {
    if(this.props.cards) {
      return(
        <div className="main">
          <button className="btn btn-primary m-5 showcards" onClick={this.showCardsOnClickHandler.bind(this)}>Show cards</button>
          {this.state.showCards && this.renderCards()}
          <button className="btn btn-success m-5 gamestart" onClick={this.startGameOnclickHandler.bind(this)} disabled={this.state.gameStart}>Start game</button>
          <button className="btn btn-danger m-5 gamereset" onClick={this.resetGameOnClickHandler.bind(this)} disabled={!this.state.gameStart}>Reset game</button>
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
    fetchGame: (action, body) => dispatch(fetchGame(action, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trippletriad)
