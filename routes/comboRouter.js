const express = require("express");
const comboRouter = express.Router();
// const Burger = require('../models/menu')
// const Drink = require('../models/drink')
// const Side = require('../models/side')
const Combo = require('../models/combo')
// const Condiment = require('../models/condiment')

// Get all and post
comboRouter
    .route("/")
    .get((req, res, next) => {
        Combo.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log('THIS ONE', item)
            return res.status(200).send(item)
        })
    })
    .post((req, res, next) => {
        const newCombo = new Combo(req.body);
        newCombo.save((err, newCombo) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newCombo);
        })
    });

comboRouter.get("/:menuId", (req, res, next) => {
    Combo.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

comboRouter.get("/search/type", (req, res, next) => {
    Combo.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

comboRouter.delete("/:menuId", (req, res, next) => {
    Combo.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed ${deletedItem.name}`)
    })
})

comboRouter.put("/:bountyId", (req, res, next) => {
    Combo.findOneAndUpdate(
        {_id: req.params.bountyId}, 
        req.body, 
        {new: true},
        (err, updatedCombo) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedCombo)
        }
    )
});

module.exports = comboRouter