const express = require("express");
// const { findById } = require("../models/burger");
const cartRouter = express.Router();
const Combo = require('../models/combo');
const Drink = require('../models/drink');
const Burger = require('../models/burger');
const Side = require('../models/side');
const Order = require('../models/order')
const mongoose = require("mongoose");
const { response } = require("express");



/* Should recieve an object with customers name and an array of objects containing menu item id, type and quantity.
    {
        customer: "string",
        order = [
            {
                _id: i2390358asof,
                type: Burger,
                quantity: 1
            },
            {
                _id: i2390358asof,
                type: Drink,
                quantity: 1
            },
            {
                _id: i2390358asof,
                type: Side,
                quantity: 1
            }
        ]
    }
*/
cartRouter
    .route("/")
    .post(async (req, res, next) => {
        // console.log(req.body.order)
        let orderReq =  req.body.order.map( obj => {
            // let menuItem;
            // console.log(Object.keys(req.body))
            return mongoose.model(obj.type).findOne({_id: obj._id}, (err, item) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                // console.log(item)
                return item;
            });
        })

        Promise.all(orderReq).then(response => {

            // console.log(response)
            const getPrices = response.map( obj => {
                return obj.price
            })
            
            const reducer = (accumalator, currentValue) => accumalator + currentValue;
            const taxes = .8
            const subTotal = getPrices.reduce(reducer)
            const total = subTotal + (taxes * subTotal)
            const name = req.body.name

            const order = {
                name,
                total,
                taxes,
                menuItems: response
            }


            console.log("response",response)
            
            // return order

            const newOrder = new Order(order);
            console.log(newOrder)
            newOrder.save((err, newOrder) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(newOrder);
            })
        })





    })

    module.exports = cartRouter