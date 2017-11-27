//Funções adicionadas a API SAT.js para adequação à finalidade do projeto;
//Para o correto funcionamento dessas funções a própria API foi ligeiramente modificada;
//Extras

SAT.setFunction('toDeg',function (rad){
  return (180*rad)/Math.PI;
});

SAT.setFunction('toRad',function (deg){
  return (deg*Math.PI)/180;
});

SAT.setFunction("TimeLogs",{});
SAT.setFunction('getTimeLog',function($varName,destroy){
  var d = new Date();
  if(SAT.TimeLogs[$varName]===undefined){
    SAT.TimeLogs[$varName] = d.getTime();
    return 0;
  }else{
    var t = d.getTime()-SAT.TimeLogs[$varName];
    if(destroy){
      delete SAT.TimeLogs[$varName];
    }
    return t;
  }
});

//Vector
SAT.Vector.prototype['name'] = "Vector";
SAT.Vector.prototype['getAngle']=function(origin){
    origin = origin||new SAT.Vector();
    return  Math.atan((this.y-origin.y)/(this.x-origin.x));
}
SAT.Vector.prototype['moduleScale']=function(mod){
  var angle = this.getAngle();
  this.x += mod*Math.cos(angle);
  this.y += mod*Math.sin(angle);
  return this;
}
SAT.Vector.prototype['draw'] = function(origin){
  origin = origin||new SAT.Vector();
  var end = new SAT.Vector(origin.x,origin.y);
  end.add(this);
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth=this.options.width||1;
  ctx.moveTo(origin.x,origin.y);
  ctx.lineTo(end.x,end.y);
  ctx.stroke();
  ctx.closePath();
}

SAT.Vector.prototype["toPolygon"]= function(start,w,options){// Esta função é útil para criação de paredes
var temp;
  k=1;
  if(start.x>this.x){
    temp = this.x;
    this.x = start.x;
    start.x = temp;
    k=-1;
  }
  if(start.y>this.y){
    temp = this.y;
    this.y = start.y;
    start.y = temp;
  }
  var nv  = this.clone().sub(start);
  var l = nv.len();
  var alpha = nv.getAngle()*k;
  var o = this.clone().add(start).scale(1/2);
  var box = new SAT.Box(o,l,w,options);
  var polygon = box.toPolygon();
  polygon.translate(l/2*(-1),w/2*(-1));
  polygon.rotate(alpha);
  return polygon;
}


//circle
SAT.Circle.prototype['name'] = "Circle";
SAT.Circle.prototype['draw'] = function(){
  ctx.beginPath();
  ctx.fillStyle=this.options.fillcolor;
  ctx.strokeStyle=this.options.bordercolor;
  ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
  if(this.options.fillcolor!=="none")ctx.fill();
  if(this.options.bordercolor!=="none")ctx.stroke();
  ctx.closePath();
}
SAT.Circle.prototype['collision']=function(Obj, response){
  return SAT['testCircle'+Obj.name](this,Obj,response);
}

//polygon
SAT.Polygon.prototype['name'] = "Polygon";
SAT.Polygon.prototype['draw']=function(){
  ctx.beginPath();
  ctx.fillStyle = ((this.options.fillcolor==undefined)?"#222222":this.options.fillcolor);
  ctx.strokeStyle = ((this.options.bordercolor==undefined)?"#222222": this.options.bordercolor);
  var pos = this.pos;
 var  points = this.points;
  ctx.moveTo(points[0].x+pos.x,points[0].y+pos.y);
  for(var i=1;i<points.length;i++){
    ctx.lineTo(points[i].x+pos.x,points[i].y+pos.y);
  }
  ctx.lineTo(points[0].x+pos.x,points[0].y+pos.y);
  if(this.options.fillcolor!=="none")ctx.fill();
  if(this.options.bordercolor!=="none")ctx.stroke();
  ctx.closePath();
}

SAT.Polygon.prototype['collision'] = function(Obj,response){
  return SAT['testPolygon'+Obj.name](this, Obj, response);
}
//box
SAT.Box.prototype['name'] = "Box";
//Response
SAT.Response.prototype['name']="Response";
