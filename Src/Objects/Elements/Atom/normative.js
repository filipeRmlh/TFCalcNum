var Normative = {
  escalarProduct:function(v1,v2){
    return (v1.x*v2.x)+(v1.y*v2.y);
  },
  module2:function(v){
    return Math.pow(v.x,2)+Math.pow(v.y,2);
  },
  module:function(v){
    return Math.sqrt(Normative.module2(v));
  },
  normalize:function(v){
    var modulo = Normative.module(v);
    return {x:(v.x/modulo),y:(v.y/modulo)};
  },
  vectorProjection:function(v,axis){
    var escalar = Normative.escalarProduct(v,axis);
    var module2 = Normative.module2(axis);
    return {x:(escalar/module2)*axis.x,y:(escalar/module2)*axis.y}
  },
  escalarProjection:function(v,axis){
    var escalar = Normative.escalarProduct(v,axis);
    var module = Normative.module(axis);
    return {x:(escalar/module),y:(escalar/module)};
  },
  rotatevector:function(v,theta){
    var x=(Math.cos(theta)*v.x)+(Math.sin(theta)*v.y);
    var y=(-(Math.sin(theta)*v.x))+(Math.cos(theta)*v.y);
    return {x:x,y:y};
  },
  torad:function(deg){ // Função de conversão de graus para radianos... só pra facilitar;
    return deg*Math.PI/180;
  },
  todeg:function(rad){
    return 180*rad/Math.PI;
  },
  sumVectors:function(v1,v2){
    var x = (v1.x+v2.x);
    var y = (v1.y+v2.y);
    return {x:x,y:y};
  },
  subtractVectors(v1,v2){
    var x = (v1.x-v2.x);
    var y = (v1.y-v2.y);
    return {x:x,y:y};
  },
  multiplyToEscalar:function(v,e){
    return {x:(v.x*e),y:(v.y*e)};
  }
}
