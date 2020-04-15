import GeoButton from './geoButton';
import React from 'react';
import ReactDOM from 'react-dom';

it("Events Component Renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<GeoButton></GeoButton>, div)
})