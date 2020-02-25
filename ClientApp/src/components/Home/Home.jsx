import React, { Component } from 'react';
import Events from '../Events/events';

const axios = require('axios');
const API_KEY = 'AIzaSyB3gdKfFl8gePtgZT8kl8lPJaxg16Wc5YQ';

const skiddleAPI = '1981a0231405eeba6bbbdd38829c8501';
class Home extends Component {



    render() {
        return (
            <div>
            <Events>
            </Events>
            </div>
        );
    }
}

export default Home;


/*<li>{event.id} {event.eventname} {event.venue.name}  </li> */
/* <div>

            <GoogleComponent
             apiKey ={API_KEY}
             language={'en'}
             country={'country:us|country:gb'}
             coordinates={true}
             onChange={(e)=> {this.setState({place: e})}}
            />
        </div>
          */