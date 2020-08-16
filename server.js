const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware
app.use(express.json());
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/module5-group-project', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

//Routes
app.use("/combo", require("./routes/comboRouter"));
app.use("/drink", require("./routes/drinkRouter"));
app.use("/burger", require("./routes/burgerRouter"));
app.use("/side", require("./routes/sideRouter"));
app.use("/condiment", require("./routes/condimentRouter"));
app.use("/order", require("./routes/orderRouter"))
app.use("/cart", require("./routes/shoppingCartRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({Error: err.message})
})

// 1: port   2: callback function
app.listen(9000, () => {
    console.log("The server is running on port 9000");
});
