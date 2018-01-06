importAtom("Material");
var Action = function(position,game,action,options){
    options = options==undefined?{}:options;
    this.lastSphere;
    this.color = 0;
    this.colorchange=true;
    this.activeCollision=false;
    this.activeAction=true;
    options.fillcolor = "hsl("+this.color+",100%,97%)";
    this.game = game;
    this.action=action;
    position = position==undefined?new SAT.Vector():position;
    this.name = "Action";
    this.element= new SAT.Circle(new SAT.Vector(position.x,position.y),options.r,options);
}
Action.prototype={
  collision:function(Obj){
    if(this.activeAction){
      var format = this.element;
      var format2 = Obj.element;
      var response = new SAT.Response();
      if(this.element.collision(format2,response)){
          this.afterCollision(Obj,format2,format,response);
          response.overlapV.reverse();
          response.overlapN.reverse();
          Obj.afterCollision(this,format,format2,response);
      }
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){
    if(this.lastSphere!=Obj){
      if(!isNaN(response.overlap)&&(Obj.movement!=undefined)&&(this.activeAction)){
        this.action(this,Obj,response);
        this.lastSphere = Obj;
      }
    }
  },
  draw:function(){
    if(this.colorchange){
      this.color++;
      if(this.color == 359)this.color=0;
      this.element.options.fillcolor="hsl("+this.color+",100%,97%)";
      this.element.options.bordercolor="hsl("+this.color+",100%,40%)";
      if(this.element.options.textBox!=undefined)this.element.options.textBox.color="hsl("+this.color+",100%,40%)";
    }
    this.element.draw()
  }
}
