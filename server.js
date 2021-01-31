const express = require('express');
const path = require('path');

const app = express();
const port = 8001;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, (err) => {
  if(err) {
    console.log("Something went wrong", err);
  } else {
    console.log("Server is listening on port " + port);
  }
});