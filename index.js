// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_re§source_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

//https://momentjs.com/
const moment = require("moment");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const convertDate = (date) => {
  if (moment(date, "YYYY-MM-DD", true).isValid()) {
    return {
      unix: Number(Date.parse(date)),
      utc: new Date(date).toUTCString(),
    };
  }

  if (moment(date, "X", true).isValid()) {
    return {
      unix: Number(date),
      utc: new Date(Number(date)).toUTCString(),
    };
  }

  return { error: "Invalid Date" };
};

app.get("/api/:date", (req, res) => {
  res.json(convertDate(req.params.date));
});

app.get("/api", (req, res) => {
  const dateToday = {
    unix: Number(Date.parse(new Date())),
    utc: new Date().toUTCString(),
  };
  res.json(dateToday);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
