function User(settings,myscreen,options){
  options = options==undefined?{}:options;
  var _this = this;
  setInterval(function(){
    var tam = _this.obj.length;
    if((tam - _this.first)>_this.limit){
        _this.obj[_this.first].stopAll();
        _this.first++
    }
  },200);
  this.limit = 7; //limite de elementos na tela.
  this.first = 0; //indice do primeiro elemento criado.
  this.obj=[];

  this.header = document.querySelectorAll("header")[0];
  this.htimev = 500;
  this.fillcolor=options.fillcolor==undefined?"rgba(0,255,0,0.5)":options.fillcolor;
  this.bordercolor=options.bordercolor==undefined?"rgb(0,255,0)":options.bordercolor;
  this.lock=false;
  this.minx = options.minx||0;
  this.maxx = options.maxx||Infinity;
  this.miny = options.miny||0;
  this.maxy = options.maxy||Infinity;
  this.settings=settings;
  this.myscreen = myscreen;
  this.x = 0;this.y=0;
  this.sphere;
  this.htime=setTimeout(function(){_this.header.style.opacity=0;},5000);
  this.events();
  this.createElement();
}
User.prototype.events = function(){
  var _this = this;
  for(i in this.actions){
    if(this.actions.hasOwnProperty(i)){
        document["addEventListener"](i,function(e){_this.actions[e.type](_this,e)});
    }
  }
}
User.prototype.closeModal=function(){
  this.myscreen.startMovement();
  document.querySelectorAll(".containerContent")[0].style.display="none";
}
User.prototype.openModal=function(){
  this.myscreen.stopMovement();
  document.querySelectorAll(".containerContent")[0].style.display="block";
}
User.prototype.createElement=function(){
  var _this=this;
  _this.sphere = new Sphere(new SAT.Vector(_this.x, _this.y),  {xspeed2:_this.settings.xs2,xspeed1:_this.settings.xs1,n:_this.settings.N,name:"userObj",r:10,material:new Material("Iron"),fillcolor:_this.fillcolor,bordercolor:_this.bordercolor,restCoef:_this.settings.restC});
  _this.sphere.stopMovement();
}
User.prototype.actions={
  mouseover:function(_this,e){
    var x = e.clientX;
    var y = e.clientY;
    _this.x = ((x>_this.maxx)?_this.maxx:((x<_this.minx)?_this.minx:x));
    _this.y = ((y>_this.maxy)?_this.maxy:((y<_this.miny)?_this.miny:y));
  },
  mousemove:function(_this,e){
    if(_this.sphere!=undefined){
      _this.sphere.stopMovement();
      var x = e.clientX;
      var y = e.clientY;
      _this.x = ((x>_this.maxx)?_this.maxx:((x<_this.minx)?_this.minx:x));
      _this.y = ((y>_this.maxy)?_this.maxy:((y<_this.miny)?_this.miny:y));
      _this.sphere.posk0.x = _this.x;
      _this.sphere.posk1.x = _this.x;
      _this.sphere.posk0.y = _this.y;
      _this.sphere.posk1.y = _this.y;
      _this.sphere.setPosition();
    }
  },
  mousedown: function(_this,e){
    if((!_this.lock)&&(e.button==0)&&(e.target.id=="canvas")){
      if(_this.sphere!=undefined){
        _this.sphere.startMovement();
      }
        _this.createElement();
        _this.obj.push(_this.sphere);
        _this.myscreen.add(_this.sphere);
        _this.lock=true;
        setTimeout(function(){_this.lock=false},_this.htimev);
    }
  },
  contextmenu:function(_this,e){
    e.preventDefault();
    clearTimeout(_this.htime);
    _this.header.style.opacity=1;
    _this.htime = setTimeout(function(){
      _this.header.style.opacity=0;
    },_this.htimev);
    return false;
  }
}
