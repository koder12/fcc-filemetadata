var express = require("express");
var fs = require('fs');
var multer = require('multer');
var app = express();
var f = null;
var size = null;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', multer({ dest: './uploads'}).single('file'), function(req, res) {
    size = req.file.size;
    fs.unlink('./uploads/'+req.file.filename, function(err){
        console.log(err);
    });
    res.redirect('/get-file-size');
})

app.get('/get-file-size', function(req, res){
    if(size != null){
        res.json({size: size});
        size = null;
    }
    else {
        res.json({msg: 'First upload the file to get size!!!'});
    }
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});