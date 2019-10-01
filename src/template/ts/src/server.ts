// Require Dependencies

import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

// Load .env Enviroment Variables to process.env

dotenv.config();


// Load config

import config from "./config/config"

// Instantiate an Express Application

const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(morgan(config.app.logFormat));
app.use(cookieParser());
app.use(cors());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes
import router from "./routes/router"
app.use('/', router);

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {msg: 'Endpoint Not Found'} );
})

// Open Server on configurated Port

app.listen(
    config.app.port,
    () => console.info('Server listening on port ', config.app.port)
);