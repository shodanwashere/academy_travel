require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db_connection_string = process.env.DB_CONNECTION_STRING;

mongoose.set("strictQuery", false);
mongoose
  .connect(db_connection_string, { useNewUrlParser: true })
  .then(() => {
    console.log("✅ Database connected");
  }).catch((error) => {
    console.log(error)
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).send({ name: "Travel.r API", version: "0.1" }));

app.listen(port, () => {
  console.log(`🚀 Celfocus Academy API up in the air: http://localhost:${ port }`)
});
