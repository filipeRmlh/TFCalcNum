importAtom("Collider");
var Polygon = function(origin,points,options){
  this.name="Polygon";
  this.points = points;
  this.fillcolor = ((options.fillcolor==undefined)?"none":options.fillcolor);
  this.bordercolor = ((options.bordercolor==undefined)?"none":options.bordercolor);
  this.origin=origin;
}
Polygon.prototype={
  collision:function(Obj){
    var mca = Collider(this, Obj);
    console.log(mca);
  },
  draw:function(){
    ctx.beginPath();
    ctx.fillStyle = this.fillcolor;
    ctx.strokeStyle = this.bordercolor;
    points = this.points;
    ctx.moveTo(points[0].x,points[0].y);
    for(var i=1;i<points.length;i++){
      ctx.lineTo(points[i].x,points[i].y);
    }
    ctx.lineTo(points[0].x,points[0].y);
    if(this.fillcolor!=="none")ctx.fill();
    if(this.bordercolor!=="none")ctx.stroke();

    ctx.closePath();
  }
}
