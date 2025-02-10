import express from "express";
import dotenv from "dotenv";
import dbController from "./Controllers/db.controller.js";
import { estateController } from "./Controllers/estates.controller.js";
import { cityController } from "./Controllers/cities.controller.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(dbController, estateController, cityController);

app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
