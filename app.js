const MTBot = require('./module/mtbot');
const logger = require('./module/util/logger.js');
const web = require('./module/web');
const telegraf = require('./module/telegraf');
const db = require('./module/db');
const path = require('path');


const app = web.app;


app.listen(9642,(req,res)=>{
  MTBot({telegram:telegraf})
  //title,filepath,datetime,platform,phase,status
});
