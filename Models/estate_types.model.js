import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class EstateTypes extends Model {}

EstateTypes.init(
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
    modelName: "estate_types",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
