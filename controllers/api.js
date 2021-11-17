const fs = require('fs');
const path = require('path');


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


exports.getAllCacheFiles = async(req,res,next) => {
    var files = findAllFiles();
    res.json(files);    
};


function findAllFiles(dir) {
    var results = [];
    walk("./public", results);
    for (var i = 0; i < results.length; i++) {
        results[i] = results[i].substring(results[i].indexOf("public") + 7);
        results[i] = "/" + "./" + replaceAll(results[i], "\\", "/");
    }
    return results;
}


function walk(dir, results) {
    var list = fs.readdirSync(dir);
    var pending = list.length;
    if (!pending) return;
    list.forEach(function (file) {
        file = path.resolve(dir, file);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file, results);
            if (!--pending) return;

        } else {
                results.push(file);
            if (!--pending) return;
        }
    });
}


function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}
