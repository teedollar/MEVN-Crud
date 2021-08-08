const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

/* For routes */
require("./app/routes/tutorial.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*

What we do are:
– import express, body-parser and cors modules:

Express is for building the Rest apis
body-parser helps to parse the request and create the req.body object
cors provides Express middleware to enable CORS with various options.
– create an Express app, then add body-parser and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
– define a GET route which is simple for test.
– listen on port 8080 for incoming requests.

Now let’s run the app with command: node server.js.
Open your browser with url http://localhost:8080/, you will see:

*/