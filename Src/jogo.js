importObject("Screen");
importObject("Sphere");
importObject("Wall");
importObject("User");
importObject("Finish");
importObject("Action");
importObject("Teleport");
var c = new HarmonicColor();
includeObjects = function(game){
  var style=document.getElementById("mystyle");
  var cShadow = c.shadow(game.walls,"hsl",50);
  var size = Object.keys(game.walls).length, styleString="",k=Math.floor(size/3),j=0,mult=0;
  for(var i in game.walls){
    if(game.walls.hasOwnProperty(i)){
      game.walls[i].element.options.fillcolor="hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%)";//coloriza as paredes do canvas
      game.screen.add(game.walls[i]);
      if(j==mult*k){
        styleString = styleString+guiColor(j,mult,cShadow);//constroi classes css pra colorizar a página
        mult++;
      }
      j++;
    }
  }
  var wallMiddleColor = cShadow[Math.ceil(size/2)];

  j=0
  for(var i in game.teleports){
    if(game.teleports.hasOwnProperty(i)){
      game.screen.add(game.teleports[i]);
      j++;
    }
  }
  for(var i in game.actions){
    if(game.actions.hasOwnProperty(i)){
      game.screen.add(game.actions[i]);
    }
  }
  style.innerHTML=style.innerHTML+styleString;//faz 'append' das classes construidas no elemento style do html;
  if(game.finish!=undefined){
    for(var i in game.finish){
      if(game.finish.hasOwnProperty(i)){
        game.finish[i].color = wallMiddleColor;
        game.screen.add(game.finish[i]);
      }
    }
    game.screen.startMovement();//inicializa tudo;
  }
}
load(function(){
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
  var settings = {
    N:50,
    xs1:1,
    xs2:2,
    restC:0.9,
  }
  // instancia objeto Screen dando elemento html, número de fps e material pra densidade;
  var myscreen =new Screen("canvas",30,{material:new Material("Air")});
  ENV.origin  = new SAT.V(1100,200);
  ENV.drawScale = 3;
  game = {
    user:new User(settings,myscreen),
    screen:myscreen
  }
  loadLevel(1,game);
});
