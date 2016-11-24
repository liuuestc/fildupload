//测试文件，不正式使用

var formidable = require('formidable'),
    http = require('http'),  
    sys = require('sys'),
    fs =require('fs');
http.createServer(function(req, res) {  
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {  
        // parse a file upload
        //console.log(req);
        var form = new formidable.IncomingForm();  
        form.encoding = 'utf-8';		//设置编辑
    	form.uploadDir = 'upload/' 	 //设置上传目录
    	form.keepExtensions = true;	 //保留后缀
    	form.maxFieldsSize = 200 * 1024 * 1024;   //文件大小
        //这里formidable会对upload的对象进行解析和处理  
        form.parse(req, function(err, fields, files) {  
	         console.log(files.upload.name);
            res.writeHead(200, {'content-type': 'text/plain'});  
            res.write('received upload!\n\n');
            //console.log(files.upload.path);
            fs.renameSync(files.upload.path,form.uploadDir+files.upload.name);
            res.end('upload down!');
        });  
        return;  
    }  
  
    // show a file upload form  
    res.writeHead(200, {'content-type': 'text/html'});  
    res.end(  
        '<form action="/upload" enctype="multipart/form-data" '+  
            'method="post">'+  
            '<input type="text" name="title"><br>'+  
            '<input type="file" name="upload" multiple="multiple"><br>'+  
            '<input type="submit" value="Upload">'+  
            '</form>'  
    );  
}).listen(8888);  
