import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { EstatesModel } from "./estates.model.js";

export class EstateTypes extends Model {}

EstateTypes.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: EstatesModel,
        key: "type_id",
      },
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
