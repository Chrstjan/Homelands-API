import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { CitiesModel } from "./cities.model.js";
import { EnergyLabel } from "./energy_labels.model.js";
import { EstateTypes } from "./estate_types.model.js";

export class EstatesModel extends Model {}

EstatesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payout: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    gross: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    net: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    num_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ground_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    basement_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_of_construction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_rebuild: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floorplan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_clicks: {
      type: DataTypes.INTEGER,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CitiesModel,
        key: "id",
      },
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EstateTypes,
        key: "id",
      },
    },
    energy_label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EnergyLabel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "estates",
    underscored: true,
    freezeTableName: true,
    updatedAt: true,
    updatedAt: true,
  }
);
