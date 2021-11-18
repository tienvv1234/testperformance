const express = require("express");
const request = require("request");
const app = express();
const fileUrl =
  "https://ia800300.us.archive.org/1/items/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

// in the imports above
const fs = require("fs");

app.get("/test", function (req, res) {
  var range = req.headers.range;
  console.log("range", range);
  var positions, start, end, total, chunksize;

  request(
    {
      url: fileUrl,
      method: "HEAD",
    },
    function (error, response, body) {
      console.log("1111111111111");
      setResponseHeaders(response.headers);
      console.log("22222222222222222222222");
      pipeToResponse();
      console.log("33333333333333333333333");
    //   const videoStream = fs.createReadStream(fileUrl, { start, end });
    //   console.log("444444444444444444444444");
      // Stream the video chunk to the client
    //   videoStream.pipe(res);
    }
  );

  function setResponseHeaders(headers) {
    positions = range.replace(/bytes=/, "").split("-");
    start = parseInt(positions[0], 10);
    total = headers["content-length"];
    end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    chunksize = end - start + 1;

    console.log({
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
  }

  function pipeToResponse() {
    var options = {
      url: fileUrl,
      headers: {
        range: "bytes=" + start + "-" + end,
        connection: "keep-alive",
      },
    };

    request(options).pipe(res);
  }
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "bigbuck.mp4";
  const videoSize = fs.statSync("bigbuck.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});
