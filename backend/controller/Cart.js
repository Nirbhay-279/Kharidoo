const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate(
      "products.product"
    );

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  console.log(req.body);
  const cart = new Cart({ ...req.body });

  try {
    const cartItems = await Cart.find({ user: req.body.user }).populate(
      "products.product"
    );
    console.log(cartItems);
    if (cartItems.length>0) {
      const cart = await Cart.findOneAndUpdate({user: req.body.user}, req.body, {
        new: true,
      });
      const result = await cart.populate("products.product");
      res.status(200).json(result);
    }
    else{
      const doc = await cart.save();
      const result = await doc.populate("products.product");
      const result2 = await result.populate("user");
      res.status(201).json(result2);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("products.product");

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
