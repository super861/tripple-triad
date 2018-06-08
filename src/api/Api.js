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
        _body.debug = true
        // _body['playerDebug[0]'] = 4
        // _body['playerDebug[1]'] = 4
        // _body['playerDebug[2]'] = 4
        // _body['playerDebug[3]'] = 7
        // _body['playerDebug[4]'] = 7

      console.log('post', _body)
      return {
        method: _method,
        body: queryString.stringify(_body),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }
  }

}

export default Api;
