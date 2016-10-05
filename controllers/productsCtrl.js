const Products = require('../models/Product')
    , ObjectId = require('mongoose').Schema.ObjectId;


module.exports = {
  create: function(req, res, next) {
    Products.create(req.body, function(err, r) {
      if (err) {
        console.log(err)
        return res.status(500).send();
      }
      res.status(200).json(r);
    })
  },

  index: function(req, res, next) {
    Products.find(function(err, r) {
      if (err) {
        console.log(err)
        res.status(500).send();
      }
      res.status(200).json(r);
    })
  },

  show: function(req, res, next) {
    Products.findOne({_id: req.params.id}, function(err, r) {
      if (err) {
        console.log(err)
        return res.status(500).send();
      }
      return res.status(200).json(r);
    })
  },

  update: function(req, res, next) {
    delete(req.body._id);
    Products.update({_id: req.params.id}, {$set: req.body}, function(err, r) {
      if (err) {
        console.log(err)
        return res.status(500).send();
      } else {
        return res.status(200).json(r)
      }
    })
  },

  delete: function(req, res, next) {
    Products.remove({_id: req.params.id}, function(err, r) {
      if (err) {
        console.log(err)
        return res.status(500).send();
      }
      return res.status(200).json(r);
    })
  }
}
