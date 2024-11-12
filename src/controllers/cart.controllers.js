const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');

class Cart {
  addItem = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
      const product = await ProductModel.findById(product_id);
  
      if (!product || product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
  
      const cart = await CartModel.findOne({ user_id });
      if (cart) {
        // If cart exists, update it
        const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id));
        if (itemIndex >= 0) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product_id, quantity });
        }
      } else {
        // Create a new cart
        const newCart = new CartModel({
          user_id,
          items: [{ product_id, quantity }]
        });
        await newCart.save();
        return res.status(201).json(newCart);
      }
      await cart.save();
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating cart', error });
    }
  }
}

module.exports = Cart