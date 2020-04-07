const express = require('express');
const multer = require('multer');
const app = express();
const fs = require("fs");

var bodyParser = require('body-parser');


app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './uploadTmp/'}).array('image'));

app.get('/index.html', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/upload.html', function (req, res) {
	res.sendFile( __dirname + "/" + "upload.html" );
})


app.post('/file_upload', function (req, res) {

	console.log(req.files[0]);  // 上传的文件信息

	var des_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile( req.files[0].path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
			if( err ){
				console.log( err );
			}else{
				response = {
					message:'File uploaded successfully',
					filename:req.files[0].originalname
				};
			}
			console.log( response );
			res.end( JSON.stringify( response ) );
		});
	});
})

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})