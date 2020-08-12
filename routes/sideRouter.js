const express = require("express");
const sideRouter = express.Router();
const Side = require('../models/side')

// Get all and post
sideRouter
    .route("/")
    .get((req, res, next) => {
        Side.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(item)
        })
    })
    .post((req, res, next) => {
        const newSide = new Side(req.body);
        newSide.save((err, newSide) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newSide);
        })
    });

sideRouter.get("/:menuId", (req, res, next) => {
    Side.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

sideRouter.get("/search/type", (req, res, next) => {
    Side.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

sideRouter.delete("/:menuId", (req, res, next) => {
    Side.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed ${deletedItem.name}`)
    })
})

sideRouter.put("/:sideId", (req, res, next) => {
    Side.findOneAndUpdate(
        {_id: req.params.sideId}, 
        req.body, 
        {new: true},
        (err, updatedSide) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedSide)
        }
    )
});

module.exports = sideRouter