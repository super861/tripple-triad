import React, { Component } from 'react';
import Cell from './Cell';
import { BASE_URL } from '../constants/constants';
import { connect } from 'react-redux';
import { fetchGame } from '../actions/index';

class Board extends Component {
  constructor() {
    super()

    this.state = {
      cardSelected: null,
      card: null
    };

  }
  generateCell(cell, x, y) {
    const {cards} = this.props.cards
    switch(cell[0]) {
      case 1:
        return <Cell bg={BASE_URL + cards[cell[1]].url.blue} cellId={'x' + x + 'y' + y} />
      case 2:
        return <Cell bg={BASE_URL + cards[cell[1]].url.red} cellId={'x' + x + 'y' + y} />
      default:
        return <Cell onClick={this.cellOnClickHandler.bind(this)} cellId={'x' + x + 'y' + y}/>
    }
  }

  cellOnClickHandler(e) {
    const {cardSelected} = this.state;
    const {id} = e.target;
    let _x = id.slice(1, 2);
    let _y = id.slice(3, 4);
    console.log(cardSelected)
    if(cardSelected !== null) {
      this.props.fetchGame('do-player', {
        card: cardSelected,
        x: _x,
        y: _y
      }).then(() => {
        this.props.fetchGame('do-cpu').then(() => {
          this.props.fetchGame('whose-turn')
        })
        this.setState({
          cardSelected: null,
          card: null
        })
      })
    }
  }

  cardOnClickHandler(e) {
    const {cardSelected} = this.state;
    const {deck} = this.props.game;
    const id = Number(e.target.id);

    if(cardSelected !== id) {
      this.setState({
        cardSelected: id,
        card: deck[id]
      })
    }
    else {
      this.setState({
        cardSelected: null,
        card: null
      })
    }

  }

  render() {

    const {cards} = this.props.cards;
    const {board, deck, cpuCards, turn} = this.props.game;
    return(
      <div className="container">
        <div className="row justify-content-center">
          <h3>Turn: {turn}</h3>
        </div>
        <div className="row">
          <div className="col-md-2 border" id="handuser">
            {deck.map((el, idx) => (
              el > 0 ? <Cell bg={BASE_URL + cards[el].url.blue} cellId={'deck' + idx} key={'deck' + idx} onClick={this.cardOnClickHandler.bind(this)} cardId={idx} /> : <Cell key={'deck' + idx} />
            ))}
          </div>
          <div className="col-md-6 offset-md-1 border" id="board">
            {board.map((row, idx) => (
              <div className="row" key={'boardrow' + idx}>
                {board[idx].map((cell, index) => (
                  <div className="col-md-4 border" key={'row'+idx+'cell'+index}>
                    {this.generateCell(cell, idx, index)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-md-2 offset-md-1 border" id="handcpu">
            {cpuCards.map((el, idx) => (
              el > 0 ? <Cell bg={BASE_URL + cards[el].url.red} cellId={'cpuCards' + idx} key={'cpuCards' + idx} /> : <Cell key={'cpuCards' + idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    fetchGame: (action, body) => dispatch(fetchGame(action, body))
  }
}

export default connect(null, mapDispatchToProps)(Board)
