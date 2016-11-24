var express = require('express');
var db1 = require('../model/Student'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    dbUrl = 'mongodb://localhost/Student';
/* GET users listing. */
mongoose.connect(dbUrl);

var router = express.Router();
var fs =require('fs'),
    formidable = require('formidable');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('upload', { title: '' });
});
router.get('/download', function(req, res) {
  res.download('../upload/','2.pdf');
});
router.get('/upload',function (req,res) {
  res.render('upload',{title: ''})
});
router.get('/uploaded',function (req,res) {
  res.render('upload',{title: '上传成功，继续上传文件'})
});
router.get('/failupload',function(req,res){
  res.render('upload',{title:'姓名和学号不符'});
});

router.get('/nofile', function (req, res) {
   res.render('upload',{title : '没有选择文件'}) ;
});

router.post('/upload',function (req,res) {
  //判断上传是否合法，检查学号和姓名
  //如果合法，则改变上传的状态

  //存储上传的文件
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'uploadHomework/' 	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 3 * 1024 * 1024;   //文件大小
    //这里formidable会对upload的对象进行解析和处理  
    form.parse(req, function(err, fields, files) {
      var newPath = form.uploadDir+fields.number+'_'+fields.name+'_'+fields.score;
      Student.update({
          name: fields.name,
          number: fields.number
          },
          {isLoad:true},
          function (err, student) {
         if(!err){
             if(student.n == 0){
                 res.redirect('/failupload');
             }else {
                 console.log(student);
                 fs.exists('newPath', function( exists ){
                     if(exists){
                         fs.unlink('newPath', function () {
                             console.log('success');
                         })
                     }
                 }) ;
                 if(files.upload.name == ''){
                     res.redirect('/nofile');
                 }
                 else {
                     fs.renameSync(files.upload.path,newPath);
                     res.redirect('/uploaded');
                 }
             }
         }else {
             res.send('请重试！')
         }
      });
    });
    return;
  }
});

module.exports = router;
