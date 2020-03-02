import React, { createContext, Component } from 'react';
import axios from 'axios';

//creating Auth context

export const EventsContext = createContext();

class EventsContextProviver extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <EventsContext.Provider 
                value={{...this.state}}>
                {this.props.children}
            </EventsContext.Provider>
        )
    }
}

export default EventsContextProviver;