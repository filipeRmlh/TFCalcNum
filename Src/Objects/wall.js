var Wall = function(start, end, weight,options){
  start = start==undefined?new Vector():start;
  end = end==undefined?new Vector():end;
  weight = weight==undefined?0:weight;
  options = options==undefined?{}:options;
  this.name=(options.name==undefined)?"Wall":options.name;
  this.element = end.toPolygon(start,weight,options);
  this.dontdraw=false;
}
Wall.prototype={
  collision:function(Obj){
    if((Obj.name!="Wall")&&(Obj.name!="Finish")){
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
  stopMovement:function(){},
  afterCollision:function(Obj,objFormat,thisFormat,response){ },
  draw:function(){
    if(!this.dontdraw){
      this.element.draw();
    }
  }
};
