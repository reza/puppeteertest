const common = require('./../common.js');
const logger = require('./../../util/logger.js');
const moduleName = "PG :: ";

exports.shinhan = async function(popup,param){

    var screenshotSetting = {
      title:"HMALL PG Module",
      date: param.datetime,
      platform: param.platform,
      phase: 0
    }

    //pay(popup,param);
    try{
      await logger.debug(moduleName+"결제모듈 대기 3초!");
      await popup.waitFor(3000);
      await common.screenshot(popup,param.datapath+"card.jpg",screenshotSetting);
      await param.telegram.sendMessage("페이지 정상 작동!");
      //await common.report();
      await param.browser.close();
      await common.restart();
    }catch(e){
      common.error(popup,param.datapath+"/PGError.jpg",
        {
          "title"         : "상세페이지 에러",
          "date"          : param.datetime,
          "platform"      : param.platform,
          "phase"         : 0,
          "errorMessage"  : e.toString(),
          "consoleMessage": "",
        }
      )
    }

}

function pay(popup,param){
  var password = param.data.credit.password;
  popup.once('load',async ()=>{
    await popup.click(".np_parts1_float2 .np_float_cont:last-child a",{delay:250});
    logger.debug(moduleName+"패스워드 모드를 실행합니다.");

    popup.once('load',async ()=>{
      await popup.click(".new_style_btn .d_gray",{delay:250});
      logger.debug(moduleName+"패스워드를 입력중입니다.");

      popup.once('load',async()=>{
        popup.once('load',async()=>{
          await popup.evaluate(pass=>{
            jQuery(".tarenTable input[type='password']").val(pass);
            doSubmit();
          },password);
          popup.once('load',async()=>{
            await popup.evaluate(()=>{
            //  doSubmit();
            })
            await logger.debug(moduleName+"결제 완료!");
            await common.screenshot(popup,param.datapath+"card.jpg");
            logger.debug(moduleName+"페이지를 캡처했습니다.");
          })
        })
      })
    })
  })
}
