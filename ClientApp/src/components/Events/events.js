import React, { Component } from 'react';
import '../Events/events.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import{
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Moment from 'react-moment';
import { Marker ,DirectionsRenderer } from"react-google-maps";
import SearchBar from '../Search/searchBar';
import EventData from '../Events/eventsData'
import GeoButton from './geoButton';

const axios = require('axios');

class Events extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      address: '',
      coordinates: [],
      latitude: '',
      longitude: '',
      currentLat:'54.383331',
      currentLon:'-2.466667',
      location: null,
      isLoading: true,
      directions:null,
      show: false
    }

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.calcRoute = this.calcRoute.bind(this);
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsRenderer = new window.google.maps.DirectionsRenderer();


  }

  calcRoute(latitude,longitude){

    const origin = {lat: parseInt(this.state.currentLat),lng:parseInt(this.state.currentLon)};
    const destination = {lat: parseInt(latitude),lng:parseInt(longitude)};


    this.directionsService.route(

        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            
         
            this.setState({
              directions: result
            });

            console.log(this.state.directions);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      this.toggleModal();

  }

  toggleModal() {
    this.setState({
      show: !this.state.show
    });
  }


  getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);

    }
  }

  getCoordinates(position) {

    this.setState({latitude: position.coords.latitude,longitude: position.coords.longitude}); 
    this.setState({currentLat: position.coords.latitude,currentLon: position.coords.longitude}); 
                                                           
    this.getEvents();
  }


  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ longitude: latLng.lng, latitude: latLng.lat }))
      .catch(error => console.error('Error', error));
    this.getEvents();
  };

  getEvents () {
    this.setState({ isLoading: true });
    axios.get('http://www.skiddle.com/api/v1/events/search/?api_key=1981a0231405eeba6bbbdd38829c8501&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&limit=30&radius=10&eventcode=CLUB&order=date&description=1')
      .then(response => {
        this.setState({ events: response.data.results });
        console.log(this.state.events);
      })
      .catch(error => {
        console.log(error)
      })
    this.setState({ isLoading: false });
  }

  render() {
    const { events } = this.state;
    const isLoading = this.state.isLoading;

    return (
      
    <div> 
      <GeoButton getLocation={this.getLocation}/>
        <SearchBar 
            address={this.state.address} 
            onChange={this.handleChange} 
            handleSelect={this.handleSelect}>
        </SearchBar>  

        <EventData 
            isLoading={isLoading} 
            events ={events} 
            calcRoute={this.calcRoute}>
        </EventData>

        <Modal isOpen={this.state.show}>
          <ModalHeader toggle={this.toggleModal}>Response</ModalHeader>
          <ModalBody>
          <DirectionsRenderer
            directions={this.state.directions}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
    </div>
    
    );
  }
}

export default Events
