
"use strict"

const express = require('express');

const app = express();





app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
    console.log(`AFF Express Server runnning 
    at http://localhost:${app.get("port")}`);
});
