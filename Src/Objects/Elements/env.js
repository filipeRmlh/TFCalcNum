var _ENV=function(){
  this.drawScale=1;
  this.g = new SAT.V();
  this.density = 0;
  this.timechange;
  this.origin = new SAT.V();
}
_ENV.prototype.setPos = function(x,y){
  this.origin = new SAT.V(x,y);
}

_ENV.prototype.GDraw=function(){
  this.g.draw(this.origin,{scale:this.drawScale,textBox:{font:"12pt Sans-Serif",text:"G"}});
}
_ENV.prototype.setG=function(to,steps){ //Animação do vetor G na tela;
  var _this=this;
  var r = to.len()-this.g.len();
  var t = to.getAngle()-this.g.getAngle();
  var piece = {r:(r/steps),t:(t/steps)};
  this.timechange=setTimeout(function(){_this.moveGAux(piece,steps)},41);
}
_ENV.prototype.moveGAux=function(piece,steps){ //Função Auxiliar de setG
  if(steps == 0){
    return
  }
  var _this=this;
  clearTimeout(this.timechange);
  this.g.rotate(piece.t);
  var vmod = new SAT.V(1,0);
  vmod.scale(piece.r,0);
  vmod.rotate(this.g.getAngle());
  this.g.add(vmod);
  steps--;
  this.timechange=setTimeout(function(){_this.moveGAux(piece,steps)},41);
}

ENV = new _ENV();//instanciando _ENV na variável global ENV;
