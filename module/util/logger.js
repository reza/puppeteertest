const dm = require('./datemanager.js');
const DataManager = dm.DateManager;

exports.debug = function(text){
  var date = new DataManager();
  console.log(date.datetime + " :: " + text);
}
