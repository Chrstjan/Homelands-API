import express from "express";
import sequelize from "../Config/sequelize.config.js";

export const dbController = express.Router();

dbController.get("/api", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection to server");
    res.send("Connection to database");
  } catch (err) {
    console.error(`Error, could not find database ${err}`);
    res.status(500).send("Error, could not find database");
  }
});

dbController.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync();
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});

export default dbController;
