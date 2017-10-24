importAtom("Normative");
var COLLIDE_functions = {
  polygonFindAxis:function(point1,point2){
    var x = (point2.x-point1.x);
    var y = (point2.y-point1.y);
    var axis = Normative.rotatevector({x: x, y: y}, Normative.torad(90));
    return axis;
  },
  polygonProjection:function(points,axis){
    var v=Normative.escalarProjection(points[0],axis);
    var maxp=v;
    var minp=v;
    for(var i =1;i<points.length;i++){
      v = Normative.escalarProjection(points[i],axis);
      if(v>maxp)maxp = v;
      if(v<minp)minp = v;
    }
    return {min:minp,max:maxp};
  },
  circle_circle:function(circle1,circle2){

    var point1 = circle1.origin;
    var point2 = circle2.origin;
    var x = point2.x-point1.x;
    var y = point2.y-point1.y;
    var module = Normative.module({x: x, y: y});
    var rtotal = circle1.r+circle2.r;
    if(module<rtotal)return false;

    return true;
  },
  polygon_polygon:function(polygon1,polygon2){
    var points1,points2;
    if(polygon1.points.length<polygon2.points.length){
      points1 = polygon1.points;
      points2 = polygon2.points;
    }else{
      points2 = polygon1.points;
      points1 = polygon2.points;
    }
    var axis,proj1,proj2;
    for(var i=0;i<(points1.length);i++){
      axis = COLLIDE_functions.polygonFindAxis(points1[i],points1[(((i+1)===points1.length)?0:(i+1))]);
      proj1 = COLLIDE_functions.polygonProjection(points1, axis);
      proj2 = COLLIDE_functions.polygonProjection(points2, axis);
      if(((proj2.max>proj1.max)&&(proj2.min>proj1.max))||((proj2.max<proj1.max)&&(proj2.min<proj1.max))) return false;
    }
    return true;
  },
  polygon_circle:function(polygon,circle){
    var circlePoint = circle.origin;
    var polygonPoints = polygon.points;
    var x,y;
    var modAnt,mod;
    var x1,y1;
    var axis,proj1,proj2;
    for(var i=0;i<(polygonPoints.length);i++){
      axis = COLLIDE_functions.polygonFindAxis(polygonPoints[i],polygonPoints[i][(((i+1)===points1.length)?0:(i+1))]);
      proj1 = COLLIDE_functions.polygonProjection(points1, axis);
      proj2 = COLLIDE_functions.polygonProjection(points2, axis);
      if(((proj2.max>proj1.max)&&(proj2.min>proj1.max))||((proj2.max<proj1.max)&&(proj2.min<proj1.max))) return false;
    }
    return true;
  },
  line_line:function(line1,line2){
    return false;
  },
  line_polygon:function(line,polygon){
    return false;
  },
  line_circle:function(line,circle){
    intervalX = (line.start.x<line.end.x)?[(line.start.x-circle.r/2),(line.end.x+circle.r/2)]:[(line.start.x-circle.r/2),(line.end.x+circle.r/2)];
    intervalY = (line.start.y<line.end.y)?[(line.start.y-circle.r/2),(line.end.y+circle.r/2)]:[(line.start.y-circle.r/2),(line.end.y+circle.r/2)];
    if(((circle.origin.x>intervalX[0])&&(circle.origin.x<intervalX[1]))||((circle.origin.y>intervalY[0])&&(circle.origin.y<intervalY[1]))){
      var d = Math.abs(line.eq.a*circle.origin.x+line.eq.b*circle.origin.y+line.eq.c)/(Math.sqrt(Math.pow(line.eq.a,2)+Math.pow(line.eq.b,2)));
      return (d<(circle.r+(line.weight/2)));
    }else{
      return false;
    }

  }
}
var Collider = function(Obj1,Obj2){
  var name1 = Obj1.name+"";
  var name2 = Obj2.name+"";
  name1=name1.toLowerCase();
  name2=name2.toLowerCase();
  if(typeof COLLIDE_functions[name1+"_"+name2] === "function"){
    return COLLIDE_functions[name1+"_"+name2](Obj1,Obj2);
  }else{
    return COLLIDE_functions[name2+"_"+name1](Obj2,Obj1);
  }
}
