importObject("Screen");
importObject("Sphere");
importObject("Wall");
load(function(){
  var myscreen = new Screen("canvas",34,{material:Material.Water}); // instancia objeto Screen dando elemento html e número de fps;
  var a = new Sphere({x:100,y:100}, {name:"a",r:30,material:Material.Paper,fillcolor:"red",h:10});
  var b = new Sphere({x:130,y:80}, {name:"b",r:15,material:Material.Air,fillcolor:"green",h:10});
  var c = new Sphere({x:130,y:90}, {name:"c",r:10,material:Material.Polypropylene,fillcolor:"blue",h:10});
  var d = new Sphere({x:130,y:90}, {name:"d",r:7,material:Material.Cupper,fillcolor:"cyan",h:10});
  var e = new Sphere({x:130,y:90}, {name:"e",r:3,material:Material.Paper,fillcolor:"yellow",h:10});
  var f = new Sphere({x:130,y:90}, {name:"f",r:25,material:Material.Vacuum,fillcolor:"black",h:10});
  var g = new Sphere({x:130,y:90}, {name:"g",r:20,material:Material.Acrylic,fillcolor:"purple",h:10});


  var f0 = new Wall(new Vector(25,25), new Vector(1000,25),50,  {color:"#66aa77"});
  var f1 = new Wall(new Vector(25,0), new Vector(25,500),50,  {color:"#66aa77"});
  var f2 = new Wall(new Vector(1000,0), new Vector(1000,500),50,  {color:"#66aa77"});
  var f3 = new Wall(new Vector(25,475), new Vector(1000,475),50,  {color:"#66aa77"});

  var f5 = new Wall(new Vector(20,300), new Vector(500,500),10,  {color:"#66aa77"});

  myscreen.add(f0);
  myscreen.add(f1);
  myscreen.add(f2);
  myscreen.add(f3);

  myscreen.add(f5);
  myscreen.add(a);
  myscreen.add(b);
  myscreen.add(c);
  myscreen.add(d);
  myscreen.add(e);
  myscreen.add(f);
  myscreen.add(g);
});
