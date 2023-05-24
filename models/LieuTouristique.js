const mongoose = require("mongoose");

const lieuTouristiqueSchema = mongoose.Schema(
  {
    name: String,
    address:String,
    description: String,
    image:String,
  }
);

const LieuTouristique = mongoose.model("lieuTouristique", lieuTouristiqueSchema);
module.exports = LieuTouristique;




