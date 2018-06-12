import React, { Component } from 'react';
import {BASE_URL} from '../constants/constants';
import Cell from './Cell';
import { connect } from 'react-redux';
import { fetchGame } from '../actions/index';
import Sound from 'react-sound';

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardSelected: null,
      card: null
    };

  }

  generateCell(cell, y, x) {
    const {cards} = this.props;
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




  render() {
    const {cards} = this.props;
    const {board, hand, cpuCards, back} = this.props.game;

    return(
      <div className="main">
        {this.props.music === "musicOn" &&
          <Sound
          url="ShuffleOrBoogie.ogg"
          playStatus={Sound.status.PLAYING}
          loop={true}
        />}
        <div className="container">
          <div className="row">
            <div id="hand-user">
              {hand.map((el, idx) => (
                el > 0 ? <Cell bg={BASE_URL + cards[el].url.blue} cellId={'hand' + idx} key={'hand' + idx} onClick={this.cardOnClickHandler.bind(this)} cardId={idx} selected={this.state.cardSelected === idx} /> : <Cell key={'hand' + idx} />
              ))}
            </div>

            <div id="board">
              <div className="container">
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
            </div>

            <div id="hand-cpu">
              {cpuCards.map((el, idx) => (
                el > 0 ? <Cell bg={BASE_URL + back} cellId={'cpuCards' + idx} key={'cpuCards' + idx} /> : <Cell key={'cpuCards' + idx} />
              ))}
            </div>
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
