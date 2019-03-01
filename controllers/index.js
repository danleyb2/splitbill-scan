var Receipt = require('../models/receipt');

exports.index = function (req, res, next) {

    Receipt.find({})
        .sort({_id: -1})
        .exec(function (err, receipts) {
            if (err) return next(err);

            res.render('index', {title: 'Home', 'receipts': receipts});
        });

};
