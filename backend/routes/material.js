const router = require("express").Router();
let Material = require("../models/Material")

router.route("/add").post((req,res)=>{
    const {SKU,Name,Unit_Price,Available_Units,Net_Weight} = req.body;

    const newMaterial = new Material({
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Net_Weight
    })

    newMaterial.save().then(()=>{
        res.json("Material Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Material.find().then((materials)=>{
        res.json(materials)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/lt").get((req,res)=>{
    Material.find().where('Available_Units').lt(51).then((materials)=> {
        res.status(200).json({materials});
      })
})

router.route("/count").get((req,res)=>{
    Material.find().exec(function (err, results) {
        var count = results.length;
        res.status(200).json({count});
      });
})

router.route("/edit/:id").put(async (req,res)=>{
    let materialId = req.params.id;
    const {SKU,Name,Unit_Price,Available_Units,Net_Weight} = req.body;

    const updateMaterial = {
        SKU,
        Name,
        Unit_Price,
        Available_Units,
        Net_Weight
    }

    const update = await Material.findByIdAndUpdate(materialId,updateMaterial).then(()=>{
        res.status(200).send({status:"Material Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let materialId = req.params.id;
    await Material.findByIdAndDelete(materialId).then(()=>{
        res.status(200).send({status : "Material Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Material not deleted"})
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let materialId = req.params.id;
    await Material.findById(materialId).then((material)=>{
        res.status(200).json({status:"Material Fetched",material});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).json({status : "Material did not fetch"})
    })
})

module.exports = router;