//Pain in the fucking ass. Fuck Mongoose. 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     username: {type: String},
     email: {type: String},
     characters: [{
         type: Schema.Types.ObjectId,
         ref: 'character'
     }]
});


UserSchema.statics.addChar = function (id, content) {
    const Char = mongoose.model('character');

    return this.findById(id)
        .then(user => {
            //User is the resulting user, the res
            const char = new Char({ content, user })
            user.characters.push(char)
            return Promise.all([char.save(), user.save()])
                .then(([char, user]) => user);
        });
}

UserSchema.statics.findChars = function (id) {
    return this.findById(id)
        .populate('characters')
        .then(user => user.characters);
}

mongoose.model("user", UserSchema);