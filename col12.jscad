// PARAMETRES
function getParameterDefinitions() {
  return [
    { name: 'nbp', type: 'int', initial: 12, caption: "Nombre de pans:" },
    { name: 'echX', type: 'float', initial: 1, caption: "D&eacute;formation(x):" },
    { name: 'echY', type: 'float', initial: 1, caption: "D&eacute;formation(y):" },
    { name: 'a1', type: 'float', initial: 0, caption: "Inclinaison(x):" },
    { name: 'd1', type: 'float', initial: 12.3, caption: "D&eacute;calage(x):" },
    { name: 'd2', type: 'float', initial: 25, caption: "D&eacute;calage(y):" },
    { name: 'piece', type: 'text',
    initial :'polygon([[22,24/*1:0,0,0,0*/] ,[22,22.97] ,[22,21.94] ,[22,20.84] ,[22,19.81] ,[22,18.75] ,[22,17.72] ,[22,16.65] ,[22,15.56],[22,15/*1:0,-2,-16,2*/] ,[20.61,15.13] ,[19.32,15.16] ,[18.13,15.1] ,[17.02,14.96] ,[16.01,14.74] ,[14.79,14.33] ,[13.71,13.8] ,[12.76,13.17] ,[11.94,12.45] ,[11.24,11.66] ,[10.64,10.81] ,[10.15,9.9] ,[9.75,8.97] ,[9.43,8.01] ,[9.13,6.81] ,[8.94,5.62] ,[8.82,4.48] ,[8.78,3.41] ,[8.79,2.26] ,[8.86,1.16] ,[8.98,0.12],[9,0],[0,0],[0,24]]);',
    caption: "Mod&egrave;le:" },
    { name: 'antipiece', type: 'text', initial :'', caption: "Soustraire:" }, 
    { name: 'couleur', type: 'text', initial: 'BurlyWood', caption: "Couleur:"},
    { name: 'symetrie', type: 'choice',
  values: ["BAS", ""], captions: ["Bas+Droite", "Droite"],
  caption: 'Sym&eacute;trie:'}    
  ];
}

function main(params) {

function mi_profil(){
P = eval(params.piece);

S = params.antipiece;
if (S !== ''){

  S = eval(S);
  return P.subtract(S);
}
else
  return P;
}

function profil(){
    csg = union([mi_profil(), mi_profil().mirroredX()])
        .scale([params.echX, params.echY, 1]);
return csg;
}

function volume(){
    var a = 360/params.nbp, csg =[], i, A, B;

    A = linear_extrude({height:0.65}, profil(params.echX));
    for(i=0; i<params.nbp; i++){
        B = rotate([params.a1, i*a, 0], A);
        B = B.translate([params.d1 * sin(i*a),0, params.d1 * cos(i*a)]);
        csg.push(B);
    }
return union(csg);
}

function lampe(){
    var csg = [], A;

    A = volume();
    if (params.symetrie === ''){
        A = A.translate([0, -params.d2, 0]);
    }
    csg.push(A);
    
    if (params.symetrie == 'BAS'){
        A = A.rotateZ(180).translate([0, params.d2, 0]);
        csg.push(A);
    }
return color(params.couleur, union(csg));
}

L = center([true,true,false], lampe());
return L.translate([0,25,0]).rotateX(90);
}
