import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore, combineReducers } from 'redux'
import data from './reducers/data'
import ids from './reducers/ids'

const reducers = combineReducers({data, ids})
 const store = createStore(reducers);

ReactDOM.render(
<React.StrictMode>
   <Provider store={store}>
      <App />
    </Provider>
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
