const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

//MongoDB UserName: nuvindu ! Password: root
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URL = process.env.ATLAS_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//connect application to MongoDB...
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");  
});

//require files from routes folder..
const usersRouter = require('./routes/users');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const productRouter = require("./routes/products");
const materialRouter = require("./routes/material");
const safetyStockRouter = require("./routes/safetystock");
const deadStockRouter = require("./routes/deadstock");
const damagedstock = require("./routes/damagedstock");
const staffRouter1 = require("./routes/Newstaff.js");
const staffRouter2 = require("./routes/AttendanceR.js");

//use the files...
app.use('/user', usersRouter);
app.use('/customer', customersRouter);
app.use('/order', ordersRouter);
app.use('/products', productRouter);
app.use("/material",materialRouter);
app.use("/safetystock",safetyStockRouter);
app.use("/deadstock",deadStockRouter);
app.use("/damagedstock",damagedstock);
app.use("/newstaff", staffRouter1);
app.use("/attendance1", staffRouter2);

//starts the server... (npm start / npm run dev)
app.listen(PORT, () => {
    console.log(`Server Is Running On PORT Number : ${PORT}`);
});