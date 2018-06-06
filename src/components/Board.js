import React, { Component } from 'react';
import Cell from './Cell';
import { BASE_URL } from '../constants/constants';

class Board extends Component {

  render() {

    const {cards} = this.props.cards;
    const {board, deck, cpuCards} = this.props.game;

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-2 border" id="handuser">
            {deck.map((el, idx) => (
              <Cell bg={BASE_URL + cards[el].url.blue} cellId={'deck' + idx} key={'deck' + idx} />
            ))}
          </div>
          <div className="col-md-6 offset-md-1 border" id="board">
            {board.map((row, idx) => (
              <div className="row" key={'boardrow' + idx}>
                {board[idx].map((cell, index) => (
                  <div className="col-md-4 border" key={'row'+idx+'cell'+index}>
                    <Cell />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-md-2 offset-md-1 border" id="handcpu">
            {cpuCards.map((el, idx) => (
              <Cell bg={BASE_URL + cards[el].url.red} cellId={'cpuCards' + idx} key={'cpuCards' + idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Board;
