var ctx;
getCookie=function(cookie){
  var regex =new RegExp("(?:(?:^|.*;\\s*)"+cookie+"\\s*\\=\\s*([^;]*).*$)|^.*$");
  if(document.cookie.replace(regex, "$1")==""){ return  undefined; }else{ return document.cookie.replace(regex, "$1");}
}
setCookie = function(cookie,value){
  document.cookie=cookie+"="+value;
}
loadLevel = function(level,game,force){//função para carregar os níveis e resetar configurações globais;
    game.screen.stopMovement();
    game.screen.obj = [];
    game.user.obj=[];
    game.user.first=0;
    var l = getCookie("level");
    var lu = getCookie("levelunblocked");
    if(l!=undefined){
      l = parseInt(l);
      if((l>level)&&(force!==true))
      level=l;
    }
    if(lu!=undefined){
      lu=parseInt(lu);
      if(lu<level)lu=level;
    }else{
      lu=level;
    }
    setCookie("level",level);
    setCookie("levelunblocked",lu);
    ENV.g.x=0;
    ENV.g.y=10;
    game.user.miny = 0;
    game.user.maxy = Infinity;
    game.user.minx = 0;
    game.user.maxx = Infinity;
    loadFile("/Src/Levels/l"+level+".js");
    var f=function(){};
    setTimeout(function(){
     try {
        f = eval("l"+level);
        game.walls=undefined;
        game.teleports=undefined;
        game.finish = undefined;
        game.actions = undefined;
        f(game);
     } catch (e) {
       loadFile("/Src/Levels/lf.js");
       setTimeout(function(){
         try {
            f = eval("lf");
            game.walls=undefined;
            game.teleports=undefined;
            game.finish = undefined;
            f(game);
         } catch (e) {
            console.log("Erro no carregamento de fase");
         }
       },500);
     }
    },500);
    countLevels();
}
_Prom = function(){};
_Prom.prototype={
  el:[],
  add:function(f){
    this.el.push(f);
  },
  exec:function(){
    for(var i=0;i<this.el.length;i++){
      this.el[i]();
    }
  }
}
var Prom = new _Prom();
Object.prototype.isEmpty = function () {
    return Object.keys(this).length === 0;
}
Math.pow2 = function(n){return Math.pow(n,2)};
String.prototype.toUpperFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var path = document.location+"";
path = (path.replace('/index.html',''));
var folderTree={
  Src:{
    Levels:{},
    Objects:{
      Elements:{
        Atom:{}
      }
    }
  }
};

function loadTree(obj,lista){
  if(obj.isEmpty())return;
  lista = ((lista===undefined)?'':lista);
  for (var i in obj){
    eval("import"+i.toUpperFirst().replace("s", "")+" = function(file,test){loadFile(\""+lista+"/"+i+"/\"+file.toLocaleLowerCase()+\".js\");if(test!=undefined){return(test)}}");
    loadTree(obj[i],lista+"/"+i.toUpperFirst());
  }
}

function loadFile(url){
  var fullpath = ((url[0]==='/')?'':'/')+url+"";
  if(document.querySelector("[src$=\""+fullpath+"\"]")==undefined){
    var html = document.querySelector("body");
    var elm = document.createElement("script");
    elm.setAttribute("src",path+url);
    html.appendChild(elm);
  }
}

loadTree(folderTree);
var load = function(f){
  window.addEventListener("load",function(){Prom.exec();f()});
}

function guiColor(j,n,cShadow){//função que gera css de colorização;
    var styleString = "";
    styleString=styleString+".color"+(n+1)+"{"+
    "border-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%);"+
    "color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%) !important;"+
    "background-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+((cShadow[j].l>57)?10:90)+"%)  !important;}";

    styleString=styleString+".colorBtn"+(n+1)+"{"+
    "border-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%);"+
    "color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%) !important;"+
    "background-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+((cShadow[j].l>57)?10:90)+"%)  !important;}";

    styleString=styleString+".colorBtn"+(n+1)+":hover,.colorBtn"+(n+1)+":active,.colorBtn"+(n+1)+":focus{"+
    "border-color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+(100-cShadow[j].l)+"%);"+
    "color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+(100-cShadow[j].l)+"%) !important;"+
    "background-color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+((cShadow[j].l>57)?80:20)+"%)  !important;}";

    styleString=styleString+".reverseColorBtn"+(n+1)+":hover,.reverseColorBtn"+(n+1)+":active,.reverseColorBtn"+(n+1)+":focus{"+
    "border-color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+((cShadow[j].l>57)?80:20)+"%);"+
    "color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+((cShadow[j].l>57)?80:20)+"%) !important;"+
    "background-color:hsl("+(cShadow[j].h)+","+(cShadow[j].s)+"%,"+(100-cShadow[j].l)+"%)  !important;}";

    styleString=styleString+".reverseColor"+(n+1)+"{"+
    "background-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+cShadow[j].l+"%) !important;"+
    "border-color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+((cShadow[j].l>57)?10:90)+"%);"+
    "color:hsl("+cShadow[j].h+","+cShadow[j].s+"%,"+((cShadow[j].l>57)?10:90)+"%)  !important;}";
    return styleString;
}

var countLevels = function(){ //Função que escreve os níveis no menu;
  var l = getCookie("levelunblocked");
  var cont = document.querySelectorAll(".optionsm")[0];
  cont.innerHTML="";
  for(var i=1;i<=l;i++){
    var el = document.createElement("div");
    el.setAttribute("id","l"+(i));
    el.setAttribute("class","levelblock colorBtn2");
    el.setAttribute("onclick","loadLevel("+i+",game,true)");
    el.innerText="Nível "+i;
    cont.appendChild(el);
  }
}
optionsOpened = false;
toggleOptions = function(){//função que faz o menu aparecer e esconder;
  var menuKey = document.querySelectorAll("#keyopen")[0];
  var menu = document.querySelectorAll("#options")[0];
  menuKey.blur();
  if(optionsOpened){
    menuKey.style="";
    menuKey.innerText="Fechar";
    menu.style="";
    optionsOpened=false;
  }else{
    menuKey.style="width:100%;height:100%; text-align:center; padding:20px 0";
    menuKey.innerText="Menu";
    menu.style="width:50px; height:50px; border-radius:200px; top:none; bottom:20px !important;right:20px!important";
    optionsOpened=true;
  }
}
