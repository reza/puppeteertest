const hmallpc = require("./hmallpc")
const thdpc = require("./thdpc")
const thdm = require("./thdm")
const hmallm = require("./hmallm")
module.exports = function(parameter){
  var random = Math.floor((Math.random()*10)%2);
  thdm(parameter);
//  thdm(parameter);
//  thdpc(parameter);
/*
  if(random == 1){
  thdpc(parameter);

  }else{
  hmallpc(parameter);

}*/
}
