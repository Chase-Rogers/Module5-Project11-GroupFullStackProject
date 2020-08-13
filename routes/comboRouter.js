const express = require("express");
const comboRouter = express.Router();
const Combo = require('../models/combo')

// Get all and post
comboRouter
    .route("/")
    .get((req, res, next) => {
        Combo.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
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

comboRouter.put("/:comboId", (req, res, next) => {
    Combo.findOneAndUpdate(
        {_id: req.params.comboId}, 
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