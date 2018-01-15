importAtom("Material");
var Finish = function(position,game,nextlevel,options){
    options = options==undefined?{}:options;
    this.color = 0;
    this.mod=0;
    this.divide=2;
    this.sobeColor=true;
    this.lum = this.color.l||50;
    options.fillcolor = "hsl("+this.color.h+","+this.color.s+"%,"+this.lum+"%)";
    this.game = game;
    this.nextlevel=nextlevel;
    this.clearSave=(options.clearSave==undefined)?false:options.clearSave;
    position = position==undefined?new SAT.Vector():position;
    this.name = "Finish";
    this.element= new SAT.Circle(new SAT.Vector(position.x,position.y),options.r,options);
}
Finish.prototype={
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
    if(!isNaN(response.overlap)&&(Obj.movement!=undefined)){
      if(this.clearSave)setCookie("level","");
      loadLevel(this.nextlevel,this.game,true);
    }
  },
  draw:function(){
    if((this.mod%this.divide)==0){
      if(this.sobeColor){this.lum++}else{this.lum--}
      if(this.lum > 60)this.sobeColor=false;
      if(this.lum < 40)this.sobeColor=true;
      this.element.options.fillcolor="hsl("+this.color.h+","+this.color.s+"%,"+this.lum+"%)";
      this.mod=0;
    }
    this.mod++;
    this.element.draw()
  }
}
