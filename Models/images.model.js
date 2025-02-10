import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class ImagesModel extends Model {}

ImagesModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "images",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
