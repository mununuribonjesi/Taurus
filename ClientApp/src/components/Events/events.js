import React, { Component } from 'react';
import '../Events/events.css';
import SearchBar from '../Search/searchBar';
import EventData from '../Events/eventsData'
import GeoButton from './geoButton';
import eventContext,{EventsContext} from '../../Contexts/EventsContext';
import {withScriptjs,withGoogleMap,GoogleMap,Marker,DirectionsRenderer} from "react-google-maps";
import { Modal,Button } from 'react-bootstrap';
const google = window.google;


class Events extends Component {

  static contextType = eventContext;
  constructor(props){
  super(props)


}

state = {
  directions:null,
}


  render() {

    const MapWithAMarker = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));
    

    return (

      <EventsContext.Consumer>  
        {(context) => {      
            var {events,address,latitude,longitude,clatitude,clongitude,location,isLoading,show,directions,
            getLocation,getCoordinates,handleChange,handleSelect,toggleMap} = context;

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
            events ={events}
            latitude ={clatitude}
            longitude ={clongitude}
            getRoute = {toggleMap}>
  
        </EventData>

        <Modal show={show}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3gdKfFl8gePtgZT8kl8lPJaxg16Wc5YQ&libraries=places,drawing,geometry"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `200px` }} />}
  mapElement={<div style={{width:`100%`, height: `100%` }} />}
        /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        
        </div>
          )
        }}   

  
        </EventsContext.Consumer>
    );
  }
}

export default Events
