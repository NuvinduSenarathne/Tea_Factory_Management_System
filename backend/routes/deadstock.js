const router = require("express").Router();
let DeadStock = require("../models/Deadstock")

router.route("/add").post((req,res)=>{
    const {Dead_Set,SKU,Name,Unit_Price,Available_Units,Expire_Date} = req.body;

    const newDeadStock = new DeadStock({
        Dead_Set,
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Expire_Date
    })

    newDeadStock.save().then(()=>{
        res.json("Dead Set Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    DeadStock.find().then((deadstock)=>{
        res.json(deadstock)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/edit/:id").put(async (req,res)=>{
    let DeadStockId = req.params.id;
    const {Dead_Set,SKU,Name,Unit_Price,Available_Units,Expire_Date} = req.body;

    const updateDeadStock = {
        Dead_Set,
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Expire_Date
    }

    const update = await DeadStock.findByIdAndUpdate(DeadStockId,updateDeadStock).then(()=>{
        res.status(200).send({status:"Dead stock Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let DeadStockId = req.params.id;
    await DeadStock.findByIdAndDelete(DeadStockId).then(()=>{
        res.status(200).send({status : "Dead Set Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Dead Set not deleted"})
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let DeadStockId = req.params.id;
    await DeadStock.findById(DeadStockId).then((deadstock)=>{
        res.status(200).json({deadstock});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).json({status : "Dead Stock did not fetch"})
    })
})

module.exports = router;