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
        nickname: {
          type: DataTypes.STRING(30),
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
        address: {
          type: DataTypes.STRING(200),
        },
        road_address: {
          type: DataTypes.STRING(200),
        },
        image1: {
          type: DataTypes.BLOB,
        },
        image2: {
          type: DataTypes.BLOB,
        },
        image3: {
          type: DataTypes.BLOB,
        },
        image4: {
          type: DataTypes.BLOB,
        },
        image5: {
          type: DataTypes.BLOB,
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
