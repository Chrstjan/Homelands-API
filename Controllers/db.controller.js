import express from "express";
import sequelize from "../Config/sequelize.config.js";
import { seedFromCsv } from "../Utils/seedUtils.js";
import { EstatesModel } from "../Models/estates.model.js";
import { CitiesModel } from "../Models/cities.model.js";
import { UsersModel } from "../Models/users.model.js";
import { StaffsModel } from "../Models/staffs.model.js";
import { EstateTypes } from "../Models/estate_types.model.js";
import { EstateImageRel } from "../Models/estate_image_rel.model.js";
import { EnergyLabel } from "../Models/energy_labels.model.js";
import { ImagesModel } from "../Models/images.model.js";
import { FavoritesModel } from "../Models/favorites.model.js";
import { ReviewsModel } from "../Models/reviews.model.js";

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

dbController.get("/seed", async (req, res) => {
  try {
    await seedFromCsv("image.csv", ImagesModel);
    await seedFromCsv("estate.csv", EstatesModel);
    await seedFromCsv("estate-type.csv", EstateTypes);
    await seedFromCsv("estate-image-rel.csv", EstateImageRel);
    await seedFromCsv("energy-label.csv", EnergyLabel);
    await seedFromCsv("city.csv", CitiesModel);
    await seedFromCsv("staff.csv", StaffsModel);
    await seedFromCsv("user.csv", UsersModel);
    await seedFromCsv("review.csv", ReviewsModel);
    await seedFromCsv("favorite.csv", FavoritesModel);

    res.send({ message: "Seeding completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default dbController;
