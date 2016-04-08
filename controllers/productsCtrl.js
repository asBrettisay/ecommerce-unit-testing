var mongojs = require('mongojs'),
    config = require('../_config');
var db = mongojs(config.mongoURI[process.env.NODE_ENV]),
    Products = db.collection('products'),
    ObjectId = mongojs.ObjectId;


module.exports = {
  create: function(req, res, next) {
    Products.insert(req.body, function(err, r) {
      if (err) {
        console.log(err)
        res.status(500).send();
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
    Products.find({_id: ObjectId(req.params.id)}, function(err, r) {
      if (err) {
        console.log(err)
        res.status(500).send();
      }
      res.status(200).json(r);
    })
  },

  update: function(req, res, next) {
    delete(req.body._id);
    Products.update({_id: ObjectId(req.params.id)}, {$set: req.body}, function(err, r) {
      if (err) {
        console.log(err)
        res.status(500).send();
      } else {
        res.status(200).json(r)
      }
    })
  },

  delete: function(req, res, next) {
    Products.remove({_id: ObjectId(req.params.id)}, function(err, r) {
      if (err) {
        console.log(err)
        res.status(500).send();
      }
      res.status(200).json(r);
    })
  }
}
