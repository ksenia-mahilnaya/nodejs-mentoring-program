const Product = require('../models/Product');

module.exports = {
    getAllProducts: (req, res) => {
      Product.find((err, products) => {
        if (err) throw err;
        res.json(products);
      });
    },
    getProductById: (req, res) => {
      Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        res.json(product);
      });
    },
    getProductReviews: (req, res) => {
      Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        res.json(product.reviews);
      });
    },
    addNewProduct: (req, res) => {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        appName: req.body.appName,
        appVersion: req.body.appVersion,
        username: req.body.username,
        reviews: req.body.reviews
      });
    
      // product.schema.pre('save', function(next) {
      //   this.lastModifiedDate = new Date();
      //   next();
      // });
    
      product.save((err) => {
        if (err) throw err;
        console.log('Product saved successfully');
        res.json(product);
        });
    },
    deleteProduct: (req, res) => {
      Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) throw err;
        res.json(product);
      });
    }
};