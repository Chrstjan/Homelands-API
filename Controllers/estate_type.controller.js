import express from "express";
import { EstateTypes } from "../Models/estate_types.model.js";

export const estateTypeController = express.Router();

estateTypeController.get("/estate-type", async (req, res) => {
  try {
    let estateTypes = await EstateTypes.findAll();

    if (!estateTypes || estateTypes.length === 0) {
      return res.status(404).json({ message: "No Estate Types found" });
    }

    res.json(estateTypes);
  } catch (err) {
    res.status(500).send({
      message: `Error in EstateTypes: ${err}`,
    });
  }
});

estateTypeController.get("/estate-type/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await EstateTypes.findOne({ where: { id: id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Estate type with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling EstateTypes: ${err.message}`,
    });
  }
});

estateTypeController.post("/estate-type", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await EstateTypes.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating estate type", err);

    res.status(500).json({
      message: `Error in EstateTypes : ${err.message}`,
    });
  }
});

estateTypeController.put("/estate-type", async (req, res) => {
  const { id, name } = req.body;

  if (id && name) {
    try {
      const result = EstateTypes.update({ name }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Estate Type updated`,
        });
      } else {
        res.status(404).json({
          message: `Estate with ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in EstateTypes: ${err.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in EstateTypes: Missing data",
    });
  }
});

estateTypeController.delete("/estate-type/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await EstateTypes.destroy({ where: { id } });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Estate Type with id ${id} has been deleted` });
    } else {
      res
        .status(404)
        .json({ message: `Esate Type with id ${id} was not found` });
    }
  } catch (err) {
    res.status(500).json({
      essage: `Error in EstateTypes: ${err.message}`,
    });
  }
});
