import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './Components/App';


ReactDOM.render(
  <BrowserRouter>
    <Route component ={App} />
  </BrowserRouter>,
  document.getElementById('root')
);

