exports.screenshot = async function(page,path){
  await page.screenshot({"path":path,"fullPage":true,"quality":30,"type":"jpeg"});
}
