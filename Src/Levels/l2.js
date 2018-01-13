var l2 = (function(game){
  var walls = {};
  var teleports = {};
  var finish = {
    a:new Finish(new SAT.Vector(500,300),game,3, {r:10})
  }

  game.user.miny = 100;
  game.user.maxy = 250;
  game.user.minx = 320;
  game.user.maxx = 320;

  walls.a=new Wall(new SAT.Vector(0,25), new SAT.Vector(1000,25),  50);
  walls.b=new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,625),  50);
  walls.c=new Wall(new SAT.Vector(1000,0),new SAT.Vector(1000,625),50);
  walls.d=new Wall(new SAT.Vector(0,600),new SAT.Vector(1025,600), 50);
  walls.f=new Wall(new SAT.Vector(290,300),new SAT.Vector(350,320), 10);


  game.walls=walls;
  game.teleports=teleports;
  game.finish = finish;
  includeObjects(game);
})
