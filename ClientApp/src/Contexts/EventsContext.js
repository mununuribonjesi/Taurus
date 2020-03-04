import React, { createContext, Component } from 'react';
import axios from 'axios';
import{
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";


//creating Auth context

export const EventsContext = createContext();

class EventsContextProvider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            events: [],
            address: '',
            latitude: '',
            longitude: '',
            location: null,
            clatitude: '',
            clongitude: '',
            isLoading:true,
            show:false,
            directions: null
          }


    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);



      
    }


  


  
 
    getLocation() {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates);
    
        }
      }

      getCoordinates(position) {

        this.setState({latitude: position.coords.latitude,longitude: position.coords.longitude});                                                            
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
      }

      getEvents (){
        this.setState({ isLoading: true });
        axios.get('http://www.skiddle.com/api/v1/events/search/?api_key=1981a0231405eeba6bbbdd38829c8501&latitude=' 
        + this.state.latitude + '&longitude=' + this.state.longitude 
        + '&limit=30&radius=10&eventcode=CLUB&order=date&description=1')
          .then(response => {
            this.setState({ events: response.data.results });
          })
          .catch(error => {
            console.log(error)
          })
        this.setState({ isLoading: false });
      }

    render() {
        return (
            <EventsContext.Provider 
                value={{...this.state,getLocation:this.getLocation,clatitude:this.state.clatitude,
                  clongitude:this.state.clongitude,
                getCoordinates:this.getCoordinates,handleChange:this.handleChange,handleSelect:this.handleSelect,getRoute:this.getRoute}}>
                {this.props.children}
            </EventsContext.Provider>
        )
    }
}

export default EventsContextProvider;