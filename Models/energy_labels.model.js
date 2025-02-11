import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { EstatesModel } from "./estates.model.js";

export class EnergyLabel extends Model {}

EnergyLabel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "energy_labels",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
