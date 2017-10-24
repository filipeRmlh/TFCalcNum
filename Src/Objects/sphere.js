importElement("Circle");
importAtom("Material");
var Sphere = function(position,options){
    this.name = options.name;
    this.screen;
    this.material = (options.material==undefined)?Material.Acrylic:options.material;
    if(options.r==undefined){//se massa não ta definida, pega raio pra definir massa e vice-versa. se nenhum ta definido, massa=100g
      this.massa = options.massa==undefined?100:options.massa;
      this.r = Math.pow((3*this.massa)/(4*Math.PI*this.material.density),1/3);
    }else{
      this.r = options.r;
      this.massa=3/4*Math.PI*Math.pow(this.r,3)*this.material.density;
    }
    this.element= new Circle(new Vector(position.x,position.y),this.r,options);
    this.kfluid = -1/2*ENV.density*0.47*Math.PI*Math.pow(this.r*1,2)*100;
    this.posk0 = position;
    this.posk1 = position;
    this.moveLoop;
    this.h=((options.h!=undefined)?options.h:15);
}
Sphere.prototype={
  setPosition(x,y){
    this.element.origin.x=x;
    this.element.origin.y=y;
  },
  movement:function(){
    var h = 1/this.h;
    var posk2={y:0,x:0};
      posk2.y = (2*Math.pow(h,2)*this.massa*ENV.g-(2*this.massa+this.kfluid*h)*this.posk0.y+4*this.massa*this.posk1.y)/(2*this.massa-this.kfluid*h);
      posk2.x = (-(2*this.massa+this.kfluid*h)*this.posk0.x+4*this.massa*this.posk1.x)/(2*this.massa-this.kfluid*h);
      this.posk0 = this.posk1;
      this.posk1 = {x:posk2.x,y:posk2.y};
      this.setPosition(posk2.x,posk2.y);
  },
  pauseMovement:function(){
    clearInterval(this.moveLoop);
  },
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    if(format.collision(format2)){
      this.afterCollision(Obj,format2,format);
      Obj.afterCollision(this,format,format2);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat){
    if(objFormat.name == "Line"){
      this.draw();
      var theta = Normative.getTheta(objFormat.start, objFormat.end);
      var h = this.h;
      var v = Normative.multiplyToEscalar(Normative.subtractVectors(this.posk1,this.posk0),1/h);
      var modv = Normative.module(v);
    //  modv = modv>3?modv-0.7:(modv<2?0:modv);
      var refV = Normative.reflectVector(Normative.normalize(v),theta);
      refV = Normative.multiplyToEscalar(refV,modv);
      this.posk1.x = this.posk0.x+(refV.x)*(h);
      this.posk1.y = this.posk0.y+(refV.y)*(h);
    }
  },
  draw:function(){
      this.element.draw();
  }
}
