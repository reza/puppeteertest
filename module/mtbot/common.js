const db = require('./../db');
const dm = require('./../util/datemanager');

var DateManager = dm.DateManager;

const STATUS = {
  SUCCESS : 1,
  FAILED : -1
}

var messageList = [];

exports.screenshot = async function(page,path,param){
  await page.screenshot({"path":path,"fullPage":false,"quality":30,"type":"jpeg",
    "clip":{
        x:0,y:0,width:1183,height:2000
      }

  });
  await db.insert({
    tablename : "snap",
    attrnames : "title,filepath,datetime,platform,phase,status",
    records   : [
      [
        param.title,
        path,
        param.date,
        param.platform,
        param.phase,
        STATUS.SUCCESS
      ]
    ]
  });
}

exports.error = async function(page,path,error){
  console.log("에러발생!");
  await page.screenshot({"path":path,"fullPage":false,"quality":30,"type":"jpeg",
    "clip":{
        x:0,y:0,width:1183,height:2000
      }});
  await db.insert({
      tablename : "snap",
      attrnames : "title,filepath,datetime,platform,phase,status,errormessage,consolemessage",
      records   : [
        [
          error.title,
          path,
          error.date,
          error.platform,
          error.phase,
          STATUS.FAILED,
          error.errorMessage,
          error.consoleMessage
        ]
      ]
  });
  var cdate = new DateManager();
  if(error.errorMessage !== ""){
    await gParam.telegram.sendMessageWithImage(`현지 시간 : ${cdate.datetime}\n현재 URL : ${error.url} \n에러메시지 : ${convertError(error.errorMessage)}`,path);
  }
  if(error.consoleMessage !== ""){
    await gParam.telegram.sendMessageWithImage("현재 URL :"+error.url+"\n콘솔메시지 : "+error.consoleMessage,path);
  }
  await gParam.telegram.sendMessage("에러 발생! 모니터링 중단!!");
  await gParam.browser.close();
}

exports.sendMessage = async function(text){
  await gParam.telegram.sendMessage(text);
}

exports.consolelog = async function(page,path,error){
  console.log("콘솔");
  await page.screenshot({"path":path,"fullPage":false,"quality":30,"type":"jpeg",
    "clip":{
        x:0,y:0,width:1183,height:2000
      }});
  await db.insert({
      tablename : "snap",
      attrnames : "title,filepath,datetime,platform,phase,status,errormessage,consolemessage",
      records   : [
        [
          error.title,
          path,
          error.date,
          error.platform,
          error.phase,
          STATUS.FAILED,
          error.errorMessage,
          error.consoleMessage
        ]
      ]
  });
  await messageList.push(error.url+"\n콘솔메시지 : "+error.consoleMessage);
  /*
  if(error.errorMessage !== ""){
    await gParam.telegram.sendMessageWithImage("에러메시지 : "+error.errorMessage,path);
  }
  if(error.consoleMessage !== ""){
    await gParam.telegram.sendMessageWithImage("콘솔메시지 : "+error.consoleMessage,path);
  }*/
//  await gParam.browser.close();
}
function convertError(text){
  if(text.match("No node found for selector")){
    return "ㅠㅠ MT봇이 버튼을 찾지 못했습니다."
  }

}
async function report(){
  //var result = "[ 결과 보고 ]\n";
  //for(var i=0;i<messageList.length;i++){
  //    result += messageList[i]+"\n";
  //}
  var cdate = new DateManager();
  result += cdate.datetime+" 정상작동!!"
  await gParam.telegram.sendMessage(result);
  await gParam.browser.close();
}
exports.report = report;
