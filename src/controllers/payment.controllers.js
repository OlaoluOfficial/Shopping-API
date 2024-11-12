const CartModel = require('../models/Product');
const mongoose = require('mongoose');

class Payment {
  checkout = async (req, res) => {
    const { user_id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await CartModel.findOne({ user_id }).populate('items.product_id');

      if (!cart) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      // Check stock availability and prepare stock deductions
      for (const item of cart.items) {
        const product = item.product_id;
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        // Deduct stock
        product.stock -= item.quantity;
        await product.save({ session });
      }

      // Clear the cart after successful checkout
      await CartModel.findOneAndDelete({ user_id });

      await session.commitTransaction();
      return res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: 'Checkout failed', error: error.message });
    } finally {
      session.endSession();
    }
  }
}

module.exports = Payment;