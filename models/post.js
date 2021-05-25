const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        interest_cnt: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        type: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: 'exchange',
        },
        address:{
          type: DataTypes.STRING(30),
        },
        latitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        image1: {
          type: DataTypes.STRING(300),
        },
        image2: {
          type: DataTypes.STRING(300),
        },
        image3: {
          type: DataTypes.STRING(300),
        },
        image4: {
          type: DataTypes.STRING(300),
        },
        image5: {
          type: DataTypes.STRING(300),
        },
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        sequelize,
      },
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.User, { through: 'interests' });
  }
};
