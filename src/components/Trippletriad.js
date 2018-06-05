import React, { Component } from 'react';
import Api from '../api/Api';
import { connect } from 'react-redux';
import { requestCards, requestStartGame } from '../actions/index';
import Cell from './Cell';

const mapStateToProps = state => {
  return {
    cards: state.cards,
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCards: () => dispatch(requestCards()),
    requestStartGame: () => dispatch(requestStartGame())
  }
}

class ConnectedTrippletriad extends Component {
  constructor() {
    super();

    this.state = {
      showCards: false,
      gameStart: false
    };
  }

  componentDidMount() {
    this.props.requestCards();

  }

  renderCards() {
    const {cards} = this.props
    const cardList = [];
    for (const key of Object.keys(cards)) {
      cardList.push(cards[key]);
    }

    return(
      <div className="cards">
          {cardList.map((el, index) => (
            <Cell bg={Api.apiUrl() + el.url.neutral} cellId={'card' + index} />
          ))}
      </div>
    );
  }

  // <img
  //   src={Api.apiUrl() + el.url.neutral}
  //   alt="card"
  // />

  renderGame() {
    const {cards} = this.props;
    const {board, deck, cpuCards} = this.props.game;
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-2 border" id="handuser">
            {deck.map((el, idx) => (
              <Cell bg={Api.apiUrl() + cards[el].url.blue} cellId={'deck' + idx} key={'deck' + idx} />
            ))}
          </div>
          <div className="col-md-6 offset-md-1 border" id="board">
            {board.map((row, idx) => (
              <div className="row">
                {board[idx].map(cell => (
                  <div className="col-md-4 border">
                    <Cell />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-md-2 offset-md-1 border" id="handcpu">
            {cpuCards.map((el, idx) => (
              <Cell bg={Api.apiUrl() + cards[el].url.red} cellId={'cpuCards' + idx} key={'cpuCards' + idx} />
            ))}
          </div>
        </div>
      </div>


    );
  }

  showCardsOnClickHandler(e) {
    this.setState({
      showCards: !this.state.showCards
    })
  }

  startGameOnclickHandler(e) {
    this.props.requestStartGame().then(() => {
      console.log('game started : ',  this.props.game)
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

const Trippletriad = connect(mapStateToProps, mapDispatchToProps)(ConnectedTrippletriad)

export default Trippletriad;
