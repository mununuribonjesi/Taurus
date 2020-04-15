"use strict"

const fetch = require("node-fetch")

const getEvents = async (req,res) => {

    var latitude = parseInt(req.query.latitude);
    var longitude = parseInt(req.query.longitude);

    console.log(req.query.latitude);

    var url = new URL("http://www.skiddle.com/api/v1/events/search/"),
    params = {
        api_key:'1981a0231405eeba6bbbdd38829c8501',
        latitude:latitude, 
        longitude:longitude,
        limit:30,
        radius:10,
        eventcode:'CLUB',
        order: 'date',
        description:1
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
       
    try {
      const response = await fetch(url);
      const doc = await response.json();
      console.log(doc);
      return res.send(doc);
    } catch (error) {
      console.log(error);
    }
  };
  
module.exports =
{
    getEvents
}


