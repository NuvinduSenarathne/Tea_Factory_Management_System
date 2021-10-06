const router = require("express").Router();
let DamagedStock = require("../models/DamagedStock")

router.route("/add").post((req,res)=>{
    const {SKU,Name,Available_Units,Damaged_Type} = req.body;

    const newDamagedStock = new DamagedStock({
        SKU,
        Name,
        Available_Units,
        Damaged_Type
    })

    newDamagedStock.save().then(()=>{
        res.json("Damaged Set Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    DamagedStock.find().then((DamagedStock)=>{
        res.json(DamagedStock)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/edit/:id").put(async (req,res)=>{
    let DamagedStockId = req.params.id;
    const {SKU,Name,Available_Units,Damaged_Type} = req.body;

    const updateDamagedStock = {
        SKU,
        Name,
        Available_Units,
        Damaged_Type
    }

    const update = await DamagedStock.findByIdAndUpdate(DamagedStockId,updateDamagedStock).then(()=>{
        res.status(200).send({status:"Damaged stock Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let DamagedStockId = req.params.id;
    await DamagedStock.findByIdAndDelete(DamagedStockId).then(()=>{
        res.status(200).send({status : "Damaged Set Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Damaged Set not deleted"})
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let DamagedStockId = req.params.id;
    await DamagedStock.findById(DamagedStockId).then((DamagedStock)=>{
        res.status(200).json({status:"Damaged Stock Fetched",DamagedStock});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).json({status : "Damaged Stock did not fetch"})
    })
})

module.exports = router;