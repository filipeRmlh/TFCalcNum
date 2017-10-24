var Vector = function(x,y){
  this.x = x;
  this.y = y;
}
Vector.prototype={
  draw:function(start,size){
    var end = {x:(start.x+this.x),y:(start.y+this.y)};
      ctx.beginPath();
      ctx.moveTo(start.x,start.y);
      ctx.lineTo(end.x,end.y);
      ctx.stroke();
      ctx.closePath();
  }
}
