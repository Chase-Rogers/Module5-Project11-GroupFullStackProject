const express = require("express");
const orderRouter = express.Router();
const Order = require('../models/order')

// Get all and post
orderRouter
    .route("/")
    .get((req, res, next) => {
        Order.find((err, item) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(item)
        })
    })
    .post((req, res, next) => {
        const newOrder = new Order(req.body);
        newOrder.save((err, newOrder) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newOrder);
        })
    });

orderRouter.get("/:menuId", (req, res, next) => {
    Order.find({_id: req.params.menuId}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

orderRouter.get("/search/type", (req, res, next) => {
    Order.find({faction: req.query.type}, (err, item) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(item)
    })
});

orderRouter.delete("/:menuId", (req, res, next) => {
    Order.findOneAndDelete({_id: req.params.menuId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed that order.`)
    })
})

orderRouter.put("/:orderId", (req, res, next) => {
    Order.findOneAndUpdate(
        {_id: req.params.orderId}, 
        req.body, 
        {new: true},
        (err, updatedOrder) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedOrder)
        }
    )
});

module.exports = orderRouter