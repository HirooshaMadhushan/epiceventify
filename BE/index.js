var express= require('express');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');
// const web_routes = require('./web_routes'); // Assuming web_routes is in a separate file

const dotenv = require('dotenv');
var connection = require('./connection');
const router = require('./Routes/Routes');


var app=express();

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use(
    cors({
        origin: "http://localhost:3000",
    })
)

const port=8000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});