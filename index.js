
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db_connection_string = process.env.DB_CONNECTION_STRING;
const user = require('./route/user.route.js');
const trip = require('./route/trip.route.js');
const poi = require('./route/poi.route.js');

mongoose.set("strictQuery", false);
mongoose
  .connect(db_connection_string, { useNewUrlParser: true })
  .then(() => {
    console.log("✅ Database connected");
  }).catch((error) => {
    console.log(error)
  });

app.use(express.json());

app.get("/", (req, res) => res.status(200).send({ name: "Travel.r API", version: "0.2" }));

// Users API
app.use('/user', user);
app.use('/poi', poi);

//Trips API
app.use('/trip', trip);

app.listen(port, () => {
  console.log(`🚀 Academy Travel.r API up in the air: http://localhost:${ port }`)
});
