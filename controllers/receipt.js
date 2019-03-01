var Receipt = require('../models/receipt');
var upload    = require('../libs/upload');
var receiptProcessor    = require('../libs/receipt');


exports.create = function (req, res, next) {

    upload(req, res,(error) => {
        if(error){
            res.redirect('/?msg=3');
        }else{
            if(req.file === undefined){

                res.redirect('/?msg=2');

            }else{

                /**
                 * Create new record in mongoDB
                 */
                var fullPath = "files/"+req.file.filename;


                receiptProcessor.analyze(function (result) {
                    var document = {
                        path:     fullPath,
                        result:   result
                    };

                    var receipt = new Receipt(document);
                    receipt.save(function(error){
                        if(error){
                            throw error;
                        }
                        res.redirect('/?msg=1');
                    });
                });
            }
        }
    });

};
