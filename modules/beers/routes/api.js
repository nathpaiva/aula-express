var express = require('express');
var router = express.Router();
var Controller = require('./../controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   Controller.retrieve(req, res);
// });
// Se não precisa fazer mais nada chama ela como callback
router.get('/', Controller.retrieve);
router.get('/:id', Controller.get);

router.post('/', Controller.create);

router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
