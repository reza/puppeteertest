const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs');
const MTBot = require('./../mtbot');

var RegExp = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/;

var keyboardList = [];
for(var i=0;i<8;i++){
  keyboardList.push([]);
  for(var j=1;j<=3;j++){
    keyboardList[i].push(Markup.callbackButton((i*3)+j, 'data'));
  }
}

const keyboard = Markup.inlineKeyboard(keyboardList)
var memberlist = [];
var accesslist = [];
var chatid = ""
const bot = new Telegraf("438866750:AAFEUS8HmNkU-0r7aj69DzBfkwXCRx0BbSI")
bot.start((ctx) => {
  ctx.replyWithHTML('<b>처음에 등록이 필요합니다!</b>');
  ctx.replyWithHTML('/regist 를 통해서 등록해주세요!');
  ctx.reply(ctx.chat.id);

//  chatid = ctx.chat.id;
})

bot.command("restart",(ctx)=>{
  var flag = 1;
  for(i=0;i<memberlist.length;i++){
    if(memberlist[i].chat.id == ctx.chat.id){
      flag = 0;
    }
  }
  if(flag == 1){
    memberlist.push(ctx);
    ctx.reply("등록이 완료되었습니다. 등록자 : "+memberlist.length);
  }else{
    ctx.reply("두번 등록은 되지 않아요.");
  }
  MTBot({telegram:this})
})
bot.command("regist",(ctx)=>{
  var flag = 1;
  for(i=0;i<memberlist.length;i++){
    if(memberlist[i].chat.id == ctx.chat.id){
      flag = 0;
    }
  }
  if(flag == 1){
    memberlist.push(ctx);
    ctx.reply("등록이 완료되었습니다. 등록자 : "+memberlist.length);
  }else{
    ctx.reply("두번 등록은 되지 않아요.");
  }
})
exports.sendMessage = function(text){
//  bot.telegram.sendMessage("@hmonit",text);
  for(i=0;i<memberlist.length;i++){
    bot.telegram.sendMessage(memberlist[i].chat.id,text);
  }
  if(memberlist.length == 0){
    console.log("Telegrambot : 내가 혼자라니!");
  }
}


exports.sendMessageWithImage = async function(text,imgURL){
//  bot.telegram.sendMessage("@hmonit",text);
  for(i=0;i<memberlist.length;i++){
    await bot.telegram.sendMessage(memberlist[i].chat.id,text);
    //try{
      await memberlist[i].replyWithPhoto({
        source : fs.createReadStream(imgURL)
      });
    /*}catch(e){
      console.log(e);
      await memberlist[i].reply("http://182.162.19.54:9642/"+imgURL);
    }*/

  }
  if(memberlist.length == 0){
    console.log("Telegrambot : 내가 혼자라니!");
  }
}
bot.command("hello",(ctx)=>{
  ctx.reply("안녕!");
})

bot.command("image",(ctx)=>{
  var parameter = ctx.message.text.split(" ")[1]
  try{

    if(parameter !== ""){
      ctx.reply("데이터가 있습니다!"+parameter);
      if(parameter.match(RegExp) !== null){
        fs.readdirSync("./hmall/").forEach(file => {
          var datetime = file;
              datetime = datetime.substr(0,12);
              if(datetime == parameter ){
                ctx.reply("확인완료!");
                //ctx.reply('http://182.162.19.54:9642/hmall/'+file+'/pc/test2.jpg');
                ctx.replyWithPhoto({
                  source : fs.createReadStream('./hmall/'+file+'/pc/site_Logined.jpg')
                });
                ctx.replyWithPhoto({
                  source : fs.createReadStream('./hmall/'+file+'/pc/detail.jpg')
                });
                ctx.replyWithPhoto({
                  source : fs.createReadStream('./hmall/'+file+'/pc/order.jpg')
                });
              }
        })
      }
    }
  }catch(e){
    ctx.reply("찾을 수 없습니다. ㅠㅠ"+e);
  }
})
bot.on('message', (ctx) => {
  /* 1. WHAT DATE */
  /* 2. WHAT TIME */
  /* 3. OUTPUT */

})
bot.action('data', (data) => {
  data.deleteMessage();
  ctx.reply("시간을 적어주세요.")
})
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.startPolling()

exports.restartMTBot = function(){
  MTBot({telegram:this})
}
