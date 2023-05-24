const router = require("express").Router();
let LieuTouristique = require("../models/LieuTouristique.js") 

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

  // x.jpg ==> x-25488522000-lieu.jpg >
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-lieu-" + "." + extension;
    cb(null, imgName);
  },
});

// add une Lieu touristique
router.route("/add").post(multer({ storage: storage }).single("image"), async (req, res) => {
   let url = req.protocol + "://" + req.get("host");

    try {
      const newLieuTouristique = new LieuTouristique({
        name:req.body.name,
        address: req.body.address,
        description:req.body.description,
        image:url + "/images/"+req.file.filename,
      });
       newLieuTouristique.save().then(()=>{
        res.status(200).json({ message:"lieu added sucssefuly" });
       });
      
      
    } catch (err) {
      console.log(err);
      res.status(400).json("Error: " + err);
    }
  });

//  get All Lieux
router.route("/get").get(async (req, res) => {
  try {
    const Lieu = await LieuTouristique.find();
    console.log("here lieuuuuuu",Lieu);
    res.status(200).json({ lieu:Lieu });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

  //Delete by ID Method
  router.delete('/delete/:id', async (req, res) => {
  LieuTouristique.deleteOne({_id:req.params.id}).then(()=>{
    res.status(200).json({
      message:"deleted success"
    })
  })
})

  // edit lieux touristique par nom
  router.put('/edit/:id',multer({ storage: storage }).single("image"), (req, res) => {
    let url = req.protocol + "://" + req.get("host");

   let newLieu 
    try {
      if (req.file) {
        newLieu = {
          _id:req.params.id,
          name:req.body.name,
          address: req.body.address,
          description:req.body.description,
          image:url + "/images/"+req.file.filename,
        };
        
      } else {
        newLieu = {
          _id:req.params.id,
          name:req.body.name,
          address: req.body.address,
          description:req.body.description,
          image: req.body.image ,
        };
        
      }
      console.log("hereeeeeeeeeeeeee edit",newLieu);

      LieuTouristique.updateOne({_id:req.params.id},newLieu).then(()=>{
        res.status(200).json({ message:"lieu added sucssefuly" });
       });
      
    } catch (err) {
      console.log(err);
      res.status(400).json("Error: " + err);
    }
  });

  
  //get lieux by id
  router.route("/getById/:id").get(async (req, res) => {
  LieuTouristique.findOne({_id:req.params.id}).then((findedObject)=>{
    if (findedObject) {
      res.status(200).json({ lieu: findedObject });
    }
  })
  });
  
module.exports = router;