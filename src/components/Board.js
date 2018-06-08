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
  generateCell(cell, y, x) {
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
    const {turn} = this.props.game;
    console.log(turn)
    let _x = id.slice(1, 2);
    let _y = id.slice(3, 4);
    if(cardSelected !== null && turn === 'player') {
      this.props.fetchGame('do-player', {
        card: cardSelected,
        x: _x,
        y: _y
      }).then(() => {
        this.setState({
          cardSelected: null,
          card: null
        })
      })
    }
  }

  cardOnClickHandler(e) {
    const {cardSelected} = this.state;
    const {hand, turn} = this.props.game;
    const id = Number(e.target.id);

    if(turn === 'player') {
      if(cardSelected !== id) {
        this.setState({
          cardSelected: id,
          card: hand[id]
        })
      }
      else {
        this.setState({
          cardSelected: null,
          card: null
        })
      }
    }
    else {
      console.log('it is not your turn!');
    }
  }

  doCpuOnClickHandler() {
    this.props.fetchGame('do-cpu').then(() => {
    })
  }

  render() {

    const {cards} = this.props.cards;
    const {board, hand, cpuCards, turn, status, back} = this.props.game;

    return(
      <div className="container">
        <div className="row justify-content-center">
          <h3>Turn: {turn}</h3>
          {turn === 'cpu' && <button onClick={this.doCpuOnClickHandler.bind(this)}>do cpu turn</button>}
        </div>

        <div className="row justify-content-center">
          <h3>Status: {status}</h3>
        </div>

        <div className="row">
          <div className="col-md-2" id="handuser">
            {hand.map((el, idx) => (
              el > 0 ? <Cell bg={BASE_URL + cards[el].url.blue} cellId={'hand' + idx} key={'hand' + idx} onClick={this.cardOnClickHandler.bind(this)} cardId={idx} /> : <Cell key={'hand' + idx} />
            ))}
          </div>

          <div className="col-md-6 offset-md-1" id="board">
            {board.map((row, y) => (
              <div className="row" key={'boardrow' + y}>
                {board[y].map((cell, x) => (
                  <div className="col-md-4 border" key={'row'+y+'cell'+x}>
                    {this.generateCell(cell, y, x)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="col-md-2 offset-md-1" id="handcpu">
            {cpuCards.map((el, idx) => (
              el > 0 ? <Cell bg={BASE_URL + back} cellId={'cpuCards' + idx} key={'cpuCards' + idx} /> : <Cell key={'cpuCards' + idx} />
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
