
var Screen = function(selector,fps){//construtor do objeto Pscreen;
  this.obj=[];
  this.fps = (fps===undefined)?24:fps;
  this.elm = document.querySelector(selector);
  this.size={w:0,h:0};
  this.trigger();
}
Screen.prototype={//métodos do objeto Screen;
  refresh:function(_this){//método que apaga e pinta todos os elementos na tela a cada frame;
    ctx.clearRect(0,0,_this.size.w,_this.size.h);
    for(var i=0;i<_this.obj.length;i++){
      if(_this.obj.hasOwnProperty(i)){
        _this.obj[i].draw();
        _this.checkCollision(_this,i);
      }
    }
  },
  checkCollision(_this,i){
    for(var j=i;j<_this.obj.length;j++){
      _this.obj[i].collision(_this.obj[j]);
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

  }
}
