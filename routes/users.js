var express = require('express');
var router = express.Router();
var fs = require('fs');
var iconv = require('iconv-lite');
var db = require('../model/Student'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    dbUrl = 'mongodb://localhost/Student';
/* GET users listing. */

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/createDatabase', function(req, res){
  fs.readFile('abc.csv',function(err,files){
    if (!err){
      var data = iconv.decode(files,'gbk').split('\n');
      var  length = data.length;
      for (var i =1 ;i < length-1; i++){
        var tmp = data[i].split(',');
        Student.create({
            name : tmp[2].trim(),
            number : tmp[1].trim(),
            id : tmp[0].trim()
        },function(err,users){
          if(err){
            console.log(err)
            return;
          }else{
            console.log(users);
          }
        });
      }
      res.send(data);
    }
    else console.log(err);
  });
  console.log("File Reading!");
});

module.exports = router;
