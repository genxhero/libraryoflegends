const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatLine = new Schema(
  {
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    intelligence: { type: Number },
    wisdom: { type: Number },
    charisma: { type: Number }
  },
  { usePushEach: true }
);

const CharSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    firstName: { type: String },
    lastName: { type: String },
    class: { type: String },
    level: { type: Number },
    statline: { type: StatLine }
  },
  { usePushEach: true }
);

module.exports = mongoose.model("character", CharSchema);