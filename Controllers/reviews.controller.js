import express from "express";
import { ReviewsModel } from "../Models/reviews.model.js";
import { Authorize } from "../Utils/authUtils.js";
import { EstatesModel } from "../Models/estates.model.js";
import { UsersModel } from "../Models/users.model.js";

export const reviewsController = express.Router();

ReviewsModel.belongsTo(EstatesModel);
EstatesModel.hasMany(ReviewsModel);

ReviewsModel.belongsTo(UsersModel);
UsersModel.hasMany(ReviewsModel);

reviewsController.get("/reviews", async (req, res) => {
  try {
    let reviews = await ReviewsModel.findAll({
      include: [
        {
          model: UsersModel,
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: EstatesModel,
          attributes: [
            "id",
            "address",
            "price",
            "payout",
            "gross",
            "net",
            "cost",
            "num_rooms",
            "num_floors",
            "floor_space",
            "ground_space",
            "basement_space",
            "year_construction",
            "year_rebuilt",
            "description",
            "floorplan",
            "num_clicks",
            "city_id",
            "estate_type_id",
            "energy_label_id",
          ],
        },
      ],
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No Reviews found" });
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).send({
      message: `Error in ReviewsModel: ${err}`,
    });
  }
});

reviewsController.get("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await ReviewsModel.findOne({
      where: { id: id },
      include: [
        {
          model: UsersModel,
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: EstatesModel,
          attributes: [
            "id",
            "address",
            "price",
            "payout",
            "gross",
            "net",
            "cost",
            "num_rooms",
            "num_floors",
            "floor_space",
            "ground_space",
            "basement_space",
            "year_construction",
            "year_rebuilt",
            "description",
            "floorplan",
            "num_clicks",
            "city_id",
            "estate_type_id",
            "energy_label_id",
          ],
        },
      ],
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Review with id ${id} was not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in calling ReviewsModel: ${err.message}`,
    });
  }
});

reviewsController.post("/reviews", Authorize, async (req, res) => {
  const { subject, comment, num_stars, date, estate_id, user_id } = req.body;

  if (!subject || !comment || !estate_id || !user_id || !date || !num_stars) {
    return res.status(400).json({ message: `You need to add all fields` });
  }

  try {
    const result = await ReviewsModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error when creating Review", err);

    res.status(500).json({
      message: `Error in ReviewsModel : ${err.message}`,
    });
  }
});

reviewsController.put("/reviews", Authorize, async (req, res) => {
  const {
    id,
    subject,
    comment,
    num_stars,
    date,
    estate_id,
    user_id,
    is_active,
  } = req.body;

  if (
    id &&
    subject &&
    comment &&
    num_stars &&
    date &&
    estate_id &&
    user_id &&
    is_active
  ) {
    try {
      const result = ReviewsModel.update(req.body, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Review updated`,
        });
      } else {
        res.status(404).json({
          message: `Review with id: ${id} was not found in the database`,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error while updating in ReviewsModel: ${err.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Error in ReviewsModel: Missing data",
    });
  }
});

reviewsController.delete(
  "/reviews/:id([0-9]*)",
  Authorize,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      let result = await ReviewsModel.destroy({ where: { id } });

      if (result > 0) {
        res
          .status(200)
          .json({ message: `Review with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Review with id ${id} was not found` });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error in ReviewsModel: ${err.message}`,
      });
    }
  }
);
