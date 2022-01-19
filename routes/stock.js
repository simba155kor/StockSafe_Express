const express = require('express');
const router = express.Router();
const mybatisMapper = require("mybatis-mapper");
const url_module = require("url");
const mysql = require("../lib/mysql.js");
const util = require("../lib/util.js");


const SUCCESS = "success";
const FAIL = "fail";


mybatisMapper.createMapper(["./mapper/stock.xml"]);
let db = mysql.db;

/* createStock */
router.post('/', function(req, res, next) {
  console.log("createStock은 비어있음");
});

/* readStockDetail */
router.get('/', function(req, res, next) {
  //조회할 파라미터
  let param = {
    id: req.query.id  };

  //질의문 형식
  let format = { language: "sql", indent: "  " };
  let query = mybatisMapper.getStatement(
    "StockMapper",
    "readStockDetail",
    param,
    format
  );
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  //해당쿼리가 조합된 것을 볼 수 있다.
  //console.log(query);

  db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }

    res.writeHead(200, this.headers);
    let string = JSON.stringify(results[0]);
    let string2 = util.snakeToCamel(string);
    res.write(string2);

    res.end();
  });
});

/* readStockAll */
router.get('/searchAll', function(req, res, next) {
  let param = {
    keyword: req.query.keyword,
  };

  //질의문 형식
  let format = { language: "sql", indent: " " };
  let query = mybatisMapper.getStatement(
    "StockMapper",
    "readStockAll",
    param,
    format
  );

  db.query(query, function (error, data) {
    if (data.length >= 1) {
      // success
      res.writeHead(200, this.headers);
      data = JSON.stringify(data);
      res.write(util.snakeToCamel(data));
      res.end();
    } else {
      // fail
      res.writeHead(204, this.headers);
      res.write(this.FAIL);
      res.end();
    }
  });
});

/* updateStock */
router.put('/updateStock', function(req, res, next) {
  console.log("updateStock 비어있음");
});

/* deleteStock */
// TODO : mystock, likestock등 외래키 설정 때문에 바로는 안지워진다.
// 연관된 mystock, likestock부터 지워야...
router.delete('/', function(req, res, next) {
  let param = {
    id: req.query.id,
  };

  let format = { language: "sql", indent: " " };
  let query = mybatisMapper.getStatement(
    "StockMapper",
    "deleteStock",
    param,
    format
  );

  db.query(query, function (error, results, field) {
    
    if (data.length === 1) {
      // success
      console.log("12");
      res.writeHead(200, this.headers);
      res.end();
    } else {
      // fail
      console.log("13");
      res.writeHead(204, this.headers);
      res.write(this.FAIL);
      res.end();
    }
  });
});


module.exports = router;
