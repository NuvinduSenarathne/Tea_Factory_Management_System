const router = require('express').Router();
const { response } = require('express');
const Order = require('./../models/order.model');


// -- -- -- ----- Retreive Data ----- -- -- --

//Backend URL : http://localhost:5000/order/active
//function : Display Active Orders
router.route('/active').get((request,response) => {
    Order.find({status: "active"})
        .then((Orders) => response.json(Orders))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/complete
//function : Display Complete Orders
router.route('/complete').get((request,response) => {
    Order.find({status: "complete"})
        .then((Orders) => response.json(Orders))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/deliver
//function : Display Deliver Orders
router.route('/deliver').get((request,response) => {
    Order.find({status: "deliver"})
        .then((Orders) => response.json(Orders))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/reject
//function : Display Reject Orders
router.route('/reject').get((request,response) => {
    Order.find({status: "reject"})
        .then((Orders) => response.json(Orders))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/viewOrders/:id
//function : View Orders
router.route('/viewOrders/:id').get((request,response) => {

    let customerID = request.params.id;

    Order.find({ customerID: customerID })
        .then((Orders) => response.json(Orders))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/get/:id
//function : get Order to update
router.route('/get/:id').get(async (request, response) => {

    let orderID = request.params.id;

    const order = await Order.findById(orderID)
        .then((order) => response.json(order))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});


// -- -- -- ----- Add Data ----- -- -- --

//Backend URL : http://localhost:5000/order/add/:id
//function : Add Order
router.route('/add/:id').post((request,response) => {
    
    const item = request.body.item;
    const itemcode = request.body.itemcode;
    const quantity = Number(request.body.quantity);
    const unitprice = Number(request.body.unitprice);
    const advance = Number(request.body.advance);
    const deadline = new Date(request.body.deadline);
    const city = request.body.city;
    const country = request.body.country;
    const status = request.body.status;
    const customerID = request.params.id;

    const newOrder = new Order({item, itemcode, quantity, unitprice, advance, deadline, city, country, status, customerID});

    newOrder.save()
        .then((newOrder) => response.json('Order Added! (ID: ' + newOrder._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});


// -- -- -- ----- Update Data ----- -- -- --

//Backend URL : http://localhost:5000/order/update/:id
//function : Update Active Order / Update Completed Orders
router.route('/update/:id').put(async (request,response) => {

    let orderID = request.params.id;


    const {deadline, street1, street2, city, country} = request.body;

    const updateOrder = {deadline, street1, street2, city, country};

    await Order.findByIdAndUpdate(orderID, updateOrder)
        .then((orderID) => response.json('Order Updated! (ID: ' + orderID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/reject
//function : Reject Order
router.route('/reject/:id').put(async (request,response) => {

    let orderID = request.params.id;

    const {description, status} = request.body;

    const updateOrder = {description, status};

    await Order.findByIdAndUpdate(orderID, updateOrder)
        .then((orderID) => response.json('Added to Rejected Orders! (ID: ' + orderID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/order/reject
//function : Complete / Delivere
router.route('/status/:id').put(async (request,response) => {

    let orderID = request.params.id;

    const {status, completedDate, deliveredDate} = request.body;

    const changeStatus = {status, completedDate, deliveredDate};

    await Order.findByIdAndUpdate(orderID, changeStatus)
        .then((orderID) => response.json('Status Changed! (ID: ' + orderID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});


// -- -- -- ----- Delete Data ----- -- -- --

//Backend URL : http://localhost:5000/order/delete/:id
//function : Delete Order
router.route('/delete/:id').delete(async (request, response) => {

    let orderID = request.params.id;

    await Order.findByIdAndDelete(orderID)
        .then((orderID) => response.json('Order Deleted! (ID: ' + orderID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});


module.exports = router;