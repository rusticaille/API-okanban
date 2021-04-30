const express = require('express');
const cardController = require('./controllers/cardController');
const listController = require('./controllers/listController');
const labelController = require('./controllers/labelController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is running');
});

router.get ('/lists', listController.getAllLists);
router.get ('/lists/:id', listController.getListById);
router.get('/lists/:id/cards', listController.getCardsOfList);
router.post ('/lists', listController.createList);
router.patch ('/lists/:id', listController.updateOneList);
router.delete('/lists/:id', listController.deleteList);

router.get('/cards', cardController.getAllCards);
router.get ('/cards/:id', cardController.getCardById);
router.get('/lists/:id/cards', cardController.getCardsInList);
router.post('/cards', cardController.createCard);
router.post('/cards/:id/label', cardController.addLabelToCard);
router.patch('/cards/:id', cardController.updateOneCard);
router.delete('/cards/:id', cardController.deleteCard);
router.delete('/cards/:card_id/label/:label_id', cardController.deleteLabelToCard);

router.get('/labels', labelController.getAllLabels);
router.get('/labels/:id', labelController.getLabelById);
router.post('/labels', labelController.createLabel);
router.patch('/labels/:id', labelController.updateOneLabel);
router.delete('/labels/:id', labelController.deleteLabel);

module.exports = router;