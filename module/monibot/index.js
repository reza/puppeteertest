const hmallpc = require("./hmallpc")
const thdpc = require("./thdpc")
module.exports = function(parameter){
  var random = Math.floor((Math.random()*10)%2);
  thdpc(parameter);
/*
  if(random == 1){
  thdpc(parameter);

  }else{
  hmallpc(parameter);

}*/
}
