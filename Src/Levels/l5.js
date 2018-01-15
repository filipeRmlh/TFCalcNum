var l5 = (function(game){
  ENV.g.x=10;
  ENV.g.y=0;
  game.user.limit=3;
  var walls = {};
  var teleports = {};
  var actions={};
  var finish = {
    a:new Finish(new SAT.Vector(30,310),game,6, {r:5})
  }
  game.user.miny = 270;
  game.user.maxy = 350;
  game.user.minx = 70;
  game.user.maxx = 200;

  var fAction=function(_this,config){
    _this.activeAction=false;
    _this.colorchange=false;
    if(_this.game.finish.a.count==undefined)_this.game.finish.a.count=0;
    if(_this.game.finish.a.count>=3){
      ENV.setG(new SAT.V(-10,0),10);
      game.user.miny = 10;
      game.user.maxy = 610;
      game.user.minx = 1100;
      game.user.maxx = 1100;
      game.user.actions.mousemove(game.user,{clientX:0,clientY:0});
    }else{
      ENV.setG(config,10);
    }
    _this.game.finish.a.count++;
  }

  walls.a=new Wall(new SAT.Vector(0,310), new SAT.Vector(300,10),  20);
  walls.b=new Wall(new SAT.Vector(0,310),  new SAT.Vector(300,610),20);
  walls.c=new Wall(new SAT.Vector(200,310),new SAT.Vector(1000,310),10);

  walls.f=new Wall(new SAT.Vector(195,313),new SAT.Vector(230,270), 10);
  walls.d=new Wall(new SAT.Vector(195,307),new SAT.Vector(230,350), 10);


  walls.g=new Wall(new SAT.Vector(400,60),new SAT.Vector(440,210), 10);
  walls.h=new Wall(new SAT.Vector(440,410),new SAT.Vector(400,560), 10);
  //f2
  walls.i=new Wall(new SAT.Vector(420,10),new SAT.Vector(1000,10), 10);
  walls.j=new Wall(new SAT.Vector(420,70),new SAT.Vector(1000,70), 10);

  walls.k=new Wall(new SAT.Vector(420,610),new SAT.Vector(1000,610), 10);
  walls.l=new Wall(new SAT.Vector(420,550),new SAT.Vector(1000,550), 10);

  walls.m=new Wall(new SAT.Vector(425,15),new SAT.Vector(425,65), 10);
  walls.n=new Wall(new SAT.Vector(425,615),new SAT.Vector(425,545), 10);

  walls.o=new Wall(new SAT.Vector(425,615),new SAT.Vector(425,545), 10);

   actions.a=new Action(new SAT.Vector(1000,260),game,function(_this){
     game.walls.m.dontdraw=true;
     game.walls.n.dontdraw=true;
     fAction(_this,new SAT.V(0,10));
  }, {r:7});
  actions.b=new Action(new SAT.Vector(1000,360),game,function(_this){
    game.walls.m.dontdraw=true;
    game.walls.n.dontdraw=true;
    fAction(_this,new SAT.V(0,-10));
  }, {r:7});
  actions.c=new Action(new SAT.Vector(600,40),game,function(_this){
    game.walls.m.dontdraw=false;
    game.walls.n.dontdraw=false;
    fAction(_this,new SAT.V(10,0));
  }, {r:7});
  actions.d=new Action(new SAT.Vector(600,580),game,function(_this){
    game.walls.m.dontdraw=false;
    game.walls.n.dontdraw=false;
    fAction(_this,new SAT.V(10,0));
  }, {r:7});

  game.walls=walls;
  game.teleports=teleports;
  game.finish = finish;
  game.actions = actions;
  includeObjects(game);
})
