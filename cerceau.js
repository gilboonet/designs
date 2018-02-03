// générateur de cerceau
// Gilbert Duval 2017-02-14

function getParameterDefinitions() {
  return [
    { name: 'largeur', type: 'float', initial: 10, caption: "Largeur:" },
    { name: 'epaisseur', type: 'float', initial: 1, caption: "Epaisseur:" },
    { name: 'deformX', type: 'float', initial: 1, caption: "Déformation en X:" },
    { name: 'deformY', type: 'float', initial: 1, caption: "Déformation en Y:" },
    { name: 'precision', type:'float', initial: 64, caption: "Précision:"}
    
  ];
}


function main(params) {
   return difference(
         circle({r: params.largeur, center: true, fn:params.precision}),
         circle({r: params.largeur - params.epaisseur, center: true, fn:params.precision})
      ).scale([params.deformX, params.deformY]);
}
