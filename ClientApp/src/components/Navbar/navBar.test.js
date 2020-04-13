import NavBar from './Navbar';
import React from 'react';
import ReactDOM from 'react-dom';

it("NavBar Renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<NavBar></NavBar>, div)
})

