import express from "express";
import router from "./routes/routes.js";

const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());
// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));
app.use("",router);


app.listen(8080, (req, res) => {
  console.log("Connected to the DataBase");
});
