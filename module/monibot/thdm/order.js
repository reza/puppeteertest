const common = require('./../common.js');
const pg = require('./pg.js');
const logger = require('./../../util/logger.js');
const moduleName = "ORDER :: ";

module.exports = async function(param){
  try{
    var browser = param.browser;
    var page = param.page;

    logger.debug(moduleName + "ORDER 페이지를 캡처했습니다.");

/*

$(".od-section-body .credit > a").click(); $("#card_07").click(); $("#ordAgreeChk").click(); order(this);

*/
    async function selectCard(){
      await page.evaluate(function(){$(".od-section-body .credit > a").click(); $("#card_07").click(); $("#ordAgreeChk").click(); order(this);})
      //await page.click(".od-section-body .credit > a");
      console.log("카드선택");
      //await page.waitFor(1000);
      //await page.click("#card_07");
      //console.log("신한카드");
      //await page.waitFor(2000);
    }
    async function agree(){
      //await page.click("label[for='ordAgreeChk']");
    //  console.log("동의");
      //await page.waitFor(2000);
    }
    async function runOrder(){
    //  console.log("자바스크립트 실행");
    //  await page.evaluate(function(){order(this);})
    }


    //Main
    await page.waitFor(3000);
        await common.screenshot(page,param.datapath+"order.jpg",{
          title:"TheHyundai Mobile Detail Module",
          date: param.datetime,
          platform: param.platform,
          phase: 0
        });
    selectCard();
    agree();
    runOrder();

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
            logger.debug(moduleName + "결제 모듈을 호출합니다!");
            await pg.shinhan(page,param);


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
