const express = require("express");
const orderRouter = express.Router();
const Combo = require("../models/combo");
const Drink = require("../models/drink");
const Burger = require("../models/burger");
const Side = require("../models/side");
const Order = require("../models/order");
const mongoose = require("mongoose");

// Get all and post
orderRouter
    .route("/")
    .get((req, res, next) => {
        Order.find((err, item) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(item);
        });
    })
    .post(async (req, res, next) => {
        let orderReq = req.body.order.map((obj) => {
            let foundItem = mongoose
                .model(obj.type)
                .findOne({ _id: obj._id }, (err, item) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    return {
                        item,
                    };
                });
            foundItem.quantity = obj.quantity;

            return foundItem;
        });

        Promise.all(orderReq).then((response) => {
            for (i = 0; i < req.body.order.length; i++) {
                response[i].quantity = req.body.order[i].quantity;
            }
            const getPrices = response.map((obj) => {
                return (
                    obj.price *
                    req.body.order.find((o) => {
                        return o._id == obj._id;
                    }).quantity
                );
            });

            const reducer = (accumalator, currentValue) => accumalator + currentValue;
            const subTotal = getPrices.reduce(reducer);
            const taxes = subTotal * 0.08;
            let total = subTotal + taxes;
            const name = req.body.name;

            const order = {
                name,
                menuItems: response,
                subTotal,
                taxes,
                total,
            };

            const newOrder = new Order(order);
            newOrder.save((err, newOrder) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(201).send(newOrder);
            });
        });
    });

orderRouter.get("/:orderId", (req, res, next) => {
    Order.find({ _id: req.params.menuId }, (err, item) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(item);
    });
});

orderRouter.get("/search/type", (req, res, next) => {
    Order.find({ faction: req.query.type }, (err, item) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(item);
    });
});

orderRouter.delete("/:orderId", (req, res, next) => {
    Order.findOneAndDelete({ _id: req.params.menuId }, (err, deletedItem) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully removed ${req.body.name}'s order`);
    });
});

orderRouter.put("/:orderId", (req, res, next) => {
    Order.findOneAndUpdate(
        { _id: req.params.orderId },
        req.body,
        { new: true },
        (err, updatedOrder) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedOrder);
        }
    );
});

module.exports = orderRouter;
