var multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'static/upload_images/')
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    }
  });
  
  var upload = multer({
    storage: storage
}).array("myimage",6); //Field name and max count

module.exports=upload;