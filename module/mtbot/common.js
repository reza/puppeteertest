const db = require('./../db');

const STATUS = {
  SUCCESS : 1,
  FAILED : -1
}

exports.screenshot = async function(page,path,param){
  await page.screenshot({"path":path,"fullPage":true,"quality":30,"type":"jpeg"});
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
  await page.screenshot({"path":path,"fullPage":true,"quality":30,"type":"jpeg"});
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
  if(error.errorMessage !== ""){
    await gParam.telegram.sendMessageWithImage("에러메시지 : "+error.errorMessage,path);
  }
  if(error.consoleMessage !== ""){
    await gParam.telegram.sendMessageWithImage("콘솔메시지 : "+error.consoleMessage,path);
  }
  await gParam.browser.close();
}
