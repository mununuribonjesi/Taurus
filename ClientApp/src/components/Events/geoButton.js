import React from 'react'
import Moment from 'react-moment';

const geoButton = (props) => <div>
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4 text-center">Taurus</h1>
            <div className="text-center">
                <button onClick={props.getLocation} type="button" className="btn location_button btn-success">
                    <i onClick={props.getLocation} className="fa-3x fa fa-map-marker" aria-hidden="true"></i>
                </button></div>
        </div>
    </div>
</div>

export default geoButton;

