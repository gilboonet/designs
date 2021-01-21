// GENERATEUR DE CARRE DE NICHES - Gilbert Duval 2021

largeur = 40;
hauteur = 30;
profondeur = 20;
epaisseur = 4;
avecFond = true;
nbParCote = 2;
uniteV = (largeur - epaisseur/2);
uniteH = (hauteur - epaisseur/2);

colonne(nbParCote);
translate([-nbParCote * uniteV, 0, uniteH])colonne(nbParCote);
translate([-nbParCote * uniteV, 0, 0])ligne(nbParCote);
translate([(-nbParCote+1) * uniteV, 0, nbParCote * uniteH])ligne(nbParCote);

module colonne (n) {  
  for( i = [1 : n])translate([0, 0, (i-1) * uniteH])niche();
}
module ligne (n) {
  for( i = [1 : n])translate([(i-1) * uniteV, 0, 0])niche();
}
module niche() {
  difference() {
    cube(size = [largeur, profondeur, hauteur], center = true);
    translate([0, avecFond ? -epaisseur : 0, 0])
      cube(size = [largeur - epaisseur, profondeur + 0.081,
                   hauteur - epaisseur], center = true);
  }
}