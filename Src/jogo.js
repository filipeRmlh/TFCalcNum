importObject("Screen");
importObject("Sphere");
importObject("Wall");
load(function(){
  var N=100;
  var h=0.0001
var myscreen = new Screen("canvas",24,{material:new Material("Vacuum")}); // instancia objeto Screen dando elemento html e número de fps;
var c = new Sphere(new SAT.Vector(220, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"blue"});
var d = new Sphere(new SAT.Vector(260, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
var e = new Sphere(new SAT.Vector(280, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
var f = new Sphere(new SAT.Vector(310, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
var g = new Sphere(new SAT.Vector(330, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
var h = new Sphere(new SAT.Vector(350, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
var i = new Sphere(new SAT.Vector(370, 90),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green"});
   bola = c;
var f0 = new Wall(new SAT.Vector(25,25), new SAT.Vector(1000,25), 50,  {fillcolor:"green"});
var f1 = new Wall(new SAT.Vector(25,25),  new SAT.Vector(25,500),  50,  {fillcolor:"purple"});
var f2 = new Wall(new SAT.Vector(1000,25),new SAT.Vector(1000,500),50,  {fillcolor:"pink"});
var f3 = new Wall(new SAT.Vector(25,500),new SAT.Vector(1000,500),50,  {fillcolor:"blue"});
//var f4 = new Wall(new SAT.Vector(260,390),new SAT.Vector(250,520),50,  {fillcolor:"red"});


myscreen.add(f0);
myscreen.add(f1);
myscreen.add(f2);
myscreen.add(f3);
myscreen.add(d);
// myscreen.add(f4);
myscreen.add(c);
myscreen.add(e);
myscreen.add(f);
myscreen.add(g);
myscreen.add(h);
myscreen.add(i);

});
