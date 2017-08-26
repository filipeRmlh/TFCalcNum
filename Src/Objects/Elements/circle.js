importAtom("Point");
var Circle = function(origin,r,options){
  this.name = "Circle";
  this.origin=origin;
  this.r = r;
  this.fillcolor = ((options.fillcolor==undefined)?"none":options.fillcolor);
  this.bordercolor = ((options.bordercolor==undefined)?"none":options.bordercolor);
}
Circle.prototype={
  draw:function(){
    ctx.beginPath();
    ctx.fillStyle=this.fillcolor;
    ctx.strokeStyle=this.bordercolor;
    ctx.arc(this.origin.x,this.origin.y,this.r,0,2*Math.PI);
    if(this.fillcolor!=="none")ctx.fill();
    if(this.bordercolor!=="none")ctx.stroke();
    ctx.closePath();
  },
  collision:function(Obj){
    COLLISION(this,Obj);
  }
}
