var express = require('express');
var app = express();


const multer = require('multer');
const fs = require('fs');

app.get('/', function(req, res, next){
    res.send({
        success: true
    })
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload', multer({
    dest: 'upload'
}).single('image'), (req, res)=>{
    console.log(req.file);
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)

})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
