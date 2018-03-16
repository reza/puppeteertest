const common = require('./../common.js');
const logger = require('./../../util/logger.js');

const moduleName = "LOGIN :: ";

  module.exports = async function(param,callback){
    await param.browser.once('targetcreated',async target=>{
      const popup = await target.page();



      popup.once('load',async ()=>{
        await popup.click("#tab li:nth-child(2)");
            logger.debug(moduleName + "로그인 페이지를 로드하였습니다.");
                try{
                  await common.screenshot(page,datapath+"site.jpg",{
                    title:"TheHyundai PC Login Module",
                    date: param.datetime,
                    platform: param.platform,
                    phase: 0
                  });

                  // ID 입력
                  logger.debug(moduleName + "ID 포커싱");
                  await popup.click("#login-tab-02 input[name='id']",{delay:500});
                  logger.debug(moduleName + "ID 입력중");
                  await popup.type("#login-tab-02 input[name='id']",param.data.id,{delay:1});
                  logger.debug(moduleName + "ID 입력완료!");


                  // 패스워드 입력
                  logger.debug(moduleName + "패스워드 포커싱");
                  await popup.click("#login-tab-02 input[name='pwd']",{delay:500});
                  logger.debug(moduleName + "패스워드 입력중");
                  await popup.type("#login-tab-02 input[name='pwd']",param.data.password,{delay:1});
                  logger.debug(moduleName + "패스워드 입력완료!");


                  // 로그인 시도
                  logger.debug(moduleName + "로그인을 시도합니다!");
                  await popup.click("#login-tab-02 form[name='memberLoginForm'] button.btn-login")
                  logger.debug(moduleName + "로그인완료!");
                  try{
                    // 로그인 이후
                    logger.debug(moduleName + "완료! 콜백함수를 호출합니다.");
                    await callback(param);
                  }catch(e){
                    logger.debug(moduleName + "로그인 실패");
                    logger.debug(e);
                  }

                }catch(e){
                  common.error(popup,param.datapath+"/LoginError.jpg",
                    {
                      "title"         : "로그인 에러",
                      "date"          : param.datetime,
                      "platform"      : param.platform,
                      "phase"         : 0,
                      "errorMessage"  : e.toString(),
                      "consoleMessage": "",
                    }
                  )
                }

      }) // load
    }) // targetcreated
  }
