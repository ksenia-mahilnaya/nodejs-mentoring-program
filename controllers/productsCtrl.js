const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports = {
    getAllProducts: async (req, res) => {
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    getProductById: async (req, res) => {
      try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    getProductReviews: async (req, res) => {
      try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product.reviews);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    addNewProduct: async (req, res) => {
     try {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        appName: req.body.appName,
        appVersion: req.body.appVersion,
        username: req.body.username,
        reviews: req.body.reviews
      });

      await product.save();
      res.status(200).json(product);
      } catch (err) {
        res.status(500).send(err);
      }
    },
    deleteProduct: async (req, res) => {
      try {
        const product = await Product.findByIdAndRemove({ _id: req.params.id });
        res.status(200).json(product);
      } catch(err) {
        res.status(500).send(err);
      }
    }
};
