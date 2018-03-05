const common = require('./../common.js');
const order = require('./order.js');
const logger = require('./../../util/logger.js');
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
    browser.on('targetcreated', async target=>{
      const popup = await target.page();
      try{
        await popup.click(".prodCareBtn a.btnType_orangenew");
      }catch(e){

      }
      await popup.on("load", async page=>{
        await popup.click(".prodCareBtn a.btnType_orangenew");
      })

        /*
      popup.on("load", async page=>{
        popup.click(".prodCareBtn a.btnType_orangenew");
      })*/
    })

        /*
            browser.on('dialog', async dlg=>{
              await console.log(dlg)
            })*/
                page.on('dialog', async dlg=>{
                  let dialogText = dlg.message();
                  if(dialogText.match("동일상품")){
                    dlg.dismiss();
                  }else if(dialogText.match("상품을 선택")){
                    dlg.dismiss();
                  }else{
                    dlg.dismiss();

                      common.error(page,param.datapath+"/AlertError.jpg",
                        {
                          "title"         : "얼럿 에러",
                          "date"          : param.datetime,
                          "platform"      : param.platform,
                          "phase"         : 0,
                          "errorMessage"  : dialogText,
                          "consoleMessage": "",
                          "url"  : page.url()
                        }
                      )
                  }
                })
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
          return $('a[href*="/front/pda/itemPtc.thd"]')[Math.floor(Math.random()*$('a[href*="/front/pda/itemPtc.thd"]').length)].href;
        })
        await common.sendMessage("접근을 시도합니다!\n"+a);
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2061104362&MainpageGroup=CateSect01&GroupbannerName=CateSect01_5_87914_0214"; // 품절
        //a='http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2060498356&MainpageGroup=CateSect01&GroupbannerName=CateSect01_3_87911_0218'; // 정적 셀럭트박스
        //a="http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064086386&MainpageGroup=TVSect&GroupbannerName=TVSect_2_87506_0206"; // 테스트
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2056663405&MainpageGroup=CateSect08&GroupbannerName=CateSect08_1_87691_0211"
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064536893&Main%20pageGroup=CateSect05&GroupbannerName=CateSect05_2_87912_0214"
        await page.goto(a).then(async()=>{
//    await page.$('a[href*="/front/pda/itemPtc.do"]').click().then(async()=>{

      /* 상품페이지 */
          try{
            logger.debug(moduleName + "상품페이지로 접속하였습니다.");

            await common.screenshot(page,param.datapath+"detail.jpg",screenshotSetting);
            logger.debug(moduleName + "상품페이지 캡처!");


            let select1 = await page.evaluate(async ()=>{
              return $('#productInfoDetailDl').length;
            })
            let select2 = await page.evaluate(async ()=>{
              return 0;//$('#productInfoDetailDl').length;
            })
            //page.$$(".sstpl_opt.pt15");
            if(select1 > 0 ){
               /* 셀렉트박스 1 */
               console.log("동적 셀렉트 영역이 존재합니다.");
               var beforePos = 0;
               var test = 0;
               beforePos = await page.evaluate(async ()=>{
                 return $('.sstpl_opt_selWrap .selbox').length;
               })

                await page.evaluate(async()=>{
                  $(".selbox li[data-stock='soldout']").remove()
                });// 품절 상품제거
                await page.click(".sstpl_opt_selWrap .selbox:last-child");
                await page.click(".sstpl_opt_selWrap .selbox:last-child .depth-opt-list li:last-child");
                for(i=0;i<10;i++){
                 await page.waitFor(1000);
                 var currentPos = await page.evaluate(async ()=>{
                   return $('.sstpl_opt_selWrap .selbox').length;
                 })
                 //await console.log(`currentPos : ${currentPos}`);
                 if((beforePos !== currentPos)){
                   await page.click(".sstpl_opt_selWrap .selbox:last-child");

                   await page.evaluate(async()=>{
                     $(".selbox li[data-stock='soldout']").remove()
                   });// 품절 상품제거
                   await page.waitFor(1000);
                   await page.click(".sstpl_opt_selWrap .selbox:last-child .depth-opt-list li:last-child");
                   beforePos = currentPos;
                 }else{
                   i=100;
                 }
                }
               /*// 셀렉트박스 1 */

               await page.evaluate(async()=>{
                 setTimeout(function(){
                   buyDirect();
                 },2000);
               })
               //await page.click(".sstpl_product_info_R .btnWrapA > a.btnBuy");

            }else if(select2 > 0){
               console.log("정적 셀렉트 영역이 존재합니다.");
               await page.evaluate(async ()=>{
                 $(".product_info_detailDL select option").each(function(){

                  	if($(this).val().match("품절")){
                  		$(this).remove()
                  	}
                  })

                  $(".product_info_detailDL select").each(function(){
                    $(this).val($(this).find("option")[$(this).find("option").length-1].value);
                    $(this).change();
                  })
               })
               await page.evaluate(async()=>{
                 setTimeout(function(){
                   buyDirect();
                 },2000);
               })
            }
            else{
               console.log("셀렉트 영역이 존재하지 않습니다.");
               await page.click("#itemCalcForm a[onclick*='buyDirect'] img");
               await page.click("#itemCalcForm a[onclick*='buyDirect'] img");
            }
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
