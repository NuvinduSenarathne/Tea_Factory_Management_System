const router = require("express").Router();
let SafetyStock = require("../models/Safetystock")

router.route("/add").post((req,res)=>{
    const {Safety_Set,SKU,Name,Unit_Price,Available_Units,Expire_Date} = req.body;

    const newSafetyStock = new SafetyStock({
        Safety_Set,
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Expire_Date
    })

    newSafetyStock.save().then(()=>{
        res.json("Safety Set Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    SafetyStock.find().then((safetystock)=>{
        res.json(safetystock)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/lt").get((req,res)=>{
    SafetyStock.find().where('Available_Units').lt(51).then((safetystocks)=> {
        res.status(200).json({safetystocks});
      })
})

router.route("/edit/:id").put(async (req,res)=>{
    let safetystockId = req.params.id;
    const {Safety_Set,SKU,Name,Unit_Price,Available_Units,Expire_Date} = req.body;

    const updateSafetyStock = {
        Safety_Set,
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Expire_Date
    }

    const update = await SafetyStock.findByIdAndUpdate(safetystockId,updateSafetyStock).then(()=>{
        res.status(200).send({status:"Safety stock Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let safetystockId = req.params.id;
    await SafetyStock.findByIdAndDelete(safetystockId).then(()=>{
        res.status(200).send({status : "Safety Set Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Safety Set not deleted"})
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let safetystockId = req.params.id;
    await SafetyStock.findById(safetystockId).then((safetystock)=>{
        res.status(200).json({status:"Safety Stock Fetched",safetystock});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).json({status : "Safety Stock did not fetch"})
    })
})

module.exports = router;