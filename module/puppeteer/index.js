const puppeteer = require('puppeteer');
const common = require('./common.js');

const login = require('./login.js');
const hmall = require('./hmall.js');

//Util
const dmr = require('./../util/datemanager.js');
const fs = require('fs');
const logger = require('./../util/logger.js');

const USERINFO = require('./../../userinfo.js').data; // NEED

/*
USERINFO 예제를 참고할 것

exports.data = {
  id:"ID",
  password:"PASSWORD",
  credit : {
    password : "PASSWORD"
  }
}

*/

exports.run = function(parameter){
  puppeteer.launch({
    headless:false,
    args: ['--no-sandbox', '--disable-setuid-sandbox','--enable-file-cookies']
  }).then(async browser => {
    var page = await browser.newPage();
    console.log(dmr);
    var DateManager = dmr.DateManager;
    var date = new DateManager();
    var datapath;
    datapath = "./hmall/"+date.text+"/";
    await fs.mkdirSync(datapath,0777);
    await fs.mkdirSync(datapath+"/pc/",0777);
    await fs.mkdirSync(datapath+"/mobile/",0777);
    await page.setViewport({width:1200,height:800});

    await page.goto('http://www.hyundaihmall.com/Home.html',{waitUntil:"domcontentloaded"});
    await page.once('load',async ()=>{
      await common.screenshot(page,datapath+"/pc/"+"site.jpg");
      await page.evaluate(()=>{
        openLoginPopup()
      })

      var param = {
        "browser" : browser,
        "page" : page,
        "data" : USERINFO,
        "folder" : date.text,
        "datapath" : datapath+"/pc/",
        "telegram" : parameter.telegram
      }
      logger.debug("INIT :: 로그인을 시작합니다.");
      await login.run(param, hmall.main);
    })
  });
}
