const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Room extends Model {
  static init(sequelize) {
    return super.init(
      {
        delflag: {
          type: DataTypes.BOOLEAN,
          defaultValue: 1,
        },
      },
      {
        modelName: 'Room',
        tableName: 'rooms',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        sequelize,
      },
    );
  }
  static associate(db) {
    db.Room.hasMany(db.Chatting);
    db.Room.belongsToMany(db.User, { through: 'user_room' });
  }
};
