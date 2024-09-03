const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Bds = new Schema({
    name : String,
    location: String,
    price: Number,
    S : String,
    name_person: String,
    contact: String,
    detail: String,
    type: String,
    image: [String],
    additionalImages: [String],
});


module.exports=mongoose.model('Bds',Bds);