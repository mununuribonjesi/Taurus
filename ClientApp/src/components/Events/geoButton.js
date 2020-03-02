import React from 'react'
import Moment from 'react-moment';

const geoButton = (props) => <div>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4 text-center">Taurus</h1>
            <div className="text-center">
                <button onClick={props.getLocation} type="button" class="btn location_button btn-success">
                    <i onClick={props.getLocation} class="fa-3x fa fa-map-marker" aria-hidden="true"></i>
                </button></div>
        </div>
    </div>
</div>

export default geoButton;

