const login = require('./module/puppeteer/login.js');
const hmall = require('./module/puppeteer/hmall.js');
const logger = require('./module/util/logger.js');
const dm = require('./module/util/datemanager.js');
const path = require('path');
const DataManager = dm.DateManager;

const fs = require('fs');

const puppeteer = require('puppeteer');
const USERINFO = {
  id:"ID",
  password:"PASSWORD",
  credit : {
    password : "PASSWORD"
  }
}
function puppeteerRun(){

  puppeteer.launch({
    headless:false,
    args: ['--no-sandbox', '--disable-setuid-sandbox','--enable-file-cookies']
  }).then(async browser => {
    var page = await browser.newPage();
    var date = new DataManager();
    var datapath;
    datapath = "./hmall/"+date.text+"/";
    await fs.mkdirSync(datapath,0777);
    await fs.mkdirSync(datapath+"/pc/",0777);
    await fs.mkdirSync(datapath+"/mobile/",0777);
    await page.setViewport({width:1200,height:800});

    await page.goto('http://www.hyundaihmall.com/Home.html',{waitUntil:"domcontentloaded"});
    await page.once('load',async ()=>{
      await page.screenshot({path:datapath+"/pc/"+"site.png",fullPage:true});
      await page.evaluate(()=>{
        openLoginPopup()
      })

      var param = {
        "browser" : browser,
        "page" : page,
        "data" : USERINFO,
        "folder" : date.text,
        "datapath" : datapath+"/pc/"
      }
      logger.debug("INIT :: 로그인을 시작합니다.");
      await login.run(param, hmall.main);
    })
  });
}

const express = require('express');
const app = express();
app.use(express.static('.'));
app.listen(9642,(req,res)=>{
  puppeteerRun()
  console.log("DONE!");
});
app.get("/",(req,res)=>{
  var result = "";
  fs.readdirSync("./hmall/").forEach(file => {
    result += "<img src= './"+file+"/pc/site_Logined.png'/><br>"
  })
  res.send(result);
})
app.get("/hmall/:date/:hour",(req,res)=>{
  var result = "";
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
