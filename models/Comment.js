const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    id_lieu: { type: String , ref:"lieuTouristique"},
    id_user: { type: String, ref:"User"},
    comment: { type: String, required:true },
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;
