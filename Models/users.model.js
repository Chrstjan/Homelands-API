import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class UsersModel extends Model {}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    underscored: true,
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeCreate: async (UsersModel, options) => {
        UsersModel.password = await createHash(UsersModel.password);
      },
      beforeUpdate: async (UsersModel, options) => {
        UsersModel.password = await createHash(UsersModel.password);
      },
    },
  }
);

const createHash = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed_string = await bcrypt.hash(string, salt);
  return hashed_string;
};
