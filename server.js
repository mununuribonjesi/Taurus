"use strict"

const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
    console.log(`AFF Express Server runnning 
    at http://localhost:${app.get("port")}`);
});
