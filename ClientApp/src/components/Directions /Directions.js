import  {react,Component} from 'react';
import { Marker ,DirectionsRenderer } from"react-google-maps";
const DirectionsService = new google.maps.DirectionsService();

class Directions extends Component {




    getDirections()
    {
        DirectionsService.route({
            origin: new google.maps.LatLng(),
            destination: new google.maps.LatLng(),
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


    render(){
        return(
            <div> 


            </div>
        )
        }
}

export default Directions;