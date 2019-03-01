const multer = require('multer');
const path   = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination: __dirname+'/../public/files',
    filename: function(req, file, fn){
        fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    }
});


var validateFile = function(file, cb ){
    let allowedFileTypes = /jpeg|jpg|png/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType  = allowedFileTypes.test(file.mimetype);
    if(extension && mimeType){
        return cb(null, true);
    }else{
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
};

//init

const upload =  multer({
    storage: storageEngine,
    limits: { fileSize:200000 },
    fileFilter: function(req, file, callback){
        validateFile(file, callback);
    }
}).single('photo');




module.exports = upload;
