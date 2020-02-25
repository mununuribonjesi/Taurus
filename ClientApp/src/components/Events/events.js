import React, { Component } from 'react';
import '../Events/events.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Moment from 'react-moment';
import { Marker ,DirectionsRenderer } from"react-google-maps";

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
                                                           
    this.componentDidMount();
  }


  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ longitude: latLng.lng, latitude: latLng.lat }))
      .catch(error => console.error('Error', error));
    this.componentDidMount();
  };



  componentDidMount() {
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
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4 text-center">Taurus</h1>
            <div className="text-center">
              <button onClick={this.getLocation} type="button" class="btn location_button btn-success">
                <i onClick={this.getLocation} class="fa-3x fa fa-map-marker" aria-hidden="true"></i>
              </button></div>
          </div>
        </div>



        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

              <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                  <div className="searchbar">
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'search_input',
                        autoFocus: true
                      })}
                    />

                    <a onClick={this.handleSelect} href="#" className="search_icon"><i class="fa fa-search"></i></a>

                    <div className="autocomplete-dropdown-container text-center">
                      {loading && <div class="fa-5x"><i class="fa fa-cog fa-spin"></i></div>}
                      {suggestions.map(suggestion => (
                        <div {...getSuggestionItemProps(suggestion)}>
                          <span>{suggestion.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </PlacesAutocomplete>

        <div className="container">

          {isLoading ? (
            <div class="fa-5x text-center"><i class="loading_icon fa fa-cog fa-spin"></i></div>
          ) : (
              <div className="row">
                {
                  events.length ?
                    events.map(event =>
                      <div className="col-4 col-offset-4">
                        <div className="card" key={event.id} >
                          <img class="card-img-top" src={event.largeimageurl} alt="Card image cap"></img>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">Event: {event.eventname} </li>
                            <li className="list-group-item">Venue: {event.venue.name} </li>
                            <li className="list-group-item">Price: {event.entryprice} </li>
                            <li className="list-group-item">location: {event.venue.town} </li>
                            <li className="list-group-item">Date:
                            <Moment format="D MMM YYYY" withTitle>
                            {event.date} 
                              </Moment>
                            
                             </li>
                            <button onClick={() => this.calcRoute(event.venue.latitude,event.venue.longitude)} type="button" className="btn btn-primary"><div class="fa-2x"><i class="fa fa-map"></i></div></button>
                          </ul>
                        </div>
                      </div>
                    ) : null
                }
              </div>
            )}
        </div>

      
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
