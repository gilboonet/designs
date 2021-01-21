// GENERATEUR D'ESCALIER DE NICHES - Gilbert Duval 2021

largeur = 40;
hauteur = 30;
profondeur = 20;
epaisseur = 4;
avecFond = true;
nbMarches = 2;
inverser = false;

uniteV = (largeur - epaisseur/2)  * (inverser ? -1 : 1);
uniteH = (hauteur - epaisseur/2);

for(i = [1 : nbMarches])
  translate([(i-1) * uniteV, 0, 0])
    colonne(i);

module colonne(n){
  for( j = [1 : n])
    translate([0, 0, (j-1) * uniteH])
      niche();
}

module niche(){
difference() {
cube(size = [largeur, profondeur, hauteur], center = true);
translate([0, avecFond ? -epaisseur : 0, 0])
  cube(size = [largeur - epaisseur, profondeur + 0*0.1,
               hauteur - epaisseur], center = true);
}
}