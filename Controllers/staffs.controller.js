import express from "express";
import { StaffsModel } from "../Models/staffs.model.js";

export const staffsController = express.Router();

staffsController.get("/staff", async (req, res) => {
  try {
    let staff = await StaffsModel.findAll();

    if (!staff || staff.length === 0) {
      return res.status(404).json({ message: "No Staff found" });
    }

    res.json(staff);
  } catch (err) {
    res.status(500).send({
      message: `Error in StaffsModel: ${err}`,
    });
  }
});

staffsController.get("/staff/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = StaffsModel.findOne({ where: { id: id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Staff with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling StaffsModel: ${err.message}`,
    });
  }
});

staffsController.post("/staff", async (req, res) => {
  const { firstname, lastname, position, photo, email, phone } = req.body;

  if (!firstname || !lastname || !position || !photo || !email || !phone) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await StaffsModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating staff", err);

    res.status(500).json({
      message: `Error in StaffsModel : ${err.message}`,
    });
  }
});

staffsController.put("/staff", async (req, res) => {
  const { id, firstname, lastname, position, photo, email, phone } = req.body;

  if (id && firstname && lastname && position && photo && email && phone) {
    try {
      const result = await StaffsModel.update(
        { firstname, lastname, position, photo, email, phone },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({
          message: `Staff updated`,
        });
      } else {
        res.status(404).json({
          message: `Staff with ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in StaffsModel: ${err.message}`,
      });
    }
  }
});

staffsController.delete("/staff/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await StaffsModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({ message: `Staff with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `Staff with id ${id} was not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in StaffsModel: ${err.message}`,
    });
  }
});
