import connect from "./database/conn.js";
// initializing the server and connecting to the database,
import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

// Define routes and middleware here

// listen the changes of this file on port 3000
app.use(express.json());

const port = 5001;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

/** api routes */
app.use("/api", router);

/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
