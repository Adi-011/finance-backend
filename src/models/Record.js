const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Record', {
    amount: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    type: { 
      type: DataTypes.ENUM('income', 'expense'), 
      allowNull: false 
    },
    category: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    date: { 
      type: DataTypes.DATEONLY, 
      defaultValue: DataTypes.NOW 
    },
    description: { 
      type: DataTypes.TEXT 
    }
  });
};