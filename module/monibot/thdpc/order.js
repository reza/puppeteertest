const common = require('./../common.js');
const pg = require('./pg.js');
const logger = require('./../../util/logger.js');
const moduleName = "ORDER :: ";

module.exports = async function(param){
  try{
    var browser = param.browser;
    var page = param.page;


    await common.screenshot(page,param.datapath+"order.jpg",{
      title:"TheHyundai PC Order Module",
      date: param.datetime,
      platform: param.platform,
      phase: 0
    });
    logger.debug(moduleName + "ORDER 페이지를 캡처했습니다.");

    await page.click(".pay-method.card [for='card_02']",{delay:250});
    logger.debug(moduleName + "ORDER 페이지 결제수단 선택! 1");

    await page.click(".agree.text-center [type='checkbox']",{delay:250});
    logger.debug(moduleName + "동의를 체크했습니다.");

    await page.click(".ctrl > .btn.color2.size7",{delay:250});
    logger.debug(moduleName + "결제를 시작합니다!");
    await page.evaluate(function(){
      setTimeout(function(){

        try{
          selectGift();
        }catch(e){

        }


      },1000)
    })
    /*
    await page.waitFor(1000);
    var giftSelectionData = await page.evaluate(function(){
      return $("#giftSelection").html();
    })
    if(giftSelectionData !== ""){
      await page.evaluate(function(){
        selectGift();
      })
    }*/


    await browser.once('targetcreated',async target=>{
      try{

        const popup = await target.page();
        // 신한카드 결제 (패스워드)

        await popup.on('error',()=>{
          common.error(param.datapath,popup)
        })

        logger.debug(moduleName + "결제 모듈을 호출합니다!");
        await pg.shinhan(popup,param);

      }catch(e){
        console.log(moduleName+" :: 에러발생!");
        common.error(page,param.datapath+"/PayError2.jpg",
          {
            "title"         : "주문 페이지 에러2",
            "date"          : param.datetime,
            "platform"      : param.platform,
            "phase"         : 0,
            "errorMessage"  : e.toString(),
            "consoleMessage": "",
          }
        )
      }
    })
  }catch(e){
    console.log(moduleName+" :: 에러발생!");
    common.error(page,param.datapath+"/PayError1.jpg",
      {
        "title"         : "주문 페이지 에러1",
        "date"          : param.datetime,
        "platform"      : param.platform,
        "phase"         : 0,
        "errorMessage"  : e.toString(),
        "consoleMessage": "",
      }
    )
  }
}
