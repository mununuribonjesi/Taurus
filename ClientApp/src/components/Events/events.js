import React, { Component } from 'react';
import '../Events/events.css';
import SearchBar from '../Search/searchBar';
import EventData from '../Events/eventsData'
import GeoButton from './geoButton';
import eventContext,{EventsContext} from '../../Contexts/EventsContext';
const google = window.google;
const DirectionsService = new google.maps.DirectionsService();


class Events extends Component {

  static contextType = eventContext;
  



  getDirections()
  {
      DirectionsService.route({
          origin: new google.maps.LatLng(53.38297,-1.4659),
          destination: new google.maps.LatLng(53.48095,-2.23743),
          travelMode: google.maps.TravelMode.WALKING,
      },(result,status) =>{
          if(status === google.maps.DirectionsStatus.OK)
          {
              console.log(result)
          }

          else{
              console.error(`error festching directions ${result}`);
          }

      })
  }

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
            events ={events}
            getDirections = {this.getDirections}>
        </EventData>
        </div>
          )
        }}   
        </EventsContext.Consumer>
    );
  }
}

export default Events
