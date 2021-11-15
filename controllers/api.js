const fs = require('fs');

exports.getModels = async (req,res,next) => {
    var dir = "./modelfiles/scs";
    var files = fs.readdirSync(dir);
    let outputFiles = [];
    files.forEach(function(file) {
        outputFiles.push(file.split(".")[0]);
      } );
    res.json(outputFiles);
};

exports.getSCS = async(req,res,next) => {
    var data = fs.readFileSync('./modelfiles/scs/' + req.params.modelname + ".scs");
    res.send(Buffer.from(data));
};

exports.getPNG = async(req,res,next) => {
    var data = fs.readFileSync('./modelfiles/png/' + req.params.modelname + ".png");
    res.send(Buffer.from(data));
};
