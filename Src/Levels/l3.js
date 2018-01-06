var l3 = (function(game){
  var walls = {};
  var teleports = {};
  var finish = {
    a:new Finish(new SAT.Vector(247,520),game,4, {r:10})
  }
  game.user.miny = 70;
  game.user.maxy = 400;
  game.user.minx = 67;
  game.user.maxx = 67;
  walls.a=new Wall(new SAT.Vector(0,25), new SAT.Vector(1000,25),  50);
  walls.b=new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,625),  50);
  walls.c=new Wall(new SAT.Vector(1000,0),new SAT.Vector(1000,625),50);
  walls.d=new Wall(new SAT.Vector(0,600),new SAT.Vector(1025,600), 50);
  walls.f=new Wall(new SAT.Vector(90,50),new SAT.Vector(90,400), 10);
  walls.g=new Wall(new SAT.Vector(85,400),new SAT.Vector(140,400), 10);

  walls.h=new Wall(new SAT.Vector(49,467),new SAT.Vector(87,477), 10);

  walls.i=new Wall(new SAT.Vector(85,477),new SAT.Vector(183,477), 10);

  walls.j=new Wall(new SAT.Vector(230,460),new SAT.Vector(230,540), 10);
  walls.k=new Wall(new SAT.Vector(264,460),new SAT.Vector(264,540), 10);
  walls.l=new Wall(new SAT.Vector(225,540),new SAT.Vector(269,540), 10);

  walls.m=new Wall(new SAT.Vector(190,380),new SAT.Vector(263,400), 10);

  game.walls=walls;
  game.teleports=teleports;
  game.finish = finish;
  includeObjects(game);
})
