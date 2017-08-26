importElement("Polygon");
var Wall = function(weigth, start, finish, options){
  var vrect = Normative.normalize(Normative.subtractVectors(finish,start));
  vrect = Normative.multiplyToEscalar(Normative.rotatevector(vrect, Normative.torad(90)),(weigth/2));
  var point1 = Normative.sumVectors(start, vrect);
  var point2 = Normative.sumVectors(finish, vrect);
  var point3 = Normative.subtractVectors(finish, vrect);
  var point4 = Normative.subtractVectors(start, vrect);
  this.format=[
    new Polygon(origin, [point1,point2,point3,point4], options)
  ];
}
Wall.prototype={
  collision:function(Obj){
    var format = this.format;
    var format2 = Obj.format;
    for(var i=0;i<format.length;i++){
      for(var j=0;j<format2.length;j++){
        var a =format[i].collision(format2[j]);
      }
    }
  },
  draw:function(){
    var format = this.format;
    for(var i=0;i<format.length;i++){
      format[i].draw();
    }
  }
};
