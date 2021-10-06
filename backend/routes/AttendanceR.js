const router = require("express").Router();
let newemp = require("../models/attendanceM");

router.route("/add").post((req,res) => {

    const startTime = req.body.startTime;
    const leaveTime = req.body.leaveTime;
    const userID = req.body.userID;
    const date = req.body.date;

    const newAtts = new newemp({

        startTime, leaveTime, userID, date

    })

    newAtts.save().then(() => {
        res.json("attendance details added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get(async (req,res) => {
    newemp.find().then((newemp) => {
        res.json(newemp);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => { 
    let userID = req.params.id;
    await newemp.findById(userID).then((emp) => {
        //res.status(200).send({status: "user fetched", emp});
        res.json(emp);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let attdsID = req.params.id;
    const {startTime, leaveTime, userID} = req.body;

    const updateAttds = {
        startTime, leaveTime, userID
        }

    const update = await newemp.findByIdAndUpdate(attdsID, updateAttds).then(() => {

        res.status(200).send({status: "user updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })    
})

router.route("/date/:id").get(async (req, res) => {
    let date = req.params.id;
    await newemp.findOne({date}).then((emp) => {
        //res.status(200).send({status: "user fetched", emp});
        res.json(emp);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
})

module.exports = router;