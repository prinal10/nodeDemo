const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", hbs);

app.use((request, response, next) => {
    let now = new Date().toString();
    let log = "Inside Middleware!!!: " + now + request.method + request.url;
    //console.log(log);
    fs.appendFile("server.log", log + "\n", (error) => {
        if (error) {
            console.log(error);
        }
    });
    next();
});

/*app.use((request, response, next) => {
    response.render("maintenance.hbs", {
        pageName: "Maintenance ",
        welcomeMessage: "Sorry cannot serve request right now!!!"
    });
});*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (request, response) => {
    //response.send("<h1>Hello Express!!!</h1>");
    response.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to Home Page!!",
        pageName: "Home"
    });
});

app.get("/about", (request, response) => {
    //response.send("About Me Page!!!");
    response.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/bad", (request, response) => {
    response.send({
        errorMessage: "Cannot process your request!!!"
    });
});

app.listen(port, () => {
    console.log("Server is up on port: ", port);
});