const router = require("express").Router();
let newemp = require("../models/newemp");

router.route("/abc").post((req,res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const dob = Date(req.body.dob);
    const nic = req.body.nic;
    const caddress = req.body.caddress;
    const paddress = req.body.paddress;
    const desig = req.body.desig;
    const dept = req.body.dept;
    const tp = Number(req.body.tp);
    const email = req.body.email;
    const salary = Number(req.body.salary);
    const psw = req.body.psw;
    const userID = req.body.userID;

    const newStaff = new newemp({

        fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw, userID

    })

    newStaff.save().then(() => {
        res.json("staff member succesfully added..");
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
    let userID = req.params.id;
    const {fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw} = req.body;

    const updateStaff = {
        fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw
}

    const update = await newemp.findByIdAndUpdate(userID, updateStaff).then(() => {

        res.status(200).send({status: "user updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })

    
})

router.route("/delete/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await newemp.findByIdAndDelete(userID).then(() => {

        res.status(200).send({status: "user deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: error.message});
    })
})

router.route("/signin/:userID").get(async (req, res) => {
    let userID = req.params.userID;
    await newemp.findOne(userID).then((emp) => {
        //res.status(200).send({status: "user fetched", emp});
        res.json(emp);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched user", error: error.message});
    })
})



module.exports = router;