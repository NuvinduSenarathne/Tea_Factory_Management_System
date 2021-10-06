const router = require('express').Router();
const { response } = require('express');
const Customer = require('./../models/customer.model');


// -- -- -- ----- Retreive Data ----- -- -- --

//Backend URL : http://localhost:5000/customer/customers
//function : Display Customers
router.route('/customers').get((request,response) => {
    Customer.find({isCorporate: false})
        .then((Customers) => response.json(Customers))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/customer/corporates
//function : Display Corporates
router.route('/corporates').get((request,response) => {
    Customer.find({isCorporate: true})
        .then((Customers) => response.json(Customers))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/customer/get/:id
//function : Get Specific Customer
router.route('/get/:id').get(async (request, response) => {

    let customerID = request.params.id;

    const customer = await Customer.findById(customerID)
        .then((customer) => response.json(customer))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});



// -- -- -- ----- Add Data ----- -- -- --

//Backend URL : http://localhost:5000/customer/add
//function : Add customer / Add Corporate
router.route('/add').post( async(request,response) => {
    
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const company = request.body.company;
    const mobile = request.body.mobile;
    const email = request.body.email;
    const street1 = request.body.street1;
    const street2 = request.body.street2;
    const city = request.body.city;
    const country = request.body.country;
    const isCorporate = Boolean(request.body.isCorporate);

    const newCustomer = new Customer({firstname, lastname, company, mobile, email, street1, street2, city, country, isCorporate});

    newCustomer.save()
        .then((newCustomer) => response.json('Customer Added! (ID: ' + newCustomer._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});


// -- -- -- ----- Update Data ----- -- -- --

//Backend URL : http://localhost:5000/customer/update/:id
//function : Update customer / Update Corporate
router.route('/update/:id').put(async (request,response) => {

    let customerID = request.params.id;

    const {firstname, lastname, company, email, mobile, street1, street2, city, country} = request.body;

    const updateCustomer = {firstname, lastname, company, email, mobile, street1, street2, city, country};

    await Customer.findByIdAndUpdate(customerID, updateCustomer)
        .then((customerID) => response.json('Customer Updated! (ID: ' + customerID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

//Backend URL : http://localhost:5000/customer/type/:id
//function : Mark as Corporate/ Remove from Corporate
router.route('/type/:id').put(async (request,response) => {

    let customerID = request.params.id;

    const isCorporate = request.body;

    await Customer.findByIdAndUpdate(customerID, isCorporate)
        .then((customerID) => response.json('Type Changed! (ID: ' + customerID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});



// -- -- -- ----- Delete Data ----- -- -- --

//Backend URL : http://localhost:5000/customer/delete/:id
//function : Delete Customer / Delete Corporate
router.route('/delete/:id').delete(async (request, response) => {

    let customerID = request.params.id;

    await Customer.findByIdAndDelete(customerID)
        .then((customerID) => response.json('Customer Deleted! (ID: ' + customerID._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});



module.exports = router;