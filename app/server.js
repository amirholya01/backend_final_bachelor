/**
 * This is the main file that exports an Application class which handles the configuration and creation of the Express application.
 * The class defines methods that is creating the server, configuring the database, creating the routes, and handling errors.
 */
const morgan = require("morgan");
const createError = require("http-errors");

module.exports =  class Application{
    
    #express = require("express");
    #app = this.#express();
    
    // Constructor method
    constructor(PORT, DB_HOST){
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_HOST);
        this.createRoute();
        this.errorHandler();
    }

    // Method for configuring the application
    configApplication(){
        const path = require("path");
        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
    }

     // Method for creating the server
    createServer(PORT){
        const http = require("http");

        http.createServer(this.#app)
        .listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        });
    }


    // Method for configuring the database
    connectToMongoDB(DB_HOST){
        const mongoose = require("mongoose");

        mongoose.connect(DB_HOST)
            .then(() => console.log("Connecting to MongoDB was successfully"))
            .catch(err => console.log(`Connecting to MongoDB was failed ---- ${err}`));
        //installing the morgan package and using it on the server file when breaking the connection to DB, it's a secure way 
        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    createRoute(){}


        
    // Method for handling errors
    errorHandler(){
        this.#app.use((req, res, next) => {

            // Handle 404 errors
            return res.status(404).json({
                status : 404,
                success : false,
                message : "The page or address was not found"
            })
        });

        this.#app.use((error, req, res, next) => {
            const internalServerError = createError.InternalServerError; 
            // Handle Internal server errors
            const statusCode = error?.status || internalServerError.statusCode;
            const message = error?.message || internalServerError.message;
            return res.status(status).json({
                statusCode,
                success : false,
                message
            })
        })
    }
}