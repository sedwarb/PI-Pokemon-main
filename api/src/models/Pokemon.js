const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.FLOAT,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    fuerza: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    defenza: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    altura: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    peso: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    imagen:{
      type: DataTypes.STRING,
      defaultValue:'https://pm1.narvii.com/6305/84ffa2658769b31eb8c7dd5c71105a39ae3467a4_hq.jpg'
    }
  });
};
