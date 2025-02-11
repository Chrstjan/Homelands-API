import express from "express";
import { CitiesModel } from "../Models/cities.model.js";

export const cityController = express.Router();

cityController.get("/cities", async (req, res) => {
  try {
    let cities = await CitiesModel.findAll();

    if (!cities || cities.length === 0) {
      return res.status(404).json({ message: "No Cities found" });
    }

    res.json(cities);
  } catch (err) {
    res.status(500).send({
      message: `Error in CitiesModel: ${err}`,
    });
  }
});

cityController.get("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await CitiesModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `City with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling CitiesModel: ${err.message}`,
    });
  }
});

cityController.post("/cities", async (req, res) => {
  const { zipcode, name } = req.body;

  if (!zipcode || !name) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await CitiesModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating city", err);

    res.status(500).json({
      message: `Error in CitiesModel : ${err.message}`,
    });
  }
});

cityController.put("/cities", async (req, res) => {
  const { id, zipcode, name } = req.body;

  if (id && zipcode && name) {
    try {
      const result = await CitiesModel.update(
        { zipcode, name },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({
          message: `City updated`,
        });
      } else {
        res.status(404).json({
          message: `City with ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in CitiesModel: ${err.message}`,
      });
    }
  }
});

cityController.delete("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await CitiesModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({ message: `City with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `City with id ${id} was not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in CitiesModel: ${err.message}`,
    });
  }
});
