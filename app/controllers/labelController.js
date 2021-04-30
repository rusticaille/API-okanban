const {Label} = require('../models');

module.exports = {

    getAllLabels : async (req, res) => {
        try { 
            const allLabels = await Label.findAll({
                include: 'cardsForThisLabel'
            });
            res.json(allLabels);
        } catch (err) {
      console.trace(err);
      res.status(500).send(err);
      }
    },
    
    getLabelById : async (req, res) => {
        const idFromUrl = req.params.id;
        try {
            const labelById = await Label.findByPk(idFromUrl,{
                include: 'cardsForThisLabel'
            });
            if (labelById) {
                res.json(labelById);
            } else {
                res.status(404).json('Cannot find label with id ' + idFromUrl);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    createLabel : async (req, res) => {
        try {
            const { name, color, text_color } = req.body;
            let bodyErrors = [];
            if (!name) {
              bodyErrors.push('name can not be empty');
            } else {
                const newLabel = await Label.create({ 
                    name,
                    color,
                    text_color
                });
                res.json(newLabel);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    updateOneLabel : async (req,res) => {
        const idFromUrl = req.params.id;
        try {
            const updatedLabel = await Label.findByPk(idFromUrl);
            if (!updatedLabel) {
                res.status(404).send('Cant find label with id ' + idFromUrl);
            } else {
                const { name, color, text_color } = req.body;
                if(name){
                    updatedLabel.name = name;  
                }
                if(color){
                    updatedLabel.color = color;
                }
                if(text_color){
                    updatedLabel.text_color = text_color;
                }
                await updatedLabel.save();
                res.json(updatedLabel);
            }
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },

    deleteLabel : async (req,res) => {
        const idFromUrl = req.params.id;
        try {
            const deletedLabel = await Label.destroy({
                where: {
                    id: idFromUrl
                }
            });
            res.json('deleted label where id :' + idFromUrl);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
            }
    },
}