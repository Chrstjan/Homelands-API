import express from "express";
import dotenv from "dotenv";
import dbController from "./Controllers/db.controller.js";
import { authController } from "./Controllers/auth.controller.js";
import { estateController } from "./Controllers/estates.controller.js";
import { estateTypeController } from "./Controllers/estate_type.controller.js";
import { cityController } from "./Controllers/cities.controller.js";
import { staffsController } from "./Controllers/staffs.controller.js";
import { userController } from "./Controllers/users.controller.js";
import { reviewsController } from "./Controllers/reviews.controller.js";
import { favoritesController } from "./Controllers/favorites.controller.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(
  dbController,
  authController,
  estateController,
  estateTypeController,
  cityController,
  staffsController,
  userController,
  reviewsController,
  favoritesController
);

app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
