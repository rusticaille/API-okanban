const {Card, Label} = require('../models');

module.exports = {

    getAllCards : async (req, res) => {
        try { 
            const allCards =   await Card.findAll({
                include: {
                    all: true, 
                    nested: true
                },
                order: [
                    ['position', 'ASC']
                ]
            });
            res.json(allCards);
        } catch (err) {
      console.trace(err);
      res.status(500).send(err);
      }
    },

    getCardsInList: async (req, res) => {
        try {
            // je récup le parametre d'url
            const listId = req.params.id;

            const cardsInList = await Card.findAll({
                where: {
                    list_id: listId
                },
                include: 'labels',
                order: [
                    ['position', 'ASC']
                ]
            });

            if (!cardsInList) {
                res.status(404).json('Cannot find cards with list_id ' + listId);
            } else {
                res.json(cardsInList);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    
    getCardById : async (req, res) => {
        const idFromUrl = req.params.id;
        try {
            const cardById = await Card.findByPk(idFromUrl,{
                include: {
                    all: true, 
                    nested: true
                },
            });
            if (cardById) {
                res.json(cardById);
            } else {
                res.status(404).json('Cannot find card with id ' + idFromUrl);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    createCard : async (req, res) => {
        try {
            const { title, position, color, list_id } = req.body;
            let bodyErrors = [];
            if (!title) { 
                bodyErrors.push('Title cannot be empty');
            } 
            
            if(!list_id){
                bodyErrors.push('List_id cannot be empty')
            }

            if(bodyErrors.length){
                res.status(400).json(bodyErrors)
            }
            else {      
                const newCard = await Card.create({ 
                    title,
                    position,
                    color,
                    list_id
                });
                res.json(newCard);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    addLabelToCard: async (req, res) => {
        try  {
            const cardId = parseInt(req.params.id);
            const labelId = parseInt(req.body.label_id);
            //Il faut penser a l'objectif final quand on récupére la card
            //Tu dois ajouter un label a cette card, donc dans la requete
            //On doit récupérer ses labels ! 
            let cardById = await Card.findByPk(cardId, {
                include: ['labels']
            });
            const labelById = await Label.findByPk(labelId);
            if (cardById) {
                //Attention les mixins modifient la base de données directement
                //addLabel va donc générer une requete SQL pas besoin de save()
                await cardById.addLabel(labelById);
                //En revanche les associations de l'instances ne sont pas mise
                //a jour il va donc falloir SELECT un nouvelle fois la carte avant
                //de la renvoyer ! 
            } else {
                res.status(404).json('Cannot find card with id ' + cardId);
            }
            cardById = await Card.findByPk(cardId, {
                include: ['labels']
            });
            res.json(cardById);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }
    },

    deleteLabelToCard: async (req,res) => {
        try {
            const cardId = req.params.card_id;
            const labelId = req.params.label_id;
            const cardById = await Card.findByPk(cardId);
            const labelById = await Label.findByPk(labelId);
            if (cardById) {
                await cardById.removeLabel(labelById);
                res.json(cardById);
            }else {
                res.status(404).json('Cannot find card with id ' + cardId);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }

    },

    updateOneCard : async (req,res) => {
        const idFromUrl = req.params.id;
        try {           
            const updatedCard = await Card.findByPk(idFromUrl);
            if (!updatedCard) {
                res.status(404).send('Cant find card with id ' + idFromUrl);
            } else {
                const { title, position, color, list_id } = req.body;
                if(title) {
                    updatedCard.title = title;
                }
                if(position) {
                    updatedCard.position = position;
                }
                if(color){
                    updatedCard.color = color;
                }
                if(list_id){
                    updatedCard.list_id = list_id;
                }
                await updatedCard.save();
                res.json(updatedCard);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    deleteCard : async (req,res) => {
        const idFromUrl = req.params.id;
        try {
            const deletedCard = await Card.destroy({
                where: {
                    id: idFromUrl
                }
            });
            res.json('deleted card with id:' + idFromUrl);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },
}