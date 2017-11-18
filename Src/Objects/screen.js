var ENV={
  density:0,
  g:-10,
  k:9*1000000000
};
var Screen = function(selector,fps,options){//construtor do objeto Pscreen;
  if(selector==undefined)console.error("Não existe um seletor dado");
  options = options==undefined?{}:options;
  this.obj=[];
  this.fps = (fps===undefined)?10:fps;
  this.elm = document.querySelector(selector);
  this.size={w:0,h:0};
  this.trigger();
  if(options.material==undefined){
    options.material = new Material();
  }
  ENV.density = options.material.Standard.density
  ENV.g = (options==undefined||options.material==undefined||options.material.gravity==undefined)?10:options.material.gravity;
}
Screen.prototype={//métodos do objeto Screen;
  refresh:function(_this){//método que apaga e pinta todos os elementos na tela a cada frame;
     ctx.clearRect(0,0,_this.size.w,_this.size.h);
    for(var i=0;i<_this.obj.length;i++){
      if(_this.obj.hasOwnProperty(i)){
        _this.obj[i].draw();
      }
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
    elm.screenElms = this.obj;
    this.obj.push(elm);
  }
}
