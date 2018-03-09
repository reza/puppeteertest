const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const common = require('./../common.js');

const login = require('./login.js');
const hmall = require('./hmall.js');

//Util
const dmr = require('./../../util/datemanager.js');
const fs = require('fs');
const logger = require('./../../util/logger.js');

const USERINFO = require('./../../../userinfo.js').data; // NEED

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

module.exports = function(parameter){
  puppeteer.launch({
    headless:false,
//    devtools:true,
    args: ['--no-sandbox', '--disable-setuid-sandbox','--enable-file-cookies']
  }).then(async browser => {
    var page = await browser.newPage();
    var DateManager = dmr.DateManager;
    var date = new DateManager();
    var datapath;
    datapath = "./hmall/"+date.text+"/";
    await fs.mkdirSync(datapath,0777);
    await fs.mkdirSync(datapath+"/pc/",0777);
    await fs.mkdirSync(datapath+"/mobile/",0777);
    await page.emulate(iPhone);

    await page.on('dialog',dlg=>{
      //dlg.dismiss();
    })
    await page.on('pageerror',async msg=>{
      console.log("MAIN :: pageerror");
      await common.consolelog(page,gParam.datapath+"/MainError.jpg",
        {
          "title"         : "콘솔 에러",
          "date"          : gParam.datetime,
          "platform"      : gParam.platform,
          "phase"         : 0,
          "errorMessage"  : "",
          "consoleMessage": "MAIN :: "+msg.text(),
          "url"  : page.url()
        }
      )
    })
    await page.goto('http://www.hyundaihmall.com/Home.html',{waitUntil:"domcontentloaded"});

    await page.once('load',async ()=>{

      var param = {
        "browser" : browser,
        "page" : page,
        "data" : USERINFO,
        "platform" : "pc",
        "folder" : date.text,
        "datetime" : date.datetime,
        "datapath" : datapath+"pc",
        "telegram" : parameter.telegram
      }

      gParam = param;
      var screenshotSetting = {
        title:"HMALL Main Module",
        date: param.datetime,
        platform: param.platform,
        phase: 0
      }

      try{
        await common.screenshot(page,datapath+"/pc/"+"site.jpg",screenshotSetting);

        await page.evaluate(()=>{
          //openadsfaf();
          openLoginPopup();
        })

        logger.debug("INIT :: 로그인을 시작합니다.");
        await login(param, hmall);
      }catch(e){
        common.error(page,param.datapath+"/MainError.jpg",
          {
            "title"         : "메인 페이지 에러",
            "date"          : param.datetime,
            "platform"      : param.platform,
            "phase"         : 0,
            "errorMessage"  : e.toString(),
            "consoleMessage": "",
            "url"  : page.url()
          }
        )
      }
    })
  });
}
