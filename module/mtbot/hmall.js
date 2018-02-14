const common = require('./common.js');
const order = require('./order.js');
const logger = require('./../util/logger.js');
const moduleName = "HMALL :: ";



module.exports = async function(param){
  var browser = param.browser;
  var page = param.page;
    var screenshotSetting = {
      title:"HMALL Main Module (Login)",
      date: param.datetime,
      platform: param.platform,
      phase: 0
    }

    page.on('console',async msg=>{
      console.log(param.page.url());
      console.log(moduleName+"consoleMessage");
      await common.consolelog(page,param.datapath+"/hmallConsoleError.jpg",
        {
          "title"         : "콘솔 에러",
          "date"          : param.datetime,
          "platform"      : param.platform,
          "phase"         : 0,
          "errorMessage"  : "",
          "consoleMessage": moduleName+msg.text(),
          "url"  : page.url()
        }
      )
    })

    await page.once('load',async()=>{
      try{
        page.on("pageerror",async msg=>{
          console.log(param.page.url());
            console.log(moduleName+"pageerror");
            await common.consolelog(page,param.datapath+"/hmallPageError.jpg",
              {
                "title"         : "콘솔 에러",
                "date"          : param.datetime,
                "platform"      : param.platform,
                "phase"         : 0,
                "errorMessage"  : "",
                "consoleMessage": moduleName+msg.text(),
                "url"  : page.url()
              }
            )
        })

        logger.debug(moduleName + "로그인 이후 홈페이지로 돌아왔습니다.");

        await common.screenshot(page,param.datapath+"site_Logined.jpg",screenshotSetting);
        logger.debug(moduleName + "로그인 이후 메인페이지 캡처완료!");

        logger.debug(moduleName + "임의의 페이지로 접속을 시도합니다.");
        var a = await page.evaluate(async ()=>{
          return $('a[href*="/front/pda/itemPtc.do"]')[Math.floor(Math.random()*$('a[href*="/front/pda/itemPtc.do"]').length)].href;
        })
        await common.sendMessage("접근을 시도합니다!");

        await page.goto(a).then(async()=>{
//    await page.$('a[href*="/front/pda/itemPtc.do"]').click().then(async()=>{
          try{
            logger.debug(moduleName + "상품페이지로 접속하였습니다.");

            await common.screenshot(page,param.datapath+"detail.jpg",screenshotSetting);
            logger.debug(moduleName + "상품페이지 캡처!");


            await page.click("#itemCalcForm a[onclick*='buyDirect'] img");
            await page.click("#itemCalcForm a[onclick*='buyDirect'] img");
            logger.debug(moduleName + "바로구매 버튼을 클릭했습니다!");

          }catch(e){
            common.error(page,param.datapath+"/detail2Error.jpg",
              {
                "title"         : "상세페이지 에러",
                "date"          : param.datetime,
                "platform"      : param.platform,
                "phase"         : 0,
                "errorMessage"  : e.toString(),
                "consoleMessage": "",
                "url"  : page.url()
              }
            )
          }
          await page.once('load',async()=>{
            logger.debug(moduleName + "ORDER모듈을 실행합니다.");
            order(param);
          });
        })

      }catch(e){
        common.error(page,param.datapath+"/detail1Error.jpg",
          {
            "title"         : "상세페이지 에러",
            "date"          : param.datetime,
            "platform"      : param.platform,
            "phase"         : 0,
            "errorMessage"  : moduleName+e.toString(),
            "consoleMessage": "",
          }
        )
      }


    })
}
