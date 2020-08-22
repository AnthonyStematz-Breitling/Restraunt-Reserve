// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 7001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reservation (DATA)
// =============================================================
var reservations = [];
var waitlist = []


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables and waitlist
app.get("/api/dispres", function(req, res) {
    return res.json(dispres);
});

// Create New Reservation - takes in JSON input
app.post("/api/newres", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    console.log(newReservation);

    if (reservations.length < 4) {
        reservations.push(newReservation);
    } else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});