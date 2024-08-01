import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../loaders/sequelize";

export class HousesModel extends Model<
  InferAttributes<HousesModel>,
  InferCreationAttributes<HousesModel>
> {
  declare userid: number;
  declare housearea: number;
  declare inhabitants: number;
  declare housetype: number;
  declare linkynumber: string;
}

HousesModel.init(
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
    housearea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inhabitants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    housetype: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    linkynumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "houses",
    timestamps: false,
  },
);
