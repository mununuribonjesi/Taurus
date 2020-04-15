"use strict"

var events = require('../ServiceLayer/eventsService.js');

const fetch = require("node-fetch")

const getEvents = async (req,res) => 
{

    events.eventsService(req,res)
  

};
  
module.exports ={
    getEvents
}


