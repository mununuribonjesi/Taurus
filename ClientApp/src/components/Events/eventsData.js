import React from 'react'
import Moment from 'react-moment';
const eventData = (props) => <div className="container">

{props.isLoading ? (
  <div class="fa-5x text-center"><i class="loading_icon fa fa-cog fa-spin"></i></div>
) : (
    <div className="row">
      {
        props.events.length ?
          props.events.map(event =>
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
                  <button type="button" onClick={props.getRoute(event.venue.latitude,event.venue.longitude,props.latitude,props.longitude)} className="btn btn-primary"><div class="fa-2x"><i class="fa fa-map"></i></div></button>
                </ul>
              </div>
            </div>
          ) : null
      }
    </div>
  )}
</div>

export default eventData