var express = require("express");
var router = express.Router();
var util = require("../lib/util");
let mysql = require("../lib/mysql.js");
var mybatisMapper = require("mybatis-mapper");

mybatisMapper.createMapper(["./mapper/news.xml"]);

var db = mysql.db;

/* GET users listing. */
router.get('/', function(req, res, next) {
        var param = {
          id: req.query.id,
        };

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "NewsMapper",
          "readStockNews",
          param,
          format
        );
        //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

        db.query(query, function (error, results, fields) {
          //조회
          if (error) {
            console.log(error);
          }
          var string = JSON.stringify(results);
          var string2 = util.snakeToCamel(string);
          res.send(string2);
        });
      });

router.post('/', function(req, res) {
  let body = req.body;

  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    "NewsMapper",
    "createNews",
    body,
    format
        );

  db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }
    var string = JSON.stringify(results);
    var string2 = util.snakeToCamel(string);
    res.send(string2);
    });
});

router.delete('/', function(req, res, next) {
        var param = {
          date: req.query.date,
        };

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "NewsMapper",
          "deleteNews",
          param,
          format
        );
        //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

        db.query(query, function (error, results, fields) {
          //조회
          if (error) {
            console.log(error);
          }
          var string = JSON.stringify(results);
          var string2 = util.snakeToCamel(string);
          res.send(string2);
        });
});

router.options('/', function(req, res, next) {
  //  res.send('respond with a resource');
  res.send(" ");
});


module.exports = router;
