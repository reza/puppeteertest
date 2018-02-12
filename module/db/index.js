const mysql = require("mysql");
const logger = require('./../util/logger.js');
const moduleName = "DB :: ";
//import datemanager from "hdatemanager.js"
const con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'hmall2143',
  database:'mt'
});

exports.insert = async (param) => {
  var tablename = param.tablename,
      attrnames = param.attrnames,
      records = param.records;

  var sql = "insert into "+tablename+"("+attrnames+") values ?"
  console.log(moduleName+" : 접근 시도중!")
  await con.query(sql,[records],function(err,result){
    if(!err) console.log(err);
    console.log(moduleName+" : 반영 완료!")
  })
}
