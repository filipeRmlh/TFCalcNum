importAtom("Material");
var Sphere = function(position,options){
    this.h= options.h==undefined?0.03:options.h;
    options = options==undefined?{}:options;
    position = position==undefined?new SAT.Vector():position;
    options.material = options.material==undefined?new Material():options.material;
    this.t = 1;
    this.v = new SAT.Vector();
    this.name = options.name||"Sphere";
    this.screenElms;
    /********Propriedades Físicas*********************/
    volume = (options.r!=undefined?((4/3)*Math.PI*Math.pow(options.r,3)):undefined);
    this.density = (options.material==undefined)?undefined:options.material.density;
    retorno = options.material.getMaterial({volume:volume,density:options.material.density,massa:options.massa});
    this.massa = retorno.massa;
    this.density = retorno.density;
    this.r =  Math.pow((3*retorno.volume)/(4*Math.PI),1/3);
    /************************************************/
    this.posk0 = position.clone();
    this.posk1 = position.clone();
    this.element= new SAT.Circle(new SAT.Vector(position.x,position.y),this.r,options);
    this.kfluid = -1*((1/2)*ENV.density*0.47*Math.PI*Math.pow(this.r,2));
    this.time = 20;
    this.moveLoop=setTimeout(this.movement,this.time,this);
}
Sphere.prototype={
  setPosition:function(){
      this.element.pos.x = this.element.pos.x+this.v.x*this.t;
      this.element.pos.y = this.element.pos.y+this.v.y*this.t;
  },
  movement:function(_this){
    var h = _this.h;
    var massa = _this.massa;
    var posk2=new SAT.Vector();
    posk2.y = (2*Math.pow(h,2)*massa*ENV.g+_this.posk0.y*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.y)/(_this.kfluid*h+2*massa);
    posk2.x = (_this.posk0.x*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.x)/(_this.kfluid*h+2*massa);
    _this.posk0.copy(_this.posk1);
    _this.posk1.copy(posk2);
    _this.v.x = (_this.posk1.x - _this.posk0.x)/h;
    _this.v.y = (_this.posk1.y - _this.posk0.y)/h;
    _this.setPosition();
    clearTimeout(_this.moveLoop);
    _this.moveLoop=setTimeout(_this.movement,10,_this);
  },
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    var response = new SAT.Response();
    if(this.element.collision(format2,response)){
        this.afterCollision(Obj,format2,format,response);
        Obj.afterCollision(this,format,format2,response);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){
    var direction= this.v;
    console.log("FOI");
    clearTimeout(this.moveLoop);
    var over = response.overlapV.clone();
    over.clone().scale(100).draw(this.element.pos);
    this.element.pos.copy(this.element.pos.add(over));
    this.moveLoop=setTimeout(this.movement,this.time,this);
  },
  draw:function(){
    this.element.draw();
  }
}
