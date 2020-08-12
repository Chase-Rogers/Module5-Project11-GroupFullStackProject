const express = require("express");
const burgerRouter = express.Router();
const Burger = require('../models/burger')

// Get all and post
burgerRouter
    .route("/")
    .get((req, res, next) => {
        Burger.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(item)
        })
    })
    .post((req, res, next) => {
        const newBurger = new Burger(req.body);
        newBurger.save((err, newBurger) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newBurger);
        })
    });

burgerRouter.get("/:menuId", (req, res, next) => {
    Burger.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

burgerRouter.get("/search/type", (req, res, next) => {
    Burger.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

burgerRouter.delete("/:menuId", (req, res, next) => {
    Burger.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed ${deletedItem.name}`)
    })
})

burgerRouter.put("/:burgerId", (req, res, next) => {
    Burger.findOneAndUpdate(
        {_id: req.params.burgerId}, 
        req.body, 
        {new: true},
        (err, updatedBurger) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBurger)
        }
    )
});

module.exports = burgerRouter