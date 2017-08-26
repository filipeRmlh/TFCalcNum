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
  Circle_Circle:function(circle1,circle2){
    var point1 = circle1.origin;
    var point2 = circle2.origin;
    var x = point2.x-point1.x;
    var y = point2.y-point1.y;
    var module = Normative.module({x: x, y: y});
    var rtotal = circle1.r+circle2.r;
    if(module<rtotal)return false;
    return true;
  },
  Polygon_Polygon:function(polygon1,polygon2){
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
  Polygon_Circle:function(polygon,circle){
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
  }
}
var Collider = function(Obj1,Obj2){
  var name1 = Obj1.name+"".toLowerCase();
  var name2 = Obj2.name+"".toLowerCase();
  if(typeof COLLIDE_functions[name1+"_"+name2] === "function"){
    return COLLIDE_functions[name1+"_"+name2](Obj1,Obj2);
  }else{
    return COLLIDE_functions[name1+"_"+name2](Obj2,Obj1);
  }
}
