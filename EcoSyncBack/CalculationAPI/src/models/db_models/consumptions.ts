import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../loaders/sequelize";

export class ConsumptionsModel extends Model<
  InferAttributes<ConsumptionsModel>,
  InferCreationAttributes<ConsumptionsModel>
> {
  declare userid: number;
  declare electricity: number;
  declare water: number;
  declare citygas: number;
  declare propanegas: number;
  declare bottlegas: number;
  declare bottlequantity: number;
}

ConsumptionsModel.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    electricity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    water: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    citygas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    propanegas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bottlegas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bottlequantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "consumptions",
    timestamps: false,
  },
);
