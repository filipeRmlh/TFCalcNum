Material=function(standard){
  standard=(standard==undefined)?"Vacuum":standard;
  this.Standard=this[standard];
}
Material.prototype={
  Custom:{density:0},
  Polypropylene:{density:0.9},
  Acrylic:{density:1.19},
  Aluminum:{density:2.7},
  Carbon:{density:3.51},
  Glass:{density:2.4},
  Iron:{density:7.87},
  Paper:{density:0.7},
  Silver:{density:10.5},
  Titanium:{density:4.5},
  Bamboo:{density:0.3},
  Cupper:{density:8.93},
  Air:{density:0.001225},
  Water:{density:1},
  Vacuum:{density:0}
}
Material.prototype.getMaterial=function(properties){
  var volume = properties.volume;
  var massa = properties.massa;
  var density = properties.density;
  var retorno = {massa:(massa||0),volume:(volume||0),density:(density||0)};
    if(volume==undefined){
      if(massa==undefined){
        if(density!=undefined){//volume indefinido; massa indefinida;  densidade definida
          retorno.volume = 20;
          retorno.massa=retorno.density*retorno.volume;
        }
      }else{
        if(density==undefined){//volume indefinido; massa definida; densidade indefinida
          retorno.density = this.Standard.density;
          retorno.volume = retorno.massa/retorno.density;
        }else{//volume indefinido; massa definida; densidade definida
          retorno.volume = retorno.massa/retorno.density;
        }
      }
    }else{
      if(massa==undefined){
        if(density==undefined){//volume definido; massa indefinida; densidade indefinida
          retorno.density = this.Standard.density;
          retorno.massa=retorno.density*retorno.volume;
        }else{//volume definido; massa indefinida; densidade definida
          retorno.massa=retorno.density*retorno.volume;
        }
      }else{
        retorno.density=retorno.massa/retorno.volume;
        this.Custom.density = retorno.density;
        this.Standard = this.Custom;
      }
    }
    return retorno;
}
