var express = require("express");
var router = express.Router();
var util = require("../lib/util");
let mysql = require("../lib/mysql.js");
var mybatisMapper = require("mybatis-mapper");

mybatisMapper.createMapper(["./mapper/member.xml"]);

router.get("/", function (req, res, next) {
  var param = {
    id: req.query.id,
  };

  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    "MemberMapper",
    "readMember",
    param,
    format
  );
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  mysql.db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }
    var string = JSON.stringify(results[0]);
    var string2 = util.snakeToCamel(string);
    res.send(string2);
  });
});

router.post("/signup", function (req, res) {
  var param = req.body;
  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    "MemberMapper",
    "createMember",
    param,
    format
  );
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  mysql.db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }
    var string = JSON.stringify(results);
    var string2 = util.snakeToCamel(string);
    res.send(string2);
  });
});

router.post("/login", function (req, res) {
  //조회할 파라미터
  var param = req.body;

  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    "MemberMapper",
    "loginMember",
    param,
    format
  );
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  mysql.db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }
    res.send(results[0].member_name);
  });
});

router.put("/edit", function (req, res, next) {
  var param = req.body;

  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    "MemberMapper",
    "updateMember",
    param,
    format
  );
  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

  mysql.db.query(query, function (error, results, fields) {
    //조회
    if (error) {
      console.log(error);
    }
    var string = JSON.stringify(results);
    var string2 = util.snakeToCamel(string);
    res.send(string2);
  });
});

router.delete("/", function (req, res, next) {});

router.options("/", function (req, res, next) {
  //  res.send('respond with a resource');
  res.send(" ");
});

module.exports = router;
