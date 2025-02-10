import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { EstatesModel } from "./estates.model.js";

export class CitiesModel extends Model {}

CitiesModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: EstatesModel,
        key: "city_id",
      },
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "cities",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
