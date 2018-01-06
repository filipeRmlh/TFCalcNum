var ctx;
loadLevel = function(level,game){
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

function guiColor(j,n,cShadow){
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
