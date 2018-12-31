//Pain in the fucking ass. Fuck Mongoose. 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { 
      type: String,
      required: true
    },
    email: { 
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: "character"
      }
    ]
  },
  { usePushEach: true }
);


UserSchema.statics.addChar = function (id, args) {
    const Char = mongoose.model('character');

    return this.findById(id)
    .populate('character')
        .then(user => {
            //User is the resulting user, the res
            const char = new Char({ ...args, user })
            user.characters.push(char)
            return Promise.all([char.save(), user.save()])
                .then(([char, user]) => char);
        });
}

UserSchema.statics.findChars = function (id) {
    return this.findById(id)
        .populate('characters')
        .then(user => user.characters);
}


module.exports = mongoose.model("user", UserSchema);