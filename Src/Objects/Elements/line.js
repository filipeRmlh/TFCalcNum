importAtom("Collider");
var Line = function(start,end,weight,options){
  this.name="Line";
  this.start=start;
  this.end=end;
  this.weight=weight;
  this.color = ((options.color==undefined)?"#000":options.color);
  this.origin=options.origin;
  this.eq={a:0,b:0,c:0};
  this.setEquation(start, end);
}
Line.prototype={
  collision:function(Obj){
    return Collider(this, Obj);
  },
  draw:function(){
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth=this.weight;
    ctx.moveTo(this.start.x,this.start.y);
    ctx.lineTo(this.end.x,this.end.y);
    if(this.color!=="none")ctx.stroke();
    ctx.lineWidth=1;
    ctx.closePath();
  },
  setEquation(start,end){
    var a= start.y-end.y;
    var b = end.x-start.x;
    var c = (start.x*end.y)-(end.x*start.y);
    this.eq = {a:a,b:b,c:c};
  }
}
