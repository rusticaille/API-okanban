const {List} = require('../models');

module.exports = {

    getAllLists : async (req, res) => {
        try { 
            const allLists = await List.findAll({
                include: {
                    all: true, 
                    nested: true
                },
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC']
                ]
            });
            res.json(allLists);
        } catch (err) {
      console.trace(err);
      res.status(500).send(err);
      }
    },
    
    getListById : async (req, res) => {
        const idFromUrl = req.params.id;
        try {
            const listById = await List.findByPk(idFromUrl,{
                include: {
                    all: true, 
                    nested: true
                },
                order: [
                    ['cards', 'position', 'ASC']
                ]
            });
            if (listById) {
                res.json(listById);
            } else {
                res.status(404).json('Cannot find list with id ' + idFromUrl);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    getCardsOfList: async (req, res) => {
        const idFromUrl = req.params.id;
        try {
            const listById = await List.findByPk(idFromUrl,{
                include: {
                    all: true, 
                    nested: true
                },
                order: [
                    ['cards', 'position', 'ASC']
                ]
            });
            if (listById) {
                res.json(listById.cards);
            } else {
                res.status(404).json('Cannot find card with id ' + idFromUrl);
            }

        } catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    createList : async (req, res) => {
        try {
            const { name, position } = req.body;
            if (!name) { 
                res.status(400).json('Name cannot be empty');
            } else {
            const newList = await List.create({ 
                name,
                position
            });
            res.json(newList);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    updateOneList : async (req,res) => {
        const idFromUrl = req.params.id;
        try {
            const updatedList = await List.findByPk(idFromUrl);
            if (!updatedList) {
                res.status(404).send('Cant find list with id ' + idFromUrl);
            } else {
                const { name, position } = req.body;
                if (name) {
                    updatedList.name = name;
                }
                if (position) {
                    updatedList.position = position;
                }
                await updatedList.save();
                res.json(updatedList);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    deleteList : async (req,res) => {
        const idFromUrl = req.params.id;
        try {
            const deletedList = await List.destroy({
                where: {
                    id: idFromUrl
                }
            });
            res.json(deletedList);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },
}