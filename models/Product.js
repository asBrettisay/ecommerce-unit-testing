const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
  name: {type: String, unique: true, index: true},
  price: {type: String, required: true},
  description: {type: String, required: true, min: 0}
})

module.exports = mongoose.model('Product', productSchema);
