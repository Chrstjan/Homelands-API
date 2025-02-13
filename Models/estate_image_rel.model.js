import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { EstatesModel } from "./estates.model.js";
import { ImagesModel } from "./images.model.js";

export class EstateImageRel extends Model {}

EstateImageRel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EstatesModel,
        key: "id",
      },
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ImagesModel,
        key: "id",
      },
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "estate_image_rel",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
