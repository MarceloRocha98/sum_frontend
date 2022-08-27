import React, { Component } from 'react';

import './App.css';

import { HashRouter } from 'react-router-dom'

import Routes from './Routes'
// import { Router } from 'react-router-dom';


export default class App extends Component {
  

  
  render() {

    return (
      <div className='app'>
        
        <HashRouter>
          <Routes />
        </HashRouter>
     </div>
      )
  }
}