const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Chatting extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.BLOB,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        modelName: 'Chatting',
        tableName: 'chattings',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        sequelize,
      },
    );
  }
  static associate(db) {
    db.Chatting.belongsTo(db.User);
    db.Chatting.belongsTo(db.Room);
  }
};
