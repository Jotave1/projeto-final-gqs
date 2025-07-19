const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Autor = sequelize.define('Autor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'autores',
    timestamps: false
});

module.exports = Autor;