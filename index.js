
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db_connection_string = process.env.DB_CONNECTION_STRING;

// Routes
const user = require('./route/user.route.js');
const trip = require('./route/trip.route.js');
const auth = require('./route/auth.route.js');

// Documentation
const swaggerUi = require("swagger-ui-express"); 
const swaggerDocument = require("./swagger.json");

mongoose.set("strictQuery", false);
mongoose
  .connect(db_connection_string, { useNewUrlParser: true })
  .then(() => {
    console.log("✅ Database connected");
  }).catch((error) => {
    console.log(error)
  });

app.use(express.json());

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true })); 

app.get("/", (req, res) => res.status(200).send({ name: "Travel.r API", version: "0.1" }));
app.get('/tripadvisor/locations/:locationname', require("./controller/trip.controller.js").getSuggestions);

// Users API
app.use('/user', user);

// Auth API
app.use('/auth', auth);

//Trips API
app.use('/trip', trip);

app.listen(port, () => {
  console.log(`🚀 Academy Travel.r API up in the air: http://localhost:${ port }`)
});
