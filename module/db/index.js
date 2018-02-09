const mysql = require("mysql");
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
  await con.query(sql,[records],function(err,result){
    if(!err) console.log(err);
  })
}
