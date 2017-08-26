importObject("Screen");
importObject("Carga");
importObject("Wall");

load(function(){
  var myscreen = new Screen("canvas",24); // instancia objeto Screen dando elemento html e número de fps;
  // var b = new Carga(10,{x:100,y:100},10, {bordercolor:"#000000",fillcolor:"red"});
   var c = new Carga(10,{x:200,y:300},10, {bordercolor:"#000000",fillcolor:"red"});
  var f = new Wall(10, new Point(100,100), new Point(200,300), {fillcolor:"red"});
  var f2 = new Wall(10, new Point(400,400), new Point(500,500), {fillcolor:"green"});
  myscreen.obj.push(f);
  myscreen.obj.push(f2);
   myscreen.obj.push(c);
});
