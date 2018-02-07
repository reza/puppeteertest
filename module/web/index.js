const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('.'));

app.get("/",(req,res)=>{
  var result = "";
  fs.readdirSync("./hmall/").forEach(file => {
    result += "<img src= './"+file+"/pc/site_Logined.png'/><br>"
  })
  res.send(result);
})
app.get("/hmall/:date/:hour",(req,res)=>{
  var result = "";
  /* 1. CHECK */
  if(req.params.date == "" || req.params.hour == ""){
    res.send("Invalid Parameter");
    return;
  }
  /* 2. RUN */
  fs.readdirSync("./hmall/").forEach(file => {
    var datetime = file;
    var date = file.substr(0,8)*1;
    var time = file.substr(8,6)*1;
    var hour = file.substr(8,2)*1;
    var min = file.substr(10,2)*1;
    if(req.params.date == date && req.params.hour == hour ){
      result += "<img src= '/hmall/"+file+"/pc/order.png'/><br>"
    }
  })
  res.send(result);
})

exports.app = app;
