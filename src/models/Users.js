const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    role: { 
      type: DataTypes.ENUM('Viewer', 'Analyst', 'Admin'), 
      defaultValue: 'Viewer' 
    },
    isActive: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  });
};