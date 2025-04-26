const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")


const Industry = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    }
    , {
        tableName: 'industries',
        timestamps: true,
    });

module.exports = Industry;