var Wall = function(start, end, weight,options){
  start = start==undefined?new Vector():start;
  end = end==undefined?new Vector():end;
  weight = weight==undefined?0:weight;
  options = options==undefined?{}:options;
  this.name=(options.name==undefined)?"Wall":options.name;
  // this.element = new SAT.Polygon(points.center,points.corners,options)._recalc();
  this.element = end.toPolygon(start,weight,options);
}
Wall.prototype={
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    var response = new SAT.Response();
    var collide = this.element.collision(format2,response);
    if(collide){
      this.afterCollision(Obj,format2,format,response);
      Obj.afterCollision(this,format,format2,response);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){ },
  draw:function(){
    this.element.draw();
  }
};
