"use strict"

var events = require('../ServiceLayer/eventsService.js');

const getEvents = async (req,res) => 
{
    events.eventsService(req,res)
};
  
module.exports ={
    getEvents
}


