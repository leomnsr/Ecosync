import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../loaders/sequelize";

export class HistoryModel extends Model<
  InferAttributes<HistoryModel>,
  InferCreationAttributes<HistoryModel>
> {
  declare id: number;
  declare userid: number;
  declare electricityimpact: number;
  declare electricitygrade: number;
  declare waterimpact: number;
  declare watergrade: number;
  declare gasimpact: number;
  declare gasgrade: number;
  declare grade: number;
  declare readingdate: Date;
}

HistoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    electricityimpact: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    electricitygrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waterimpact: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    watergrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gasimpact: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    gasgrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readingdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "history",
    timestamps: false,
  },
);
