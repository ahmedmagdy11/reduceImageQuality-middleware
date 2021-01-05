const reduceQuality = require("./functions") 
function reduceImageQuality(req,res,next){
    if (!req.files){
        reduceQuality(req.file.path);
    }else{
        const paths = req.files.map((file)=>{
            return file.path;
        });
        reduceQuality(...paths);
    }
}

module.exports = reduceImageQuality;