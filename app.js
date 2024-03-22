import express from "express";
import connectToDatabase from "./config/db.js";
import routes from "./routes/routes.js";

const app = express();
const PORT = 5000;

// Connect to the database
connectToDatabase()
  .then((conn) => { 
    
    // Attach the database connection to the request object
    app.use((req, res, next) => {
      req.dbConnection = conn;
      next();
    });
    
    // Use middleware to parse JSON bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Set up routes
    app.use("/crud", routes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if unable to connect to the database
  });
