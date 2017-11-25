importAtom("Material");
var first=new SAT.Vector();
var Sphere = function(position,options){
    options = options==undefined?{}:options;
    position = position==undefined?new SAT.Vector():position;
    options.material = options.material==undefined?new Material():options.material;
    this.name = options.name||"Sphere";
    this.restCoef = (options.restCoef==undefined||options.restCoef>=0.995)?0.855:options.restCoef;
    this.screenElms;
    /********Propriedades Físicas*********************/
    //calcula massa densidade e raio.Quando se tem 2 dessas informações calcula a outra.
    //Quando só tem uma informação, estipula valor pra outra e calcula a outra.
    //Quando tem as 3, verifica se ta certo e corrige a densidade se não estiver.
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
    this.kfluid = ((1/2)*ENV.density*0.47*Math.PI*Math.pow(this.r,2));
    this.massa*=(1/1000);

    /***************calculo de tempo****************/
      try{
        var n = options.n==undefined?5:options.n; // se não fo definido um n estipula n=5;
        var xspeed2 = options.xspeed2==undefined?1:options.xspeed2;
        var xspeed1 = options.xspeed1==undefined?1:options.xspeed1;
        this.h = (1/n)*xspeed1;
        this.time = 1000/(n*xspeed2) //esse mil existe aqui porque a função "sleep"
        if(this.time<5){
          throw "o produto entre xspeed2 e n deve ser menor ou igual a 200";
        }
      }catch(ex){
        console.error(ex);
        return;
      }
    this.moveLoop;
}
Sphere.prototype={
  startMovement:function(){
    this.moveLoop = setInterval(this.movement,this.time,this);
  },
  stopMovement:function(){
    clearInterval(this.moveLoop);
  },
  setPosition:function(){
      this.element.pos.x = this.posk0.x;
      this.element.pos.y = this.posk0.y;
  },
  movement:function(_this){
    var h = _this.h;
    var massa = _this.massa;
    var posk2 = new SAT.Vector();
    //Método numérico - diferenças centradas//
    posk2.y = (2*Math.pow(h,2)*massa*ENV.g+_this.posk0.y*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.y)/(_this.kfluid*h+2*massa);
    posk2.x = (_this.posk0.x*(_this.kfluid*h-2*massa)+4*massa*_this.posk1.x)/(_this.kfluid*h+2*massa);

    _this.posk0.copy(_this.posk1);
    _this.posk1.copy(posk2);
    _this.setPosition();
  },
  collision:function(Obj){
    var format = this.element;
    var format2 = Obj.element;
    var response = new SAT.Response();
    if(this.element.collision(format2,response)){
        this.afterCollision(Obj,format2,format,response);
        response.overlapV.reverse();
        response.overlapN.reverse();
        Obj.afterCollision(this,format,format2,response);
    }
  },
  afterCollision:function(Obj,objFormat,thisFormat,response){
    //pegando a posição imediatamente antes de collidir
    if(Obj.movement===undefined){
      this.stopMovement();
      var v1 = this.posk1.clone().sub(this.posk0);
      var v1Norm = v1.clone().normalize();
      var over = response.overlapV.clone();
      var overPerp = over.clone().perp();
      var s = over.clone().project(v1);
      v1.scale(1/this.h);
      //Minimização do erro quando a bola entra dentro da parede.
      var vProj = new SAT.V();
      vProj.y = (v1.y/Math.abs(v1.y))*(-1*(s.y*this.kfluid/this.massa)+Math.sqrt(
        -1*Math.pow2(s.y*this.kfluid/this.massa)+2*Math.sqrt(Math.pow2(s.y))*ENV.g+Math.pow2(v1.y)
      ));
      vProj.x = (v1.x/Math.abs(v1.x))*(-1*(s.x*this.kfluid/this.massa)+Math.sqrt(
        -1*Math.pow2(s.x*this.kfluid/this.massa)+Math.pow2(v1.x)
      ));
      //-----------------------------------------------------
      v1.sub(vProj.clone().sub(v1));
      v1.reflect(overPerp);
      this.posk0.sub(s);
      this.posk1.sub(s);
      this.setPosition();
      this.posk1 = this.posk0.clone().add(v1.clone().scale((this.restCoef)*this.h));
     this.startMovement();
    }
  },
  draw:function(){
    this.element.draw()
  }
}
