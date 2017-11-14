var Wall = function(start, end, weight,options){
  start = start==undefined?new Vector():start;
  end = end==undefined?new Vector():end;
  weight = weight==undefined?0:weight;
  options = options==undefined?{}:options;
  this.name=options.name||"Wall";
  this.q = 0.01;
  this.element = SAT.Line(start,end,weight,options);
}
Wall.prototype={
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    var response = new SAT.Response();
    if(this.element.collision(format2,response)){
      this.afterCollision(Obj,format2,format,response);
      Obj.afterCollision(this,format,format2,response);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){ },
  draw:function(){
    this.element.draw();
  }
};
