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
                  }else if(dialogText.match("반품이 불가능")){
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
                })/*
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
    })*/

    await page.once('load',async()=>{
      try{
        /*
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
        })*/

        logger.debug(moduleName + "로그인 이후 홈페이지로 돌아왔습니다.");
        //await common.screenshot(page,param.datapath+"site_Logined.jpg",screenshotSetting);
        logger.debug(moduleName + "로그인 이후 메인페이지 캡처완료!");

        logger.debug(moduleName + "임의의 페이지로 접속을 시도합니다.");

        await page.waitFor(1000);
        var url = await page.evaluate(async ()=>{
          var itemList = $("#js-tpl-the-dream-dill a").map(function(a){return this.href});
          return itemList[Math.floor(Math.random() * itemList.length)];
        })
        //url = "http://m.thehyundai.com/front/pda/itemPtc.thd?slitmCd=2046496174&MainpageGroup=TheDreamDeal&GroupbannerName=TheDreamDeal_9";
        //url = "http://m.thehyundai.com/front/pda/itemPtc.thd?slitmCd=2046496174&MainpageGroup=TheDreamDeal&GroupbannerName=TheDreamDeal_9";
        await page.waitFor(1000);
        await common.sendMessage("모니터링을 위해 상세페이지로 접근합니다!\n");
      //  url = "http://m.thehyundai.com/front/pda/itemPtc.thd?slitmCd=2064652258&MainpageGroup=TheDreamDeal&GroupbannerName=TheDreamDeal_6";
        await page.goto(url,{waitUntil:"domcontentloaded"});
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2061104362&MainpageGroup=CateSect01&GroupbannerName=CateSect01_5_87914_0214"; // 품절
        //a='http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2060498356&MainpageGroup=CateSect01&GroupbannerName=CateSect01_3_87911_0218'; // 정적 셀럭트박스
        //a="http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064086386&MainpageGroup=TVSect&GroupbannerName=TVSect_2_87506_0206"; // 테스트
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2056663405&MainpageGroup=CateSect08&GroupbannerName=CateSect08_1_87691_0211"
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064536893&Main%20pageGroup=CateSect05&GroupbannerName=CateSect05_2_87912_0214"

        /*

        for(i=0;i<10;i++){ // 무한 반복을 하지 않기 위한 for문

        	if(GetSelectedItemCount()==0){
        		await page.click(GetSelectorOption(i));

        	}

        }


        */
        await page.once("load",async()=>{

        await common.screenshot(page,param.datapath+"detail.jpg",{
          title:"TheHyundai Mobile Detail Module",
          date: param.datetime,
          platform: param.platform,
          phase: 0
        });
          console.log("상세페이지 접근 완료!");
        await common.sendMessage(await page.url());
//    await page.$('a[href*="/front/pda/itemPtc.do"]').click().then(async()=>{
        const GetSelectorButton0 = () => ".product-option-layer-button .btn-order";

        const GetSelectorDoneButton0 = () => ".product-button .btn-order"

        const GetSelectorSelectedItemCount1 = () => ".selected-product .selected-uitm";

        const GetSelectorOption = select => "#productInfoDetailDl .selbox:nth-child("+(select+1)+") .opt-select-value a.ellips";
        const GetSelectorOptionDetail = select => "#productInfoDetailDl .selbox:nth-child("+(select+1)+") .opt-select-layer li > ul > li a";
        const GetSelectorOptionSelectLayer = select => "#productInfoDetailDl .selbox:nth-child("+(select+1)+") .opt-select-layer > li";

        const ListInvisible = function(){ return $(this).css("display") == "none"; };


        let GetCount = async function(selector){
          var result = await page.evaluate((sel)=>$(sel).length,selector);
          return result;
        }
        let removeListElement = async function(selector){
          await page.evaluate(function(sel){
            $(sel).filter(function(){ return $(this).attr("class") ? $(this).attr("class").match("type-soldout") !== null : false; }).remove();
            console.log("DONE2");
          },selector)
        }
        let attachOption = async function(selector,classname,indexNumber){
          await page.evaluate(function(sel,name,iNum){
            $(sel).each(function(idx){
              $(this).addClass(name+iNum+"-"+idx)
            })
            console.log("DONE2");
          },selector,classname,indexNumber)
        }

        // ACTION
        async function buttonClick(){
          await page.click(GetSelectorButton0());
        }
        async function DoneButtonClick(){
          await page.evaluate(function(){
            buyDirect(this);
          })
          /*
          if(await GetCount(GetSelectorDoneButton0()) > 0){
            await page.click(GetSelectorDoneButton1());
          }else{
            await page.click(GetSelectorDoneButton0());
          }*/
        }


        async function active_select(sel){
            console.log("클릭 : "+sel)
            await page.waitForSelector(sel);
            console.log("===============");
            var gso1 = await GetCount(sel);
            console.log(gso1);
            await page.waitFor(1000);
            await page.click(sel); // Click
        }

        async function click_select(sel,idx){
            await page.waitForSelector(sel);
            await removeListElement(sel,ListInvisible);
            await attachOption(sel,"monibot-option-class",idx)
            await page.waitFor(1000);
            console.log("===============");
            var gso2 = await GetCount(sel);
            console.log(gso2);
            await page.evaluate(function(){
              $(".opt-select-box").addClass("current");
            })
            await page.click(".monibot-option-class"+idx+"-"+0); // Click
        }
        buttonClick();
        for(i=0;i<10;i++){ // 무한 반복을 하지 않기 위한 for문

          await page.waitFor(1000);
          if(await GetCount(GetSelectorSelectedItemCount1()) == 0){
            //if(await GetCount(GetSelectorOption(i)) > 0){
              console.log("복합형!");
              // 복합형
              active_select(GetSelectorOption(i))
              await page.waitFor(1000);
              let SELyr = GetSelectorOptionSelectLayer(i);
              let selectCount = await GetCount(SELyr);
              console.log(SELyr);
              console.log(selectCount);
              if(selectCount > 1){
                console.log(SELyr+" ul > li > a");

                console.log("append");
                for(j=0;j<selectCount;j++){
                  await attachOption(SELyr+`:nth-child(${j+1}) ul > li > a`,"monibot-complex-option-class",j)
                  await page.waitFor(2000);
                  await page.waitFor(".monibot-complex-option-class"+j+"-"+0);
                  console.log(".monibot-complex-option-class"+j+"-"+0);
                  active_select(GetSelectorOption(i))
                  await page.evaluate(function(){
                    $(".opt-select-box").addClass("current");
                  })
                  await page.click(".monibot-complex-option-class"+j+"-"+0);
                }
              }else{
                click_select(GetSelectorOptionDetail(i),i);
              }


          //  }else{
          //    console.log("데이터가 선택되었습니다.");
          //    i=10;
          //  }

          }else{
            i=10;
          }


        }
        await DoneButtonClick();
        order(param);

        //await page.click("#btn_groupDetail button.btnOrange");


      /* 상품페이지 */
          try{

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
          //  order(param);
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
