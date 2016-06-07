const mongoose = require('mongoose')
    , Product  = require('../models/Product')
    , ObjectId = mongoose.Schema.ObjectId;


module.exports = {
  create: function(req, res, next) {
    new Product(req.body).save((e, r) => {
      if (e) {
        console.log(e)
        res.status(500).send();
      } else {
        res.status(200).json(r);
      }
    })
  },

  index: function(req, res, next) {
    Product.find((e, r) => {
      if (e) {
        res.status(500).send();
      } else {
        res.status(200).json(s);
      }
    })
  },

  show: function(req, res, next) {
    Product.findById(req.params.id, (e, r) => {
      if (e) {
        console.log(e)
        res.status(500).send();
      } else {
        res.status(200).json(r);
      }
    })
  },

  update: function(req, res, next) {
    Product.update({_id: ObjectId(req.params.id)}, req.body, (e, r) => {
      if (e) {
        console.log(e)
        res.status(500).send();
      } else {
        res.status(200).json(r)
      }
    })
  },

  delete: function(req, res, next) {
    Product.remove({_id: ObjectId(req.params.id)}, function(e, r) {
      if (e) {
        console.log(e)
        res.status(500).send();
      } else {
        res.status(200).json(r);
      }
    })
  }
}
