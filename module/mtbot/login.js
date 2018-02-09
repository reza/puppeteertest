const common = require('./common.js');
const logger = require('./../util/logger.js');

const moduleName = "LOGIN :: ";

  module.exports = async function(param,callback){
    await param.browser.once('targetcreated',async target=>{
      const popup = await target.page();
      popup.once('load',async ()=>{
        logger.debug(moduleName + "로그인 페이지를 로드하였습니다.");
        await popup.waitForSelector(".idway input.focus_input").then(async ()=>{

          // ID 입력
          logger.debug(moduleName + "ID 포커싱");
          await popup.click(".idway input",{delay:500});
          logger.debug(moduleName + "ID 입력중");
          await popup.type(".idway input",param.data.id,{delay:1});
          logger.debug(moduleName + "ID 입력완료!");


          // 패스워드 입력
          logger.debug(moduleName + "패스워드 포커싱");
          await popup.click(".pwdway input",{delay:500});
          logger.debug(moduleName + "패스워드 입력중");
          await popup.type(".pwdway input",param.data.password,{delay:1});
          logger.debug(moduleName + "패스워드 입력완료!");


          // 로그인 시도
          logger.debug(moduleName + "로그인을 시도합니다!");
          await popup.click(".btn_login")
          //await page.screenshot({path:"loginafter.jpg",fullPage:true});
          logger.debug(moduleName + "로그인완료!");
          try{
            // 로그인 이후
            logger.debug(moduleName + "완료! 콜백함수를 호출합니다.");
            await callback(param);
          }catch(e){
            logger.debug(moduleName + "로그인 실패");
            logger.debug(e);
          }
        })
      })
    })
  }
