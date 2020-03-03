import React, { Component } from 'react';
import '../Events/events.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Moment from 'react-moment';
import { Marker ,DirectionsRenderer } from"react-google-maps";
import SearchBar from '../Search/searchBar';
import EventData from '../Events/eventsData'
import GeoButton from './geoButton';
import eventContext,{EventsContext} from '../../Contexts/EventsContext';


class Events extends Component {

  static contextType = eventContext;

  render() {

    return (
     
      <EventsContext.Consumer>       
        {(context) => {      
            var {events,address,latitude,longitude,location,isLoading,
            getLocation,getCoordinates,handleChange,handleSelect} = context;
      
    return(
      <div> 
      <GeoButton getLocation={getLocation}>

      </GeoButton>
        <SearchBar 
            address={address} 
            onChange={handleChange} 
            handleSelect={handleSelect}>
        </SearchBar>  

        <EventData 
            isLoading={isLoading} 
            events ={events}>
        </EventData>
        </div>
          )
        }}   
        </EventsContext.Consumer>
    );
  }
}

export default Events
