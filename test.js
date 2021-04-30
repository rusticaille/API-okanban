require('dotenv').config();
const {List, Card, Label} = require('./app/models');

// Card.findAll().then((cards) => {
//     console.log(cards);
// });

// List.findAll().then((lists) => {
//     console.log(lists);
// });

Label.findByPk(1).then((label) => {
    console.log(label);
});

// List.findByPk(2, {
//     include: [{
//         association: "cards",
//         include: ["labels"]
//     }]
// }).then((list) => {
//     for(const card of list.cards){
//     console.log('card:', card);
//       console.log('card.labels:', card.labels);
//       console.log('card.labels[0]:', card.labels[0]);
//       for(const label of card.labels){
//           console.log('label :', label);
//           console.log('label.card_has_label:', label.card_has_label);
//       }
//     }
//     console.log(list);
// });