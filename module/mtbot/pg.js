const common = require('./common.js');
const logger = require('./../util/logger.js');
const moduleName = "PG :: ";

exports.shinhan = function(popup,param){
  popup.once('load',async ()=>{
    //pay(popup,param);
    await logger.debug(moduleName+"결제모듈 대기 3초!");
    await popup.waitFor(3000);
    await common.screenshot(popup,param.datapath+"card.jpg");
    await param.telegram.sendMessage(moduleName+"페이지 정상 작동!");
    await param.browser.close();
  })

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
