import React, { Component } from 'react';
import PlacesAutocomplete from "react-places-autocomplete";

class searchBar extends Component{
    constructor(props)
    {
      super(props)
      this.state={
        
      }
    }

  render(){
    return(
      <PlacesAutocomplete
      value={this.props.address}
      onChange={this.props.onChange}
      onSelect={this.props.handleSelect}
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

                <a onClick={this.props.handleSelect} href="#" className="search_icon"><i class="fa fa-search"></i></a>

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
    )
  }
}

export default searchBar;