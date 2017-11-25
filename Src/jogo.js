importObject("Screen");
importObject("Sphere");
importObject("Wall");
var jan;
load(function(){
  var N=50;
  var xs1=1;
  var xs2 = 4;
  var restC = 0.9;
var myscreen = new Screen("canvas",30,{material:new Material("Air")}); // instancia objeto Screen dando elemento html, número de fps e material pra densidade;
/*
  n calcula a precisão por segundo de reprodução da animação sem alterar o tempo. ou seja, se
antes de alterar n a esfera andava 8 segundos entre dois pontos a e b, depois de
alterar n ela vai demorar os mesmos 8 segundos para andar de a até b;
  xspeed1 altera a velocidade de reprodução da animação alterando a precisão dos
calculos pois ele influencia diretamente em h. A vantagem é que xspeed1 não está
limitado a velocidade de processamento do processador.
  xspeed2 altera a velocidade de reprodução da animação sem alterar a precisão
do cálculo, mas está condicionado a velocidade de processamento e não pode ter
um valor em que multiplicado por n seja maior que 200;
*/

var c = new Sphere(new SAT.Vector(220, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Iron"),fillcolor:"blue",restCoef:restC});
var d = new Sphere(new SAT.Vector(220, 120),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var e = new Sphere(new SAT.Vector(280, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var f = new Sphere(new SAT.Vector(310, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var g = new Sphere(new SAT.Vector(330, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var h = new Sphere(new SAT.Vector(350, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var i = new Sphere(new SAT.Vector(370, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
var f0 = new Wall(new SAT.Vector(25,25), new SAT.Vector(1000,25), 50,  {fillcolor:"green"});
var f1 = new Wall(new SAT.Vector(25,25),  new SAT.Vector(25,500),  50,  {fillcolor:"purple"});
var f2 = new Wall(new SAT.Vector(1000,25),new SAT.Vector(1000,500),50,  {fillcolor:"pink"});
var f3 = new Wall(new SAT.Vector(25,500),new SAT.Vector(1000,500),50,  {fillcolor:"blue"});
var f4 = new Wall(new SAT.Vector(240,600),new SAT.Vector(290,320),50,  {fillcolor:"red"});


myscreen.add(f0);
myscreen.add(f1);
myscreen.add(f2);
myscreen.add(f3);
myscreen.add(f4);

myscreen.add(c);
myscreen.add(d);
myscreen.add(e);
myscreen.add(f);
myscreen.add(g);
myscreen.add(h);
myscreen.add(i);


});
