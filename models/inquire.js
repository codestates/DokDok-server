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
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        modelName: 'Inquire',
        tableName: 'inquires',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        timestamps: false,
        sequelize,
      },
    );
  }
  static associate(db) {}
};
