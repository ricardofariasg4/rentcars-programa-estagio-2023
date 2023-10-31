// {
//     "id": "cd99557a-8750-463e-a3fa-7f7bd9ecf37a",
//     "locadora": "Movida",
//     "modelo": "Virtus",
//     "marca": "Volkswagen",
//     "ano": 2023,
//     "motor": "1.0",
//     "portas": 4,
//     "cambio": "Automatico",
//     "ar_condicionado": true,
//     "updatedAt": "2023-10-23T14:37:35.917Z",
//     "createdAt": "2023-10-23T14:37:35.917Z"
// }

const { DataTypes } = require('sequelize');
const database = require('./database');

const Veiculos = database.define('veiculos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    locadora: {
        type: DataTypes.STRING,
        allowNull: false
    },

    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    motor: {
        type: DataTypes.STRING,
        allowNull: false
    },

    portas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cambio: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ar_condicionado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Veiculos;