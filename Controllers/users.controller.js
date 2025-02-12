import express from "express";
import { UsersModel } from "../Models/users.model.js";
import { Authorize } from "../Utils/authUtils.js";

export const userController = express.Router();

userController.get("/users", async (req, res) => {
  try {
    let users = await UsersModel.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).send({
      message: `Error in UsersModel: ${err}`,
    });
  }
});

userController.get("/users/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await UsersModel.findOne({ where: { id: id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: `User with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling UsersModel: ${err.message}`,
    });
  }
});

userController.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await UsersModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating user", err);

    res.status(500).json({
      message: `Error in UsersModel : ${err.message}`,
    });
  }
});

userController.put("/users", Authorize, async (req, res) => {
  const { id, firstname, lastname, email, password } = req.body;

  if (id && firstname && lastname && email && password) {
    try {
      const result = await UsersModel.update(
        { firstname, lastname, email, password },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({
          message: `User updated`,
        });
      } else {
        res.status(404).json({
          message: `User with ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in UsersModel: ${err.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in UsersModel: Missing data",
    });
  }
});

userController.delete("/users/:id([0-9]*)", Authorize, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await UsersModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({ message: `User with id ${id} has been deleted` });
    } else {
      res.status(404).json({ message: `User with id ${id} was not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in EstatesModel: ${err.message}`,
    });
  }
});
