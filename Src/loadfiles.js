var ctx;
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
  var html = document.querySelector("body");
    var elm = document.createElement("script");
    elm.setAttribute("src",path+url);
    html.appendChild(elm);
}

loadTree(folderTree);
var load = function(f){
  window.addEventListener("load",function(){Prom.exec();f()});
}
