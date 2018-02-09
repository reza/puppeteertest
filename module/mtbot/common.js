const db = require('./../db');

exports.screenshot = async function(page,path){
  await page.screenshot({"path":path,"fullPage":true,"quality":30,"type":"jpeg"});
  await db.insert({
      tablename : "snap",
      attrnames : "title,filepath,datetime,platform,phase,status",
      records   : [
        ["title","filepath","2018-01-01 12:34:56","platform",1,1]
      ]
  });
}

exports.error = async function(){

}
