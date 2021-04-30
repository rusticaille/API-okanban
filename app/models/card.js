const Sequelize = require('sequelize');
const sequelize = require('../database');

class Card extends Sequelize.Model {};

Card.init({
    title: Sequelize.STRING,
    position: Sequelize.INTEGER,
    color: Sequelize.STRING,
    list_id: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
},{
    sequelize,
    tableName: "card"
});

module.exports = Card;