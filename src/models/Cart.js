const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;