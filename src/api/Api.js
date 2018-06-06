import {BASE_URL} from '../constants/constants';
import queryString from 'query-string';

class Api {
  static call(url, options) {


    console.log(BASE_URL + url)
    const init = Api.init(options);
    return fetch(BASE_URL + url, init)
      .then(response => response.json(), (error) => {
        return Promise.reject(error)
      })
      .then((json) => {
        if(options.isFetching)
          return Promise.resolve(json)
        else
          return Promise.reject('No request was sent!')
      })
  }

  static init(options) {
    console.log('options', options)
    const requestOptions = options || {}
    const _method = requestOptions.method || 'GET'
    const _body = requestOptions.body || null
    console.log('method', _method)

    if(_method === 'GET') {
      return {
        method: _method
      }
    }
    else if(_method === 'POST') {
      _body.code = requestOptions.code;
      console.log('post')
      return {
        method: _method,
        body: queryString.stringify(_body),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }
  }

}

export default Api;
