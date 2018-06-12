import {BASE_URL} from '../constants/constants';
import queryString from 'query-string';

class Api {
  static call(url, options) {

    const init = Api.init(options);
    return fetch(BASE_URL + url, init)
      .then(response => response.json(), (error) => {
        return Promise.reject(error)
      })
      .then((json) => {
        if(json.debug) {
          console.log('DEBUG', json.debug)
        }if(json.status) {
          console.log('STATUS ++++++++', json.status, '++++++++')
        }if(json.error) {
          console.log('ERROR ++++++++', json.error, '++++++++')
        }
        if(options.isFetching)
          return Promise.resolve(json)
        else
          return Promise.reject('No request was sent!')
      })
  }

  static init(options) {
    const requestOptions = options || {}
    const setupOptions = requestOptions.setupOptions || {}
    const _method = requestOptions.method || 'GET'
    const _body = requestOptions.body || {}


    if(_method === 'GET') {
      return {
        method: _method
      }
    }
    else if(_method === 'POST') {
      if(requestOptions.code)
        _body.code = requestOptions.code
        _body.inverted = true
        if(setupOptions.debug === "debugOn")
          _body.debug = true
        if(setupOptions.combo === "comboOn")
          _body['rules[0]'] = 'combo'


        // _body['playerDebug[0]'] = 15
        // _body['playerDebug[1]'] = 15
        // _body['playerDebug[2]'] = 15
        // _body['playerDebug[3]'] = 15
        // _body['playerDebug[4]'] = 15
        // _body['cpuDebug[0]'] = 15
        // _body['cpuDebug[1]'] = 15
        // _body['cpuDebug[2]'] = 15
        // _body['cpuDebug[3]'] = 15
        // _body['cpuDebug[4]'] = 15

      return {
        method: _method,
        body: queryString.stringify(_body),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }
  }

}

export default Api;
