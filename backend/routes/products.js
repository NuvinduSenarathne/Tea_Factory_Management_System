const router = require("express").Router();
let Product = require("../models/products.model");

router.route("/add").post((req,res)=>{
    const {SKU,Name,Unit_Price,Available_Units} = req.body;

    const newProduct = new Product({
        SKU,
        Name,
        Unit_Price,
        Available_Units
    })

    newProduct.save().then(()=>{
        res.json("Product Added");
    }).catch((err)=>{
        console.log(err);
    })
});

router.route("/").get((req,res)=>{
    Product.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        console.log(err)
    })
    
});

router.route("/lt").get((req,res)=>{
    Product.find().where('Available_Units').lt(51).then((products)=> {
        res.status(200).json({products});
      })
});

router.route("/edit/:id").put(async (req,res)=>{
    let productId = req.params.id;
    const {SKU,Name,Unit_Price,Available_Units} = req.body;

    const updateProduct = {
        SKU,
        Name,
        Unit_Price,
        Available_Units
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status:"Product Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data",err});
    })
});

router.route("/delete/:id").delete(async (req,res)=>{
    let productId = req.params.id;
    await Product.findByIdAndDelete(productId).then(()=>{
        res.status(200).send({status : "Product Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Product not deleted"})
    })
});

router.route("/get/:id").get(async (req,res)=>{
    let productId = req.params.id;
    await Product.findById(productId).then((product)=>{
        res.status(200).json({product});
        console.log(product)
    }).catch((err)=>{
        console.log(err.message)
        res.json({status : " did not fetch"})
    })
});

router.route('/getProduct/:id').get((request,response) => {

    let sentitem = request.params.id;

    Product.find({Name: sentitem})
        .then((Product) => response.json(Product))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

module.exports = router;