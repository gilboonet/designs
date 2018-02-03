// générateur de traverses entrecroisées
// Gilbert Duval 2017-02-14

// en entrée : largeur, épaisseur, hauteur, encoches, nombre
// (encoches = 
//		emplacement encoche 1, hauteur si besoin ;
//		emplacement encoche 2, hauteur si besoin ;
//		..
//		emplacement encoche n, hauteur si besoin
// )
function getParameterDefinitions() {
  return [
    { name: 'largeur', type: 'float', initial: 100, caption: "Largeur (mm):" },
    { name: 'epaisseur', type: 'float', initial: 6, caption: "Epaisseur (mm):" },
    { name: 'hauteur', type:'float', initial: 40, caption: "Hauteur (mm):"},
    { name: 'encoches', type:'text', initial: "30;70,25", caption: "Encoches(mm) :"},
    { name: 'nb', type:'int', initial: 1, caption: "Nombre:", min:1}
    
  ];
}


function main(params) {
var i, // pour les boucles
	traverse, // rectangle représentant la traverse
	donneesEncoches, // données permettant de former les encoches
	donneeEncoche, // tableau contenant les données d'une encoche
	Y, // emplacement de l'encoche
	H, // hauteur de l'encoche si besoin
	retour // tableau contenant toutes les traverses demandées
	
// création du rectangle représentant la traverse
traverse = square({size: [params.largeur,params.hauteur], center: false});
  
// récupération des données sur les encoches
donneesEncoches = params.encoches.split(';');
  
// création du tableau des encoches
encoches = [];
// parcours des données sur les encoches
for(i=0; i < donneesEncoches.length; i++){
	// récupération des données sur l'encoche courante (i)
	donneesEncoche = donneesEncoches[i].split(',');
	Y = parseFloat(donneesEncoche[0]); // emplacement en Y
	// si une autre donnée est présente... 
	if(donneesEncoche.length == 2){
		// ... c'est une hauteur spécifique
		H = parseFloat(donneesEncoche[1]);
	}else{
		// ... sinon on prend la moitié de la hauteur de la traverse
		H = params.hauteur / 2;
	}
	// Avec les données récupérées on crée l'encoche courante
	encoche = square({size: [params.epaisseur, H], center: false})
		.translate([Y,0]); 
	// Ajout de l'encoche courante au tableau des encoches
	encoches.push(encoche);
}
// On supprime toutes les encoches (tout le tableau) à la traverse
traverse = traverse.subtract(encoches);

// création du tableau de retour
retour = [];
// parcours pour autant de traverses que demandé
for(i = 0; i< params.nb; i++){
	// ajout d'une traverse en décalant de la hauteur + 1
	retour.push(traverse.translate([0,i * (params.hauteur+1)]));
}

// retour   
return retour;
}
