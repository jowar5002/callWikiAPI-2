const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const DOMParser = require('dom-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {


  // const query = req.body.cityName;
  // const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ef819c24519c643ac89f76a8ca081edd&units=metric";

  const url = "https://en.wikipedia.org/w/api.php?format=json&action=parse&page=Anthony%20Martial";

  https.get(url, function(response) {

    https.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        const jsonDATA = JSON.parse(data).parse;
        var jsonText = jsonDATA.text;
        var jsonTitle = jsonDATA.title;
        var jsonPageid = jsonDATA.pageid

        var str = JSON.stringify(jsonText);
        // var delimeter = "infobox";
        // var stringifyJsonText = JSON.stringify(jsonText);
        // var output = stringifyJsonText.split(delimeter);
        // var str = JSON.stringify(output);

        // var delimeter = "infobox";
        // var jsonText = JSON.stringify(jsonText);
        // var output = jsonText.split(delimeter);
        // var str = JSON.stringify(output);

        var domParser = new DOMParser();​​


        // var parsedJSON = JSON.parse(str);
        // res.write("<h1>The pagetext is is " + parsedJSON + "</h1>");
        // console.log(str);
        // res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<p>player title is " + jsonTitle + " degree C</p>");
        res.write("<p>The pageid is " + jsonPageid + "</p>");
        res.write("<p>The pagetext is is " + str + "</p>");
        res.send();
        // console.log(temp);
      });
    });
    // res.send("server is up and running")
  });
});



app.listen(3000, function(req, res) {
  console.log("server is running in port 3000");
});
