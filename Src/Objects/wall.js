importElement("Line");
var Wall = function(start, finish, weight,options){
    this.element = new Line(start,finish,weight,options);
}
Wall.prototype={
  setPosition(x,y){

  },
  movement:function(){},
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    if(format.collision(format2)){
        this.afterCollision(Obj,format2,format);
        Obj.afterCollision(this,format,format2);
    }
  },
  afterCollision:function(Obj,format,objFormat){

  },
  draw:function(){
    this.element.draw();
  }
};
