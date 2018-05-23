'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define('Flair', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {});
  Flair.associate = function(models) {
  // associations can be defined here
    Flair.belongsTo(models.Post, {
       foreignKey: "postId",
       onDelete: "CASCADE"
     });
    Flair.belongsTo(models.Topic, {
       foreignKey: "topicId",
       onDelete: "CASCADE"
     });
  };
  return Flair;
};
