// DEMO 2 : meuble par réseau de points

// editeur de polygones : http://gilboo.carton.free.fr/OPSPED
function main (params) {
var poly, pts, nDefs, symX, symY, meuble, i, tmp;

//design = parseInt(params.modele);
switch(params.modele){
    case '1': // 3 niches
        pts = [[0,0],[20,0],[28,16],[16,24],[24,40],[0,40],[8,24],[0,16]];
        nDefs = [[0,1,2,7], [7,2,3,6], [6,3,4,5]];
        symX = false; symY = false;
        break;
    case '2': // Quart (sym. en X et Y)
        pts = [[12,0],[40,0],[32,32],[0,40],[0,20],[16,16]];
        nDefs = [[0,1,2,5],[2,3,4,5]];
        symX = true; symY = true;
        break;
    case '3': // Etoile (sym. en X et Y)
        pts = [[0,0],[16,0],[32,0],[28,16],[32,32],[16,32],[0,32],[0,16],[10,22],[22,22],[22,10],[10,10]];
        nDefs = [[0,1,10,11,7],[1,2,3,9,10],[5,6,7,11,8]];
        symX = true; symY = true;
        break;
    case '4': // Opus Incertum
        pts = [[-41,-43],[-35,-43],[-10,-43],[28,-43],[43,-43],[43,-36],[43,-3],[43,26],[43,37],[43,41],[11,41],[-13,41],[-41,41],[-38,30],[-41,-12],[-30,-23],[-15,-21],[-7,-36],[24,-34],[29,-40],[30,-14],[30,10],[15,9],[9,-4],[-8,-8],[-26,18],[-17,16],[7,22],[15,36]];
        nDefs = [[0,1,15,14],[1,2,17,16,15],[2,3,19,18,17],[3,4,5,6,20,18,19],[16,17,18,20,23,24],[14,15,16,24,26,25],[12,14,25,13],[20,6,21,22,23],[6,7,21],[24,23,22,27,26],[22,21,7,8,28,27],[8,9,10,28],[10,11,26,27,28],[11,12,13,25,26]];
        symX = false; symY = false;
        break;
        
    case '5': // Base Hexa (sym. en X et Y)
        pts = [[0,0],[25,0],[51,0],[48,18],[38,33],[23,45],[0,51],[0,16],[29,16]];
        nDefs = [[1,2,3,4,8],[4,5,6,7,8]];
        symX = true; symY = true;
        break;
    case '6': // Cosima
        pts = [[-48,-50],[-13,-51],[22,-52],[50,-52],[50,-23],[51,12],[53,49],[15,49],[-20,49],[-50,49],[-49,19],[-48,-14],[-21,-22],[14,-14],[21,20],[-12,11]];
        nDefs = [[0,1,12,11],[1,2,13,12],[2,3,4,13],[10,11,12,15],[4,5,14,13],[5,6,7,14],[7,8,15,14],[8,9,10,15]];
        symX = false; symY = false;
        break;
    case '7': // Escalier 4321
        pts = [[-32,-32],[-16,-32],[0,-32],[16,-32],[32,-32],[32,-16],[16,-16],[16,0],[0,0],[0,16],[-16,16],[-16,32],[-32,32],[-32,16],[-32,0],[-32,-16],[-16,0],[-16,-16],[0,-16]];
        nDefs = [[3,4,5,6],[2,3,6,18],[1,2,18,17],[0,1,17,15],[6,7,8,18],[8,16,17,18],[14,15,17,16],[8,9,10,16],[10,13,14,16],[10,11,12,13]];
        symX = false; symY = false;
        break;
    case '8': // Silhouette
        pts = [[-28,-44],[28,-44],[24,-23],[20,-11],[24,3],[34,20],[-34,20],[-24,3],[-20,-11],[-24,-23]];
        nDefs = [[0,1,2,3,8,9],[3,4,5,6,7,8]];
        symX = false; symY = false;
        break;
    case '9': // Penta
        pts = [[-33,-48],[-11,-49],[28,-52],[35,-27],[48,15],[27,26],[-8,48],[-24,33],[-51,7],[-45,-11],[-28,2],[-19,-24],[7,-26],[17,1],[-6,18]];
        nDefs = [[0,1,11,10,9],[1,2,3,12,11],[3,4,5,13,12],[5,6,7,14,13],[7,8,9,10,14]];
        symX = false; symY = false;
        break;
    case '': // AJOUT
        symX = false; symY = false;
        break;
    case '0':
        if((params.points === '')||(params.niches === '')){
            throw "Points et Niches doivent être renseignés!";
        }
        pts = JSON.parse(params.points);
        nDefs = JSON.parse(params.niches.replace(/\;/g, ''));
        symX = params.sym.indexOf('X')> -1;
        symY = params.sym.indexOf('Y')> -1;
        break;
}

meuble = faitMeuble(params.rendu, pts, nDefs, params.epais, params.prof, symX, symY);

tmp = [];
tmp.push('MODELE #'+params.modele);
tmp.push('Pts = '+ JSON.stringify(pts)+";");
tmp.push('nDefs = '+ JSON.stringify(nDefs)+";");
console.log(tmp.join('\n'));

return meuble;
}

function getParameterDefinitions () {
    return [
        { name: 'modele', type: 'choice', caption:'Modele', default:0,
            values:[1,2,3,4,5,6,7,8,9
            ,0],
            captions:['1: 3 niches', '2: Quart', '3: Etoile', '4:Opus Incertum',
            '5:Base Hexa', '6: Cosima', '7: Escalier 4321', '8: Silhouette',
            '9: Penta'
            ,'0: Personnalisé']
        },
        { name: 'points', type: 'text', initial: "", caption: 'Points' },
        { name: 'niches', type: 'text', initial: "", caption: 'Niches' },
        { name: 'epais', type: 'int', initial: 2, caption: 'Epaisseur' },
        { name: 'prof', type: 'int', initial: 30, caption: 'Profondeur' },
        { name: 'sym', type:'choice', caption:'Symetrie',
            values:['','X','Y','XY'],
            captions:['Aucune','X','Y','X + Y']
        },
        { name: 'rendu', type: 'choice',caption:'Rendu',
            values:['3','2'],
            captions:['Modèle en 3d', 'Gabarit en 2d']
        
        }
    ];
}

function faitMeuble(rendu, pts, nichesDefs, epais, prof, symX = false, symY = false){
var meuble, i, niche;

// calcul du meuble (= union des niches)
meuble = null;
for(i in nichesDefs){
    niche = faitNiche(rendu, pts, nichesDefs[i], epais, prof);
    if(!meuble) meuble = niche;
    else        meuble = meuble.union(niche);
}

if(symX) meuble = meuble.union(meuble.mirroredX());
if(symY) meuble = meuble.union(meuble.mirroredY());

return meuble;
}

function faitNiche(rendu, pts, nPts, epais,prof){
    // pts : tableau des points 
    // nPts : tableau définissant la niche par numéros de point
    var dNiche, i, pNiche, niche;
    
    // crée la niche à partir des numéros fournis
    // - 1: données fournies -> liste de points
    dNiche  = [];
    for(i in nPts){
        dNiche.push(pts[nPts[i]]);
    }
    // - 2: liste de points -> chemin 2d
    pNiche = new CSG.Path2D(dNiche, true);
    // - 3: chemin 2d -> niche (3d ou 2d selon rendu)
    if(rendu == '3'){
        niche = pNiche.rectangularExtrude(epais,prof,0,true);
    }else{
        niche = pNiche.expandToCAG(epais/2);
    }
    
    return niche;
}
