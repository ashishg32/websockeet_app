const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 8001;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/video', (req, res) => {
  const range = req.headers.range;
  if(!range) {
    res.status(400).send("Missing range");
  }

  const videoPath = path.join(__dirname, './public/sample.mp4');
  const videoSize = fs.statSync('./public/sample.mp4').size

  const chunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize -1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4"
  }

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {start, end});
  videoStream.pipe(res)
})

app.listen(port, (err) => {
  if(err) {
    console.log("Something went wrong", err);
  } else {
    console.log("Server is listening on port " + port);
  }
});