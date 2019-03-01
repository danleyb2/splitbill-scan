var express = require('express');
var router = express.Router();

var receiptController = require('../controllers/receipt');

/* GET home page. */
// router.get('/list', receiptController.list);
router.post('/create', receiptController.create);

/*
// testing: curl "http://localhost:6001/receipt?img=1484656960352struk1.jpg&bucket=mdenny-bucket123"
app.get('/receipt', function(req, res){
    // example filename in google storage. i.e.: 1484656960352struk1.jpg
    var img = req.query.img;
    // bucket name in google storage.
    var bucket = req.query.bucket;
    receipt.analyze(bucket, img, function(result){
        res.json(result)
    });
});

*/

module.exports = router;
