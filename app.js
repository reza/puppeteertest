const pageAuto = require('./module/puppeteer/index.js');
const logger = require('./module/util/logger.js');
const web = require('./module/web/index.js');
const telegraf = require('./module/telegraf/index.js');
const path = require('path');


const app = web.app;

app.listen(9642,(req,res)=>{
  //pageAuto.run()
  console.log("DONE!");
});
