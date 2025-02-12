import express from "express";
import { EstatesModel } from "../Models/estates.model.js";
import { Authorize } from "../Utils/authUtils.js";

export const estateController = express.Router();

estateController.get("/estates", async (req, res) => {
  try {
    let estates = await EstatesModel.findAll();

    if (!estates || estates.length === 0) {
      return res.status(404).json({ message: "No Estates found" });
    }

    res.json(estates);
  } catch (err) {
    res.status(500).send({
      message: `Error in EstatesModel: ${err}`,
    });
  }
});

estateController.get("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await EstatesModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Estate with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling EstatesModel: ${err.message}`,
    });
  }
});

estateController.post("/estates", Authorize, async (req, res) => {
  const { address, price, cost, num_rooms, city_id, type_id } = req.body;

  if (!address || !price || !cost || !num_rooms || !city_id || !type_id) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await EstatesModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating estate", err);

    res.status(500).json({
      message: `Error in EstatesModel : ${err.message}`,
    });
  }
});

estateController.put("/estates", Authorize, async (req, res) => {
  const { id, address, price, cost, num_rooms, city_id, type_id } = req.body;

  if (id && address && price && cost && num_rooms && city_id && type_id) {
    try {
      const result = await EstatesModel.update(req.body, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Estate updated`,
        });
      } else {
        res.status(404).json({
          message: `Estate with id: ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in EstatesModel: ${err.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in EstatesModel: Missing data",
    });
  }
});

estateController.delete("/estates/:id([0-9]*)", Authorize, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await EstatesModel.destroy({
      where: { id },
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: `Estate with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Esate with id ${id} was not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in EstatesModel: ${err.message}`,
    });
  }
});
