import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
// import './scss/main.scss';

let store = applyMiddleware(thunk)(createStore)(reducers);

ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app')
);
