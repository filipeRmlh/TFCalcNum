importObject("Screen");
importObject("Sphere");
importObject("Wall");
var c = new HarmonicColor();
load(function(){
  var N=50;
  var xs1=1;
  var xs2 = 4;
  var restC = 0.9;
myscreen = new Screen("canvas",30,{material:new Material("Air")}); // instancia objeto Screen dando elemento html, número de fps e material pra densidade;
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

var spheres = {};
var walls = {};

spheres.a=new Sphere(new SAT.Vector(220, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Iron"),fillcolor:"rgb(0,255,0)",restCoef:restC});
spheres.b=new Sphere(new SAT.Vector(220, 120),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Air"),fillcolor:"pink",restCoef:restC});
spheres.c=new Sphere(new SAT.Vector(280, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",massa:10000,material:new Material("Water"),fillcolor:"purple",restCoef:restC});
spheres.d=new Sphere(new SAT.Vector(310, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
spheres.e=new Sphere(new SAT.Vector(330, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
spheres.f=new Sphere(new SAT.Vector(350, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});
spheres.g=new Sphere(new SAT.Vector(370, 90),  {xspeed2:xs2,xspeed1:xs1,n:N,name:"c",r:10,material:new Material("Polypropylene"),fillcolor:"green",restCoef:restC});

walls.a=new Wall(new SAT.Vector(25,25), new SAT.Vector(1000,25),  50);
walls.b=new Wall(new SAT.Vector(25,25),  new SAT.Vector(25,500),  50);
walls.c=new Wall(new SAT.Vector(1000,25),new SAT.Vector(1000,500),50);
walls.d=new Wall(new SAT.Vector(25,500),new SAT.Vector(1000,500), 50);
walls.e=new Wall(new SAT.Vector(240,600),new SAT.Vector(290,320), 50);
walls.f=new Wall(new SAT.Vector(290,300),new SAT.Vector(350,320), 50);

var cAnalog = c.analog(spheres,"rgb",50);
var j=0;
for(var i in spheres){
  if(spheres.hasOwnProperty(i)){
    spheres[i].element.options.fillcolor="rgb("+cAnalog[j].r+","+cAnalog[j].g+","+cAnalog[j].b+")";
    myscreen.add(spheres[i]);
    j++;
  }
}

var cShadow = c.shadow(walls,"rgb",50);
j=0;
for(var i in walls){
  if(walls.hasOwnProperty(i)){
    walls[i].element.options.fillcolor="rgb("+cShadow[j].r+","+cShadow[j].g+","+cShadow[j].b+")";
    myscreen.add(walls[i]);
    j++;
  }
}
myscreen.startMovement();

});
