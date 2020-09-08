const express = require("express");
const drinkRouter = express.Router();
const Drink = require('../models/drink')

// Get all and post
drinkRouter
    .route("/")
    .get((req, res, next) => {
        Drink.find()
        .populate({path: "condiment"})
        .exec((err, item) => {
          if(err) {
              res.status(500)
              return next(err)
          }
          return res.status(200).send(item)
      })
    })
    .post((req, res, next) => {
        const newDrink = new Drink(req.body);
        newDrink.save((err, newDrink) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newDrink);
        })
    });

drinkRouter.get("/:menuId", (req, res, next) => {
    Drink.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

drinkRouter.get("/search/type", (req, res, next) => {
    Drink.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

drinkRouter.delete("/:menuId", (req, res, next) => {
    Drink.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed that drink`)
    })
})

drinkRouter.put("/:drinkId", (req, res, next) => {
    Drink.findOneAndUpdate(
        {_id: req.params.drinkId}, 
        req.body, 
        {new: true},
        (err, updatedDrink) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedDrink)
        }
    )
});

module.exports = drinkRouter