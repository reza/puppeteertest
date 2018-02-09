const common = require('./common.js');
const order = require('./order.js');
const logger = require('./../util/logger.js');
const moduleName = "HMALL :: ";



exports.main = async function(param){
  var browser = param.browser;
  var page = param.page;

  await page.once('load',async()=>{
    logger.debug(moduleName + "로그인 이후 홈페이지로 돌아왔습니다.");

    await common.screenshot(page,param.datapath+"site_Logined.jpg");
    logger.debug(moduleName + "로그인 이후 메인페이지 캡처완료!");

    logger.debug(moduleName + "임의의 페이지로 접속을 시도합니다.");
    await page.goto("http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2063720064&sectId=141253").then(async()=>{
      logger.debug(moduleName + "상품페이지로 접속하였습니다.");

      await common.screenshot(page,param.datapath+"detail.jpg");
      logger.debug(moduleName + "상품페이지 캡처!");

      await page.click("#itemCalcForm a[onclick*='buyDirect'] img");
      logger.debug(moduleName + "바로구매 버튼을 클릭했습니다!");

      await page.once('load',async()=>{
        logger.debug(moduleName + "ORDER모듈을 실행합니다.");
        order.run(param);
      });
    })
  })
}
