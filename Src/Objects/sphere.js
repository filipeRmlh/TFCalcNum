importAtom("Material");
var first = true;
var Sphere = function(position,options){
    this.h= options.h==undefined?0.03:options.h;
    options = options==undefined?{}:options;
    position = position==undefined?new SAT.Vector():position;
    options.material = options.material==undefined?new Material():options.material;
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
    this.stopMovement = false;
    this.posk0 = position.clone();
    this.posk1 = position.clone();
    this.posk2 = new SAT.Vector();
    this.element= new SAT.Circle(new SAT.Vector(position.x,position.y),this.r,options);
    this.kfluid = ((1/2)*ENV.density*0.47*Math.PI*Math.pow(this.r,2));
    this.n = 10;
    xspeed2 = 4;
    xspeed1 = 1;
    this.h = (1/this.n)*xspeed1;
    this.time = 1000/(this.n*xspeed2);
    if(this.time<5){
      console.error("A variável Time está com valor muito baixo... diminua n ou diminua xspeed2");
    }
    this.moveLoop=setTimeout(this.movement,this.time,this);
}
Sphere.prototype={
  setPosition:function(){
      this.element.pos.x = this.posk1.x;
      this.element.pos.y = this.posk1.y;
  },
  movement:function(_this){
    clearTimeout(_this.moveLoop);
    _this.setPosition();
    var h = _this.h;
    var massa = _this.massa;
    _this.posk2.y = (2*Math.pow(h,2)*massa*ENV.g+_this.posk0.y*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.y)/(_this.kfluid*h+2*massa);
    _this.posk2.x = (_this.posk0.x*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.x)/(_this.kfluid*h+2*massa);
    for(var i=0;i<_this.screenElms.length;i++){
        if(_this.screenElms[i]!==_this){
            _this.collision(_this.screenElms[i]);
        }
    }
    _this.posk0.copy(_this.posk1);
    _this.posk1.copy(_this.posk2);
    if(!_this.stopMovement){
      _this.moveLoop=setTimeout(_this.movement,_this.time,_this);
      _this.stopMovement=false;
    }
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
    clearTimeout(this.moveLoop);
    this.stopMovement=true;
    var v = this.posk1.clone().sub(this.posk0).scale(1/this.h);
    var over = response.overlapV.clone();
    var overP = over.reverse().clone().project(this.posk1.clone().sub(this.posk0));
    this.posk1 = this.posk1.add(overP);
    var vOver = overP.clone().scale(1/this.h);
    var mv = v.clone().add(vOver);
    console.log(mv);
    v=mv.reflect(over.clone().perp());
    this.posk0.copy(this.element.pos);
    this.posk1 = this.posk0.clone().add(v.clone().scale(this.h));
    this.setPosition();
    this.stopMovement=false;
    this.moveLoop=setTimeout(this.movement,this.time,this);
  },
  draw:function(){
    this.element.draw();
  }
}
