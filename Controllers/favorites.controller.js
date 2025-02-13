import express from "express";
import { FavoritesModel } from "../Models/favorites.model.js";
import { Authorize } from "../Utils/authUtils.js";
import { UsersModel } from "../Models/users.model.js";
import { EstatesModel } from "../Models/estates.model.js";

export const favoritesController = express.Router();

FavoritesModel.belongsTo(EstatesModel);
EstatesModel.hasMany(FavoritesModel);

FavoritesModel.belongsTo(UsersModel);
UsersModel.hasMany(FavoritesModel);

favoritesController.get("/favorites", async (req, res) => {
  try {
    let favorites = await FavoritesModel.findAll();

    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No Favorites found" });
    }

    res.json(favorites);
  } catch (err) {
    res.status(500).send({
      message: `Error in FavoritesModel: ${err}`,
    });
  }
});

favoritesController.get("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await FavoritesModel.findOne({ where: { id: id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Favorite with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling FavoritesModel: ${err.message}`,
    });
  }
});

favoritesController.post("/favorites", Authorize, async (req, res) => {
  const { user_id, estate_id } = req.body;

  if (!user_id || !estate_id) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await FavoritesModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating favorite", err);

    res.status(500).json({
      message: `Error in FavoritesModel : ${err.message}`,
    });
  }
});

favoritesController.put("/favorites", Authorize, async (req, res) => {
  const { id, user_id, estate_id } = req.body;

  if (id && user_id && estate_id) {
    try {
      const result = await FavoritesModel.update(
        { user_id, estate_id },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({
          message: `Favorite updated`,
        });
      } else {
        res.status(404).json({
          message: `Favorite with id: ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in FavoritesModel: ${err.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in FavoritesModel: Missing data",
    });
  }
});

favoritesController.delete(
  "/favorites/:id([0-9]*)",
  Authorize,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      let result = await FavoritesModel.destroy({ where: { id } });

      if (result > 0) {
        res
          .status(200)
          .json({ message: `Favorite with id ${id} has been deleted` });
      } else {
        res
          .status(404)
          .json({ message: `Favorite with id ${id} was not found` });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error in EstatesModel: ${err.message}`,
      });
    }
  }
);
