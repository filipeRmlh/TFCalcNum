importObject("Screen");
importObject("Sphere");
importObject("Wall");
load(function(){
  var N=100;
  var h=0.0001
  var myscreen = new Screen("canvas",24,{material:new Material("Air")}); // instancia objeto Screen dando elemento html e número de fps;
//  var a = new Sphere({x:100,y:100}, {name:"a",massa:10,r:10, fillcolor:"red",   n:N});
//  var b = new Sphere(new SAT.Vector(130, 120),  {name:"b",r:20,material:new Material("Air"),          fillcolor:"green", h:h,n:N});
  var c = new Sphere(new SAT.Vector(230, 200),  {name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"blue",  h:h});
  // var d = new Sphere({x:130,y:90},  {name:"d",r:7, material:new Material("Cupper"),       fillcolor:"cyan",  h:h,n:N});
  // var e = new Sphere({x:130,y:90},  {name:"e",r:3, material:new Material("Paper"),        fillcolor:"yellow",h:h,n:N});
  // var f = new Sphere({x:130,y:90},  {name:"f",r:25,material:new Material("Vacuum"),       fillcolor:"black", h:h,n:N});
  // var g = new Sphere({x:130,y:90},  {name:"g",r:20,material:new Material("Acrylic"),      fillcolor:"purple",h:h,n:N});
   bola = c;
 // var f0 = new Wall(new SAT.Vector(25,25), new SAT.Vector(1000,25), 50,  {fillcolor:"#66aa77"});
 // var f1 = new Wall(new SAT.Vector(25,0),  new SAT.Vector(25,500),  50,  {fillcolor:"#66aa77"});
 // var f2 = new Wall(new SAT.Vector(1000,0),new SAT.Vector(1000,500),50,  {fillcolor:"#66aa77"});
 // var f3 = new Wall(new SAT.Vector(25,475),new SAT.Vector(1000,475),50,  {fillcolor:"#66aa77"});

 var f5 = new Wall(new SAT.Vector(100,300), new SAT.Vector(500,200),20,  {fillcolor:"#66aa77"});
//
 // myscreen.add(f0);
 // myscreen.add(f1);
 // myscreen.add(f2);
  // myscreen.add(f3);
//
  myscreen.add(f5);
  // myscreen.add(a);
//  myscreen.add(b);
  myscreen.add(c);
  // myscreen.add(d);
  // myscreen.add(e);
  // myscreen.add(f);
  // myscreen.add(g);
});
