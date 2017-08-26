var ctx;
Object.prototype.isEmpty = function () {
    return Object.keys(this).length === 0;
}
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
    eval("import"+i.toUpperFirst().replace("s", "")+" = function(file){loadFile(\""+lista+"/"+i+"/\"+file.toLocaleLowerCase()+\".js\");}");
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
  window.addEventListener("load",f);
}
