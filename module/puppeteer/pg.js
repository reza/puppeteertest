const logger = require('./../util/logger.js');
const moduleName = "PG :: ";

exports.shinhan = function(popup,param){
  var password = param.data.credit.password;
  popup.once('load',async ()=>{

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
              await popup.screenshot({path:param.datapath+"card.png"});
              logger.debug(moduleName+"페이지를 캡처했습니다.");
            })
          })
        })
      })
    })
  })

}
