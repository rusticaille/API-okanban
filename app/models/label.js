const Sequelize = require('sequelize');
const sequelize = require('../database');

class Label extends Sequelize.Model {};

Label.init({
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    text_color: Sequelize.STRING
},{
    sequelize,
    tableName: "label"
});

module.exports = Label;