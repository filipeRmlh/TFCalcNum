var lf = (function(game){
  var walls = {};
  var finish = {
    a:new Finish(new SAT.Vector(140,250),game,1, {clearSave:true,r:30,textBox:{font:"14pt Helvetica",text:"Reiniciar",pos:new SAT.V(-35,50)}})
  }
  var actions = {
      a:new Action(new SAT.Vector(800,250),game,function(_this){
        _this.game.user.openModal();
      }, {r:30,textBox:{color:"#444444",font:"14pt Helvetica",text:"Abrir Relatório",pos:new SAT.V(-54,50)}})
  }
  actions.a.activeCollision=true;
  game.user.miny = 100;
  game.user.maxy = 100;
  walls.a=new Wall(new SAT.Vector(0,25), new SAT.Vector(945,25),  50);
  walls.b=new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,625),  50);
  walls.c=new Wall(new SAT.Vector(920,0),new SAT.Vector(920,625),50);
  walls.d=new Wall(new SAT.Vector(0,600),new SAT.Vector(945,600), 50);

  // walls.a=new Wall(new SAT.Vector(25,25), new SAT.Vector(920,25),  50);
  // walls.b=new Wall(new SAT.Vector(25,25),  new SAT.Vector(25,500),  50);
  // walls.c=new Wall(new SAT.Vector(920,25),new SAT.Vector(920,500),50);
  //walls.d=new Wall(new SAT.Vector(25,500),new SAT.Vector(920,500), 50);

  walls.f=new Wall(new SAT.Vector(240,200),new SAT.Vector(330,200), 10);
  walls.g=new Wall(new SAT.Vector(240,250),new SAT.Vector(300,250), 10);
  walls.h=new Wall(new SAT.Vector(244,195),new SAT.Vector(244,300), 10);
  walls.i=new Wall(new SAT.Vector(444,195),new SAT.Vector(444,300), 10);

  walls.l=new Wall(new SAT.Vector(574,199),new SAT.Vector(637,250), 10);
  walls.m=new Wall(new SAT.Vector(694,199),new SAT.Vector(631,250), 10);
  walls.j=new Wall(new SAT.Vector(574,195),new SAT.Vector(574,305), 10);
  walls.k=new Wall(new SAT.Vector(694,195),new SAT.Vector(694,305), 10);


  // walls.n=new Wall(new SAT.Vector(470,120),new SAT.Vector(220,150), 10);
  // walls.o=new Wall(new SAT.Vector(470,120),new SAT.Vector(720,150), 10);


  game.walls=walls;
  game.finish = finish;
  game.actions = actions;
  includeObjects(game);
});
