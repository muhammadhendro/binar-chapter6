"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.belongsTo(models.user_game, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      approved: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
