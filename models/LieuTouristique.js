const mongoose = require("mongoose");

const QestionSchema = mongoose.Schema(
  {
    name: String,
    address:String,
    description: String,
    image:String,
  }
);

const Qestion = mongoose.model("Qestion", QestionSchema);
module.exports = Qestion;




