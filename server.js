// server.js

var bodyParser = require('body-parser');
var express = require('express');

var curve = require('./curve');
var dates = require('./dates');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/data", function (request, response) {
  var data = {};
  data.person_data = dates.personData;
  data.prior_dist = curve.prior_parameters();
  data.prior_curve = curve.plot(data.prior_dist);
  data.posterior_dist = curve.posterior_parameters(dates.dateData());
  data.posterior_curve = curve.plot(data.posterior_dist);
  data.strikeouts = dates.strikeouts();
  console.log(data);
  response.send(data);
});

app.get('/data-points', function(request, response) {
  response.send(dates.dateData());
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

