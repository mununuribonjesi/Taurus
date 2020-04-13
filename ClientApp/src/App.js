import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventsContextProvider from './Contexts/EventsContext';

class App extends Component {
  render(){
    return(
      <React.Fragment>     
        <Navbar/>
        <Router>
          <Switch>
            <EventsContextProvider> 
            <Route exact path= "/" component={Home} />
            </EventsContextProvider>
          </Switch>
        </Router>
      </React.Fragment>
      
    );
  }
}

export default App;
