import React, { Component } from 'react'
import {BASE_URL} from '../constants/constants';
import Cell from './Cell';
import { setOptions } from '../actions/setup';
import { connect } from 'react-redux';

class ModalContent extends Component {
  constructor() {
    super()

    this.state = {
      combo: "comboOn",
      music: "musicOn",
      debug: "debugOn"
    }
  }

  renderHelp() {
    const {cards} = this.props
    const cardList = [];
    for (const key of Object.keys(cards)) {
      cardList.push(cards[key]);
    }

    return(
      <div>
        <p><strong>Card overview</strong></p>
        <div className="cards">
            {cardList.map((el, index) => (
              <Cell bg={BASE_URL + el.url.neutral} cellId={'card' + index} key={'card' + index} cellStyle={{zIndex: cardList.length - index}} />
            ))}
        </div>
        <p><strong>What is Tripple Triad?</strong></p>
        <p>Tripple Triad is a funny strategic card game.</p>
        <p><strong>How to play?</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    )
  }

  comboOnChangeHandler(e) {
    this.setState({
      combo: e.target.value
    })
  }

  musicOnChangeHandler(e) {
    this.setState({
      music: e.target.value
    })
  }

  debugOnChangeHandler(e) {
    this.setState({
      debug: e.target.value
    })
  }

  renderSetup() {
    return(
      <div>
        <fieldset className="form-group">
          <label className="form-check form-check-inline">
            <legend>Combo mode</legend>
          </label>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="combo" id="comboOn" value="comboOn" onChange={this.comboOnChangeHandler.bind(this)} checked={this.state.combo === "comboOn"} />
              On
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="combo" id="comboOff" value="comboOff" onChange={this.comboOnChangeHandler.bind(this)} checked={this.state.combo === "comboOff"}  />
              Off
            </label>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <label className="form-check form-check-inline">
            <legend>Music</legend>
          </label>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="music" id="musicOn" value="musicOn" onChange={this.musicOnChangeHandler.bind(this)} checked={this.state.music === "musicOn"} />
              On
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="music" id="musicOff" value="musicOff" onChange={this.musicOnChangeHandler.bind(this)} checked={this.state.music === "musicOff"}  />
              Off
            </label>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <label className="form-check form-check-inline">
            <legend>Debugg mode</legend>
          </label>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="debug" id="debugOn" value="debugOn" onChange={this.debugOnChangeHandler.bind(this)} checked={this.state.debug === "debugOn"} />
              On
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="debug" id="debugOff" value="debugOff" onChange={this.debugOnChangeHandler.bind(this)} checked={this.state.debug === "debugOff"}  />
              Off
            </label>
          </div>
        </fieldset>
      </div>
    )
  }

  renderDefault() {
    return (
      <h1> default body </h1>
    )
  }

  button2OnClickHandler() {
    this.props.setOptions(this.state)
    this.props.button2.click()
  }

  render() {
    const {id} = this.props
    return(
      <div id={this.props.id} className="modal-dialog">
         <div className="modal-content">
           {/* MODAL HEADER*/}
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
             {this.props.close &&<button type="button" className="close" onClick={this.props.close}>
               <span aria-hidden="true">&times;</span>
             </button>}
           </div>
           {/* MODAL BODY*/}
           <div className="modal-body">
           {id === "help" ? this.renderHelp() : id==="setup" ? this.renderSetup() :this.renderDefault()}
           </div>
           {/* MODAL FOOTER*/}
           <div className="modal-footer">
             {this.props.button1 && <button type="button" className="btn btn-secondary" onClick={this.props.button1.click}>{this.props.button1.value}</button>}
             {this.props.button2 && <button type="button" className="btn btn-success"onClick={this.button2OnClickHandler.bind(this)} style={this.props.button2.style}>{this.props.button2.value}</button>}
           </div>
         </div>
       </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
  setOptions: (options) => dispatch(setOptions(options))
  }
}

export default connect(null, mapDispatchToProps)(ModalContent);
