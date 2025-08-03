import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Block extends Model {
  declare id: number;
  declare title: string;
  declare code: string;
}

Block.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Block",
  }
);

// `sequelize.define` also returns the model
console.log(Block === sequelize.models.Block); // true

export default Block;
