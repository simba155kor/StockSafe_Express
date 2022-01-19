const express = require('express');
const router = express.Router();
const mybatisMapper = require("mybatis-mapper");
const url_module = require("url");
const mysql = require("../lib/mysql.js");
const util = require("../lib/util.js");


const SUCCESS = "success";
const FAIL = "fail";


mybatisMapper.createMapper(["./mapper/reply.xml"]);
let db = mysql.db;


/* createReply */
router.post('/', function(req, res, next) {
  console.log("createReply 비어있음");
});

/* readAllReply */
router.get('/', function(req, res, next) {
  let param = {
     stockId : req.query.stockId
  }
  
  console.log(param);
  //질의문 형식
  let format = {language: 'sql', indent: '  '};
  let query = mybatisMapper.getStatement('ReplyMapper', 'readAllReply', param, format);
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  db.query(query, function (error, results, fields) {  //조회
    if (error) {
        console.log(error);
    }

    console.log(results);

    res.writeHead(200, this.headers);
    let string=JSON.stringify(results);
    let string2 =util.snakeToCamel(string);
    res.write(string2);
    
    res.end();
  });
});

/* updateReply */
router.put('/', function(req, res, next) {
  console.log("updateReply 비어있음");
});

/* deleteReply */
router.delete('/', function(req, res, next) {
  console.log("deleteReply 비어있음");
});

module.exports = router;
