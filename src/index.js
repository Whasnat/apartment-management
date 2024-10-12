const express = require("express");
const pool = require("./db/db");


pool.connect((err, client, release) => {
  if (err) {
    console.log("Error Occured ", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      console.log("Error Executing query ", err.stack);
    }
    console.log("Connected to Postgres ", result.rows);
  });
});

const app = express();
const port = process.env.port || 4000;

app.get("/", (req, res) => {
  res.send("Apartment Management in running on Express Server");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
