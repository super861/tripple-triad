
import React from 'react'; // import React and React Component
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
// App component
import App from './App';

/**
*  The React element 'TrippleTriad' is rendered inside the DOM-element with id 'root'.
*/
render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);
