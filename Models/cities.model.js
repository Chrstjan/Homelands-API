import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class CitiesModel extends Model {}

CitiesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
