importAtom("Material");
var Teleport = function(position,game,options){
    options = options==undefined?{}:options;
    this.color = 0;
    options.fillcolor = "hsl("+this.color+",100%,60%)";
    options.bordercolor = "hsl("+this.color+",100%,60%)";
    options.lineWidth = 1;
    this.game = game;
    this.r=options.r;
    position = position==undefined?new SAT.Vector():position;
    this.name = "Teleport";
    this.element= new SAT.Circle(new SAT.Vector(position.x,position.y),options.r,options);
    this.destiny;
    if(options.destiny==undefined){
      this.destiny = this;
    }else{
      this.destiny = options.destiny;
      this.destiny.destiny = this;
    }
}
Teleport.prototype={
  teleport:function(){

  },
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    var response = new SAT.Response();
    if(this.element.collision(format2,response)){
        this.afterCollision(Obj,format2,format,response);
        response.overlapV.reverse();
        response.overlapN.reverse();
        Obj.afterCollision(this,format,format2,response);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){
    if(Obj.movement!=undefined){
      Obj.stopMovement();//para os calculos da diferença finita
      var v1= Obj.posk1.clone().sub(Obj.posk0);
      var over = response.overlapV.clone().reverse();//vetor do quanto a esfera entrou no teletransporte;
      Obj.posk0.sub(over);
      Obj.posk1.sub(over);
      var thispos = this.element.pos;
      var destinypos=this.destiny.element.pos;

      var relpos1 = Obj.posk0.clone().sub(thispos).normalize();//posição0 relativa a entrada do teletransporte
      var r = this.destiny.r+Obj.r+1;
      var t = relpos1.getAngle();
      var rel2 = new SAT.V(r*Math.cos(t),r*Math.sin(t));
      //if(relpos1.x<0)rel2.reverse();//corrige erro do sistema de pegar sempre menor angulo.
      Obj.posk0.copy(destinypos.clone().sub(rel2));
      Obj.posk1 = Obj.posk0.clone().add(v1);
      Obj.startMovement(); // reinicia os cálculos da diferença finita com novas as novas posições iniciais calculadas;
    }
  },
  draw:function(){
    this.color++;
    this.color=this.color%360;
    this.element.options.bordercolor="hsl("+this.color+",90%,30%)";
    this.element.options.fillcolor = "hsl("+this.color+",70%,10%)";
    this.element.draw()
  }
}
