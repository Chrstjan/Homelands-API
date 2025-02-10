import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { UsersModel } from "./users.model.js";
import { EstatesModel } from "./estates.model.js";

export class FavoritesModel extends Model {}

FavoritesModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: UsersModel,
        key: "id",
      },
    },
    estate_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: EstatesModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "favorites",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);
