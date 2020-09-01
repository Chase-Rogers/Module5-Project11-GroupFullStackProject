const express = require("express");
const condimentRouter = express.Router();
const Condiment = require('../models/condiment')

// Get all and post
condimentRouter
    .route("/")
    .get((req, res, next) => {
        Condiment.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(item)
        })
    })
    .post((req, res, next) => {
        const newCondiment = new Condiment(req.body);
        newCondiment.save((err, newCondiment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newCondiment);
        })
    });

condimentRouter.get("/:menuId", (req, res, next) => {
    Condiment.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

condimentRouter.get("/search/type", (req, res, next) => {
    Condiment.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

condimentRouter.delete("/:menuId", (req, res, next) => {
    Condiment.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        console.log(req.body)
        return res.status(200).send(`successfully removed ${}.`)
        // return res.status(200).send(`Successfully removed ${deletedItem.name}`) You can't do this - the item's already been deleted!
    })
})

condimentRouter.put("/:condimentId", (req, res, next) => {
    Condiment.findOneAndUpdate(
        {_id: req.params.condimentId}, 
        req.body, 
        {new: true},
        (err, updatedCondiment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedCondiment)
        }
    )
});

module.exports = condimentRouter