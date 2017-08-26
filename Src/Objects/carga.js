importElement("Circle");
var Carga = function(carga,position,r,options){
    this.format=[
      new Circle(new Point(position.x,position.y),r,options)
    ];
}
Carga.prototype={
  collision:function(Obj){
    var format = this.format;
    var format2 = Obj.format;
    for(var i=0;i<format.length;i++){
      for(var j=0;j<format2.length;j++){
        format[i].collision(format2[j]);
        
      }
    }
  },
  draw:function(){
    var format = this.format;
    for(var i=0;i<format.length;i++){
      format[i].draw();
    }
  }
}
