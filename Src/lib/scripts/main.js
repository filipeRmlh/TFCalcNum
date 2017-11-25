(function(){
  	HarmonicColor = function(){}
    HarmonicColor.prototype = {
    	type : "bar",
		
		 hslToRgb: function(corhsl){
		    var r, g, b;

		    var h = corhsl.h/360;
		    var s = corhsl.s/100;
		    var l = corhsl.l/100;

		    
		    if(s == 0){
		        r = g = b = l; // achromatic
		    }else{
		        var hue2rgb = function hue2rgb(p, q, t){
		            if(t < 0) t += 1;
		            if(t > 1) t -= 1;
		            if(t < 1/6) return p + (q - p) * 6 * t;
		            if(t < 1/2) return q;
		            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		            return p;
		        }

		        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		        var p = 2 * l - q;
		        r = hue2rgb(p, q, h + 1/3);
		        g = hue2rgb(p, q, h);
		        b = hue2rgb(p, q, h - 1/3);
		    }

		    return {r:Math.round(r * 255), g:Math.round(g * 255), b:Math.round(b * 255)};
		}
    	,
    	shadow: function(data,out,range){


    		if(range == undefined){
    			range = 100;
    		}

    		var max = Math.round(Math.random()*100);
    		var min = Math.abs(max - range);

    		var numdata = Object.keys(data).length;
    		var mainh = Math.round(Math.random()*360);
    		var mains = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    		var mainl = Math.floor(Math.random() * (max - min + 1)) + min;

    		var h = mainh;
    		var s = mains;
    		var l = mainl;

    		
    		saida = [];

    		var sentido = "up";


    		var intervalo = Math.round(range/numdata);

    		for(var i=0; i<numdata; i++){

    			if(l>80){
    				sentido = "down";
    			}

    			if(l<20){
    				sentido = "up";
    			}

    			if(sentido == "up")
    			{
    				l = l+intervalo;
    			}

    			if(sentido == "down")
    			{
    				l = l-intervalo;
    			}

    			if(out == "hsl"){
    				saida[i] = {h: h, s: s, l: l};
    			}else{
    				saida[i] = this.hslToRgb({h: h, s: s, l: l});
    			}

    		}

    		return saida;
    	},
    	analog: function(data,out,range){

    		if(range == undefined){
    			range = 100;
    		}

    		range=(360*range)/100;

    		console.log(range);

    		var max = Math.round(Math.random()*360);

    		console.log(max);

    		var min = Math.abs(max - range);

    		console.log(min);

    		var numdata = Object.keys(data).length;
    		var mainh = Math.floor(Math.random() * (max - min + 1)) + min;
    		var mains = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
    		var mainl = Math.floor(Math.random() * (80 - 40 + 1)) + 40;

    		var h = mainh;
    		var s = mains;
    		var l = mainl;
    		
    		saida = [];

    		var intervalo = Math.round(range/numdata);

    		for(var i=0; i<numdata; i++){

    			if(h>360){

    				h = h-360;
    			}
   			
    			if(out == "hsl"){
    				saida[i] = {h: h, s: s, l: l};
    			}else{
    				saida[i] = this.hslToRgb({h: h, s: s, l: l});
    			}

    			h = h+intervalo;
    		}

    		return saida;
    	}
    } 
})()


    
