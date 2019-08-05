const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require('multer');

const Upload = new Schema (

);

module.exports = mongoose.model("upload", Upload);