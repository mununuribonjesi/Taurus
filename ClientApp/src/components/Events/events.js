import React, { Component } from 'react';
import '../Events/events.css';
import SearchBar from '../Search/searchBar';
import EventData from '../Events/eventsData'
import GeoButton from './geoButton';
import eventContext,{EventsContext} from '../../Contexts/EventsContext';
import {withGoogleMap,GoogleMap,DirectionsRenderer} from "react-google-maps";
import { Modal,Button } from 'react-bootstrap';
const google = window.google;
const DirectionsService = new google.maps.DirectionsService();

class Events extends Component {

  static contextType = eventContext;
  constructor(props){
  super(props)

  this.state ={directions: null,show: false,route:false,clat:'',clong:'',}

  this.mapModal = this.mapModal.bind(this);
  this.getCurrentPosition = this.getCurrentPosition.bind(this);

  }

  currrentLocation()
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCurrentPosition);

    }

  }

  getCurrentPosition(position) {
    this.setState({clat: position.coords.latitude,clong: position.coords.longitude});                                                              
  }

  mapModal(eventlatitude,eventlongitude,travelMode)
  {
    this.setState({show:!this.state.show});
    this.currrentLocation();
    this.setState({route:!this.state.route});
    this.getRoute(eventlatitude,eventlongitude,travelMode);
  
  }

  getRoute(eventlatitude,eventlongitude,travelMode)
  {

      DirectionsService.route({
          origin: new google.maps.LatLng(this.state.clat,this.state.clong),
          destination: new google.maps.LatLng(eventlatitude,eventlongitude),
          travelMode: google.maps.TravelMode  = "WALKING",
      },(result,status) =>{
          if(status === google.maps.DirectionsStatus.OK)
          {
            this.setState({directions: result});          
          }

          else{
              console.error(`error festching directions ${result}`);
          }

      })

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
            var {events,address,clatitude,clongitude,isLoading,
            getLocation,handleChange,handleSelect} = context;
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
            MapWithAMarker = {MapWithAMarker}
            mapModal = {this.mapModal}
            route = {this.state.route}>
     
        </EventData>

        <Modal show={this.state.show} hide={this.mapModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body><MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3gdKfFl8gePtgZT8kl8lPJaxg16Wc5YQ&libraries=places,drawing,geometry"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="map" style={{ height: `500px`}} />}
          mapElement={<div style={{width:`100%`, height: `100%` }} />}
        /></Modal.Body>
        <Modal.Footer>
    
          <Button onClick={this.mapModal} variant="secondary">
           <i class="fas fa-walking"> </i>
          </Button>
          <Button onClick={this.mapModal} variant="secondary">
          <i class="fas fa-car"></i>
          </Button>
          <Button onClick={this.mapModal} variant="secondary">
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
