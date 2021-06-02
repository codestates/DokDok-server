const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        social_type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        profile_image: {
          type: DataTypes.STRING(300),
          default:
            'https://practice-bucket-deploy7.s3.ap-northeast-2.amazonaws.com/CJdjtieUkAAR4e3.jpeg',
        },
        delflag: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
        sequelize,
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Chatting);
    db.User.belongsToMany(db.Post, { through: 'interests' });
    db.User.belongsToMany(db.Room, { through: 'user_room' });
  }
};
