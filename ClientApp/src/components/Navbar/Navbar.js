import React from 'react';
import {BrowserRouter as Router} from 
'react-router-dom';
import './Navbar.css';

function Navbar(){
    return(
      <Router> 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Taurus</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/">Events <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
</Router>
);
}

export default Navbar;

