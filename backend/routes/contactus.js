const router = require("express").Router();
let contactus = require("../models/contactus");

router.route("/add").post((req,res)=>{
    const {email,message} = req.body;

    const msg = new contactus({
        email,
        message
    })

    msg.save().then(()=>{
        res.json("Message Sent");
    }).catch((err)=>{
        console.loh(err);
    })
});

router.route("/").get((req,res)=>{
    contactus.find().then((contact)=>{
        res.json(contact)
    }).catch((err)=>{
        console.log("Not"+err)
    })
});

router.route("/delete/:id").delete(async (req,res)=>{
    let msgId = req.params.id;
    await contactus.findByIdAndDelete(msgId).then(()=>{
        res.status(200).send({status : "Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "not deleted"})
    })
});

module.exports = router;