var l1 = (function(game){
  var walls = {};
  var teleports = {};
  var finish = {
    a:new Finish(new SAT.Vector(500,450),game,2, {r:10})
}
  game.user.miny = 200;
  game.user.maxy = 200;
  game.user.minx = 70;
  game.user.maxx = 950;

  walls.a=new Wall(new SAT.Vector(0,25), new SAT.Vector(1000,25),  50);
  walls.b=new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,625),  50);
  walls.c=new Wall(new SAT.Vector(1000,0),new SAT.Vector(1000,625),50);
  walls.d=new Wall(new SAT.Vector(0,600),new SAT.Vector(1025,600), 50);



  game.teleports = teleports;
  game.walls = walls;
  game.finish = finish;
  includeObjects(game);
});
