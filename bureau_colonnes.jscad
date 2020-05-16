// GENERATEUR DE BUREAU COMPOSE DE COLONNES ET D'UN PLATEAU (main)
// GENERATEUR D'ETAGERE SUR UNE COLONNE (FaitColonne)

function main(){
  var r = []; // TABLEAU CONTENANT CE QUE L'ON VEUT AFFICHER
  
  /*
  COMMENCER PAR FAIRE LES COLONNES UNE PAR UNE (FaitColonne)
  AJOUTER CHAQUE COLONNE à r (r.push)
  Lors de l'ajout, TOURNER (rotate), et PLACER (translate) SI BESOIN
  Il est possible d'utiliser plusieurs fois la même colonne (l'ajouter x fois)
  
  AJOUTER LE PLATEAU UNE FOIS LES COLONNES PLACEES
  (OU AU CONTRAIRE, COMMENCER PAR LE PLATEAU PUIS PLACER CHAQUE COLONNE)
  */
  
  // COLONNES
  var BLEU = color("blue", faitColonne(4, 42, 40, [40,30,20]));
  var VERT = color("green", faitColonne(4, 40+40, 40, [20,30,40]));
  var ROUGE = color("red", faitColonne(4, 50, 48, [47, 47]));
  var JAUNE = color("yellow", faitColonne(4, 40, 50, [30,30,30]));

  // PLACEMENT 
  r.push(BLEU.translate([0, -2, 0]));
  r.push(rotate([0, 0, 90], VERT).translate([40, -100, 0]));
  r.push(ROUGE.translate([-50+2, -60, 0]));
  r.push(rotate([0, 0, 90], JAUNE).translate([0, 0-2, 0]));
  
  // PLATEAU 
  var PLATEAU = cube([120,200,8]);
  r.push(PLATEAU.translate([-65,-125,106]));
  
  return r;
}

// les hauteurs des niches sont du bas vers le haut
function faitColonne(lBase, largeur, profondeur, niches){
  var retour = [];
  base = cube(lBase);
  
  var h = niches[0];
  var ligne = cube([lBase, largeur, lBase]);
  
  var hBase = 0;
  for(var i = 0; i < niches.length; i++){
    h = niches[i];
    var colonne = cube([lBase, lBase, h]);
    
    // coins
    if(i === 0){ // Coins du bas et ligne du bas seulement pour la 1ere niche
      retour.push(base.translate([0, 0, hBase+0]));
      retour.push(base.translate([0, lBase+largeur, hBase+0]));
      retour.push(ligne.translate([0,lBase,hBase+0]));
    }
    
    // coins du haut
    retour.push(base.translate([0, 0, hBase+h+lBase]));
    retour.push(base.translate([0, lBase+largeur, hBase+h+lBase]));

    // lignes
    retour.push(ligne.translate([0,lBase,hBase+h+lBase]));
  
    // colonnes
    retour.push(colonne.translate([0,0,hBase+lBase]));
    retour.push(colonne.translate([0,lBase+largeur,hBase+lBase]));
    
    hBase = hBase+h+lBase;
  }
  return scale([profondeur/lBase,1,1], union(retour));
  }
