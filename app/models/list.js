const Sequelize = require('sequelize');
const sequelize = require('../database');

class List extends Sequelize.Model {};

List.init({
    name: Sequelize.STRING,
    position: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
},{
    sequelize,
    tableName: "list"
});

module.exports = List;