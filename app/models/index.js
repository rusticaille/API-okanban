const List = require('./list');
const Card = require('./card');
const Label = require('./label');

List.hasMany(Card, {
    foreignKey: "list_id",
    as: "cards"
});

Card.belongsTo(List, {
    foreignKey: "list_id",
    as: "list"
});

Card.belongsToMany(Label, {
    as: "labels",
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id'
});

Label.belongsToMany(Card, {
    as: "cardsForThisLabel",
    through: 'card_has_label',
    otherkey: 'card_id',
    foreignKey: 'label_id'
});

module.exports = {List, Card, Label};