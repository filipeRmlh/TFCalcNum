var ENV={
  density:0,
  g:0
};
var Screen = function(selector,fps,options){//construtor do objeto Pscreen;
  this.obj=[];
  this.fps = (fps===undefined)?24:fps;
  this.elm = document.querySelector(selector);
  this.size={w:0,h:0};
  this.trigger();
  ENV.density = (options==undefined||options.material==undefined||options.material.density==undefined)?Material.Air.density:options.material.density;
  ENV.g = (options==undefined||options.material==undefined||options.material.gravity==undefined)?10:options.material.gravity;
}
Screen.prototype={//métodos do objeto Screen;
  refresh:function(_this){//método que apaga e pinta todos os elementos na tela a cada frame;
    ctx.clearRect(0,0,_this.size.w,_this.size.h);
    for(var i=0;i<_this.obj.length;i++){
      if(_this.obj.hasOwnProperty(i)){
        _this.obj[i].draw();
        _this.obj[i].movement();
        _this.collision(_this.obj[i],i);
      }
    }
  },
  collision:function(obj,i){
      for(var j=i;j<this.obj.length;j++){
          obj.collision(this.obj[j]);
      }
  },
  resize:function(_this){ //método que ajusta o tamanho do "canvas" à TELA;
    var elm = _this.elm;
    h = window.innerHeight-20;
    w = window.innerWidth-20;
    _this.size={w:w,h:h};
    elm.width=w;
    elm.height=h;
  },
  trigger:function(){//método que inicializa funções repetitivas e eventos ligados à TELA;
    var _this=this;
    ctx = this.elm.getContext("2d");
    _this.resize(_this);
    window.onresize=function(){_this.resize(_this)};
    window.setInterval(this.refresh,(1000/_this.fps),_this);

  },
  add:function(elm){
    elm.screen = this;
    this.obj.push(elm);
  }
}
