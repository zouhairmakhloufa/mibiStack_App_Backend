const router = require("express").Router();
let Qestion = require("../models/Qestion.js") 

const multer=require("multer")

//multer configuration
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "images");
  },

  // x.jpg ==> x-25488522000-Qest.jpg >
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-qest-" + "." + extension;
    cb(null, imgName);
  },
});

// add une qest touristique
router.route("/add").post(multer({ storage: storage }).single("image"), async (req, res) => {
   let url = req.protocol + "://" + req.get("host");

    try {
      const newQestion = new Qestion({
        name:req.body.name,
        address: req.body.address,
        description:req.body.description,
        image:url + "/images/"+req.file.filename,
      });
       newQestion.save().then(()=>{
        res.status(200).json({ message:"qest added sucssefuly" });
       });
      
      
    } catch (err) {
      console.log(err);
      res.status(400).json("Error: " + err);
    }
  });

//  get All qest
router.route("/get").get(async (req, res) => {
  try {
    const Qest = await Qestion.find();
    console.log("here qestion",Qest);
    res.status(200).json({ qest:Qest });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

  //Delete by ID Method
  router.delete('/delete/:id', async (req, res) => {
    Qestion.deleteOne({_id:req.params.id}).then(()=>{
    res.status(200).json({
      message:"deleted success"
    })
  })
})

  // edit Qest par nom
  router.put('/edit/:id',multer({ storage: storage }).single("image"), (req, res) => {
    let url = req.protocol + "://" + req.get("host");

   let newQest
    try {
      if (req.file) {
        newQest = {
          _id:req.params.id,
          name:req.body.name,
          address: req.body.address,
          description:req.body.description,
          image:url + "/images/"+req.file.filename,
        };
        
      } else {
        newQest = {
          _id:req.params.id,
          name:req.body.name,
          address: req.body.address,
          description:req.body.description,
          image: req.body.image ,
        };
        
      }
      console.log("hereeeeeeeeeeeeee edit",newQest);

      Qestion.updateOne({_id:req.params.id},newQest).then(()=>{
        res.status(200).json({ message:"qest added sucssefuly" });
       });
      
    } catch (err) {
      console.log(err);
      res.status(400).json("Error: " + err);
    }
  });

  
  //get Qest by id
  router.route("/getById/:id").get(async (req, res) => {
    Qestion.findOne({_id:req.params.id}).then((findedObject)=>{
    if (findedObject) {
      res.status(200).json({ qest: findedObject });
    }
  })
  });
  
module.exports = router;