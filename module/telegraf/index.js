const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs');

var RegExp = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/;

var keyboardList = [];
for(var i=0;i<8;i++){
  keyboardList.push([]);
  for(var j=1;j<=3;j++){
    keyboardList[i].push(Markup.callbackButton((i*3)+j, 'data'));
  }
}

const keyboard = Markup.inlineKeyboard(keyboardList)

const bot = new Telegraf("438866750:AAFEUS8HmNkU-0r7aj69DzBfkwXCRx0BbSI")
bot.start((ctx) => ctx.reply('Hey there!'))
bot.on('message', (ctx) => {
  /* 1. WHAT DATE */
  /* 2. WHAT TIME */
  if(ctx.message.text.match(RegExp) !== null){
    var datetext = ctx.message.text;
    fs.readdirSync("./hmall/").forEach(file => {
      var datetime = file;
          datetime = datetime.substr(0,12);
      if(datetime == datetext ){
        ctx.replyWithPhoto('/hmall/'+file+'/pc/site.png');
      }
    })


  }else{
    ctx.reply("시간을 적어주세요.");
  }

  /* 3. OUTPUT */

})
bot.action('data', (data) => {
  data.deleteMessage();
  ctx.reply("시간을 적어주세요.")
})
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.startPolling()
