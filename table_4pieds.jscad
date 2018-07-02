// TABLE PLATEAU + 4 Pieds
// https://raw.githubusercontent.com/gilboonet/designs/master/table_4pieds.jscad
function getParameterDefinitions () {
  return [
    {type: 'group', caption:"PLATEAU"},
    {name: 'P_type', type:'choice', caption:'Type', initial:'R',
        captions:['Carré','Rond'], values:['C','R'] },
    {name: 'P_Largeur', type: 'float', caption:'Largeur', initial:30 },
    {name: 'P_Prof', type: 'float', caption:'Profondeur', initial:4 },
    {name: 'P_DX', type: 'float', caption:'Décalage X', initial:32 },
    {name: 'P_RX', type: 'float', caption:'Rot. Y (carré)', initial:0 },
    {name: 'c1', type: 'color', initial: '#D2B48C', caption: 'Couleur'},
    
    {type: 'group', caption:"PIEDS"},
    {name: 'c2', type: 'color', initial: '#C0C0C0', caption: 'Couleur'}
  ];
}


function main(params)
{
    pFond = polygon([[16,32],[22,24],[25,0],[22,-20],[11,-27],[4,-21],[6,-21],[11,-25],[19,-19],[18,-4],[16,5],[10,8],[0,8],[0,32]]);
    
    pTrous = [
        polygon([[14,24],[16,24],[16,22],[14,21]]),
        polygon([[19,9],[22,12],[24,-1],[21,-13],[22,-3],[22,2],[20,0],[20,3],[22,4],[22,8],[21,9],[20,8]]),
        polygon([[2,26],[3,28],[6,29],[10,27],[8,19],[4,16],[5,19],[7,22],[7,25],[6,27],[4,25],[5,23],[3,20]])
    ];

    p= pFond.subtract(pTrous);

    p = p.extrude({offset:[0,0,1]});
    p = p.setColor(getColorRGB(params.c2));

    p = p.union(p.mirroredX());
    p = p.union(p.rotateY(90));


    if(params.P_type == 'R'){ // Plateau cylindrique
        plateau = cylinder({r:params.P_Largeur/2, h:params.P_Prof, center:true}).rotateX(90);
    }else{ // Plateau carré
        plateau = cube({size:[params.P_Largeur, params.P_Prof, params.P_Largeur], center:true});
        if(params.P_RX !== 0){
            plateau = plateau.rotateY(params.P_RX);
        }
    }
    
    plateau = plateau.translate([0, params.P_DX + params.P_Prof*1,0]);
    plateau = plateau.setColor(getColorRGB(params.c1));
    
    table1 = p.union(plateau);
    table1 = table1.rotateX(90);

    return table1.translate([0,0,params.P_DX]);
}

function getColorRGB(color){
  if ((color.charAt(0) === '#')) {
    var r = parseInt('0x' + color.slice(1, 3)) / 255;
    var g = parseInt('0x' + color.slice(3, 5)) / 255;
    var b = parseInt('0x' + color.slice(5, 7)) / 255;
    return [r, g, b];
  }else
    return color;
}
