var l4 = (function(game){
  var walls = {};
  var teleports = {};
  var actions={};
  var finish = {
    a:new Finish(new SAT.Vector(500,100),game,5, {r:15})
  }
  game.user.miny = 300;
  game.user.maxy = 300;
  game.user.minx = 70;
  game.user.maxx = 950;
  var resetLevel = function(_this){
    var original = {a:"g",b:"h",c:"n",d:"d",e:"e",f:"m",g:"a",i:"o",j:"l",k:"p",q:"q"};
    _this.game.finish.a.count=0;
    fAction(_this,original);
    _this.game.finish.a.count=0;
    for(i in _this.game.actions){
      if(_this.game.actions.hasOwnProperty(i)){
        _this.game.action[i].unsetOver();
      }
    }
    return configDestiny(_this,original);
  }
  var configDestiny=function(_this,config){
    for(i in config){
      if(config.hasOwnProperty(i)){
        _this.game.teleports[i].destiny = _this.game.teleports[config[i]];
        _this.game.teleports[config[i]].destiny = _this.game.teleports[i];
      }
    }
    return config;
  }
  var fAction=function(_this,config){
    _this.game.walls.d.dontdraw=true;
    setTimeout(function(){_this.game.walls.d.dontdraw=false},7000);
    _this.setOver();
    if(_this.game.finish.a.count==undefined)_this.game.finish.a.count=0;
    if(_this.game.finish.a.count>=3){
      configDestiny(_this,{
        c:"h",n:"k",f:"o",a:"g",b:"l",m:"j",d:"i",e:"e",p:"p",q:"q"
      });
    }
    _this.game.finish.a.count++;
  }
  walls.a=new Wall(new SAT.Vector(0,25), new SAT.Vector(1000,25),  50);
  walls.b=new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,625),  50);
  walls.c=new Wall(new SAT.Vector(1000,0),new SAT.Vector(1000,625),50);
  walls.d=new Wall(new SAT.Vector(0,600),new SAT.Vector(1025,600), 50);

  walls.f=new Wall(new SAT.Vector(200,50),new SAT.Vector(200,200), 50);
  walls.g=new Wall(new SAT.Vector(400,50),new SAT.Vector(400,200), 50);
  walls.h=new Wall(new SAT.Vector(600,50),new SAT.Vector(600,200), 50);
  walls.i=new Wall(new SAT.Vector(800,50),new SAT.Vector(800,200), 50);

  actions.a=new Action(new SAT.Vector(100,100),game,function(_this){
    var config = {};
    if(_this.game.finish.a.count<3){
      config = resetLevel(_this);
    }else{
      fAction(_this,config);
    }
  }, {r:15});
  actions.b=new Action(new SAT.Vector(300,100),game,function(_this){
    var config = configDestiny(_this,{
      a:"m",b:"l",c:"c",d:"j",e:"h",f:"n",g:"o",k:"q",i:"p"
    });
    fAction(_this,config);
  }, {r:15})
  actions.c=new Action(new SAT.Vector(700,100),game,function(_this){
    var config = configDestiny(_this,{
      a:"h",b:"c",d:"m",e:"j",f:"o",g:"n",i:"p",k:"l",q:"q"
    });
    fAction(_this,config);
  }, {r:15})
  actions.d=new Action(new SAT.Vector(900,100),game,function(_this){
    var config = configDestiny(_this,{
      a:"h",b:"c",d:"j",e:"m",f:"o",g:"p",i:"n",k:"l",q:"q"
    });
    fAction(_this,config);
  }, {r:15})

  teleports.o = new Teleport(new SAT.Vector(500,530),game,{r:5});
  teleports.p = new Teleport(new SAT.Vector(900,530),game,{r:5});
  teleports.q = new Teleport(new SAT.Vector(900,530),game,{r:5});

  teleports.a = new Teleport(new SAT.Vector(100,250),game,{r:20});
  teleports.b = new Teleport(new SAT.Vector(300,250),game,{r:20});
  teleports.c = new Teleport(new SAT.Vector(500,250),game,{r:20});
  teleports.d = new Teleport(new SAT.Vector(700,250),game,{r:20});
  teleports.e = new Teleport(new SAT.Vector(900,250),game,{r:20});

  teleports.f = new Teleport(new SAT.Vector(100,530),game,{r:20});
  teleports.g = new Teleport(new SAT.Vector(300,530),game,{r:20,destiny:teleports.a});
  teleports.h = new Teleport(new SAT.Vector(500,530),game,{r:20,destiny:teleports.b});
  teleports.i = new Teleport(new SAT.Vector(700,530),game,{r:20,destiny:teleports.o});
  teleports.j = new Teleport(new SAT.Vector(900,530),game,{r:20});

  teleports.k = new Teleport(new SAT.Vector(100,400),game,{r:20,destiny:teleports.p});
  teleports.l = new Teleport(new SAT.Vector(400,400),game,{r:20,destiny:teleports.j});
  teleports.m = new Teleport(new SAT.Vector(600,400),game,{r:20,destiny:teleports.f});
  teleports.n = new Teleport(new SAT.Vector(900,400),game,{r:20,destiny:teleports.c});

  game.walls=walls;
  game.teleports=teleports;
  game.finish = finish;
  game.actions = actions;
  includeObjects(game);
})
