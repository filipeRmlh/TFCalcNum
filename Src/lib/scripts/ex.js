


//----------------------USO DO CODIGO-----------------------------


/*
->declare um novo objeto da Classe HarmonicColor()

	objeto = new HarmonicColor();

->declare uma variavel que receba o retorno do metodo escolhido dentro do objeto. Este pode ser analog ou shadow.

	novavariavel = objeto.analog(a,b,c); ou novavariavel = objeto.shadow(a,b,c)

	a = Objeto com os dados aos quais as cores serão aplicadas;
	b = Tipo de saída - "rgb" ou "hsl";
	c = Range do espectro (Se for analog) ou faixa de tonalidades (se for shadow). Ambas em %;

->o retorno será um array de objetos com valores das cores. Logo para acessar os valores é necessario especificar a posição do array e depois pegar a componente da cor desejada.
	se for hsl:
		novavariavel[i].h; para pegar HUE;
		novavariavel[i].s; para pegar SATURATION;
		novavariavel[i].l; para pegar LUMINOSITY;
	se for rgb:
		novavariavel[i].r; para pegar RED;
		novavariavel[i].g; para pegar BLUE;
		novavariavel[i].b; para pegar GREEN;
-------------------------------------------------------------------------------------*/





var graph = document.getElementById("graph");
var graph2 = document.getElementById("graph2");

var minhas_cores = new HarmonicColor();

var cores =  minhas_cores.analog({a:1,b:2, d:4,e:5, f:6, g:7},"hsl", 50);

var tonalidades =  minhas_cores.shadow({a:1,b:2, d:4,e:5, f:6, g:7},"hsl", 50);

var tamanho = cores.length;

for(var i = 0; i<tamanho; i++){
	var item = document.createElement("div");

	item.style.backgroundColor = "hsl("+cores[i].h+","+cores[i].s+"%,"+cores[i].l+"%)";

	item.style.width = "100px";
	item.style.height = "50px";
	item.style.marginTop = "10px";
	item.style.boxShadow = "0px 0px 5px #000"; 
	item.style.borderRadius = "3px";


	graph.appendChild(item);
}

for(var i = 0; i<tamanho; i++){
	var item = document.createElement("div");

	item.style.backgroundColor = "hsl("+tonalidades[i].h+","+tonalidades[i].s+"%,"+tonalidades[i].l+"%)";

	item.style.width = "100px";
	item.style.height = "50px";
	item.style.marginTop = "10px";
	item.style.boxShadow = "0px 0px 5px #000"; 
	item.style.borderRadius = "3px";

	graph2.appendChild(item);
}
   		