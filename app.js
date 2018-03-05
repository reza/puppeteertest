const Monibot = require('./module/monibot');
const logger = require('./module/util/logger.js');
const web = require('./module/web');
const telegraf = require('./module/telegraf');
const db = require('./module/db');
const path = require('path');


const app = web.app;


app.listen(9642,(req,res)=>{
  Monibot({telegram:telegraf})
  //title,filepath,datetime,platform,phase,status
});
