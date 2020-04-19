// generateur de cerceaux concentriques
// Gilbert Duval 2020-04-20

function getParameterDefinitions() {
  return [
    { name: 'largeur', type: 'float', initial: 13, caption: "Largeur:" },
    { name: 'minimum', type: 'float', initial: 3, caption: "minimum:" },
    { name: 'epaisseur', type: 'float', initial: 0.5, caption: "Epaisseur:" },
    { name: 'deformX', type: 'float', initial: 1, caption: "Deformation en X:" },
    { name: 'deformY', type: 'float', initial: 1, caption: "Deformation en Y:" },
    { name: 'precision', type:'float', initial: 64, caption: "Precision:"}
    
  ];
}

function main(params){
    
var r = [];
    
do{
r.push(cc(params));
params.largeur -= params.epaisseur+1;
}while(params.largeur > params.minimum);


return r;
}


function cc(params) {
   return difference(
         circle({r: params.largeur, center: true, fn:params.precision}),
         circle({r: params.largeur - params.epaisseur, center: true, fn:params.precision})
      ).scale([params.deformX, params.deformY]);
}
