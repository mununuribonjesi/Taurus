import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { News } from './components/News/News';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transport } from './components/Transport/Transport';

class App extends Component {
  render(){
    return(
      <React.Fragment>     
        <Navbar/>
        <Router>
          <Switch>
            <Route exact path= "/" component={Home} />
            <Route exact path= "/News" component={News} />
            <Route exact path= "/Transport" component={Transport}/>
          </Switch>
        </Router>
      </React.Fragment>
      
    );
  }
}

export default App;
