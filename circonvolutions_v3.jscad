// GENERATEUR PARAMETRIQUE DE CIRCONVOLUTIONS
// Gilbert Duval 2016-10-16
//-----------------------------------------------
// Le modËle est fourni par l'Èditeur de chemins
// --> http://gilboo.carton.free.fr/OPSPED/

function getParameterDefinitions() {
  return [
      { name: 'modele', type: 'text', initial: 'polygon([[0,16],[8,16],[16,0],[16,-8],[0,-16],[-8,-16],[-16,0],[-16,8]]);', caption: "Mod√®le:" }
      ,{ name: 'nombre', type: 'int', initial: 5, caption: "Nombre:" }
      ,{ name: 'epaisseur', type: 'float', initial: 0.2, caption: "Epaisseur:" }
      ,{ name: 'decalage', type: 'float', initial: 0.1, caption: "Espace:" }
      ];
}
// gilboo.js
function faitPoly(ch){
var i, sr, pts = [];

sr = ch.match(/\[(\-?\d*\.?\d*,\-?\d*\.?\d*)\]/g);
if(sr !== null){
    for(i in sr){
        if( sr[i] !== ''){
            sr[i] = sr[i].replace(/\]/g, "").replace(/\[/g, "");
            pp = sr[i].split(',');
            if(pp.length == 2){
                pts.push([parseInt(pp[0]), parseInt(pp[1])]);
                //console.log('['+pp[0]+","+pp[1]+']');
            }
        }
    }
}
return pts;
}

function main(params){
var sp, spp, i, ch, sr, j, P, R;
    sp = params.modele.split(";");
    spp= [];
    for(i in sp){
        ch = sp[i];
        if(ch !== ''){
            sr = ch.match(/\/\*.*?\*\//g);
            if(sr !== null){
                for(j in sr){
                    ch = ch.replace(sr[j], "");
                }
                if (ch !== '')
                spp.push(ch);
            } else
            spp.push(ch);
        }
    }
    
    myPts = faitPoly(spp[0]);
    console.log(myPts)
    P = CAG.fromPoints(myPts);

    R = [];
    for(i = 1; i< 1+params.nombre*(params.epaisseur+params.decalage); i+= params.epaisseur+params.decalage){
        R.push(P.scale(i).subtract(P.scale(i-params.epaisseur)));
    }
    return union(R);
}
