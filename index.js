require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db_name = process.env.DB_NAME;
const db_password = process.env.DB_PASS;

mongoose.set("strictQuery", false);
mongoose
  .connect(`mongodb+srv://celfocusacademy:${ db_password }@${ db_name }.zqhizcr.mongodb.net/test`, { useNewUrlParser: true })
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
