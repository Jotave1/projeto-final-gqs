const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Autor = require('./Autor');

const Livro = sequelize.define('Livro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano_publicacao: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'livros',
    timestamps: false
    });

    Livro.belongsTo(Autor, {
    foreignKey: 'autorId',
    as: 'autor'
});

module.exports = Livro;