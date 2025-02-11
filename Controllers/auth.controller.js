import express from "express";
import { Authenticate, Authorize } from "../Utils/authUtils.js";

export const authController = express.Router();

authController.get("/authorize", Authorize, (req, res) => {
  res.send({ message: "You are logged in" });
});

authController.post("/login", (req, res) => {
  Authenticate(req, res);
});
