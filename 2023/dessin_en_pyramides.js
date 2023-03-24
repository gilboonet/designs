// https://openjscad.xyz/#https://raw.githubusercontent.com/gilboonet/designs/master/2023/dessin_en_pyramides.js
// DESSIN AVEC DES PYRAMIDES
// Gilbert Duval 2023-03-24

// INCLUSIONS
const jscad = require('@jscad/modeling')
const { polyhedron } = jscad.primitives
const { colorize, colorNameToRgb } = jscad.colors

// DEF. DES PARAMETRES
function getParameterDefinitions () {
    return [
        { name: 'modele', type: 'text', initial: "polygon([[0,0],[0,16],[16,16],[16,0]]);", caption: 'Modele :' }, 
        { name: 'hauteur', type: 'int', initial: 4, caption: 'Hauteur :' },
    ];
}

// DESIGN
function main (params) {
  const cols = ["aqua", "yellow", "blue", "fuchsia", "gray", "green", "lime", "maroon",
                "navy", "olive", "purple", "red", "silver", "teal", "white","black"]

  var ch, pp, r, i, pts, ph_pts, ph_polys, j, c

  ch = params.modele
  pp = getPolys(ch)

  r = []
  for (i in pp){
    pts = pp[i]
 
    ph_pts = []
    for(j in pts) {
      ph_pts.push([pts[j][0], pts[j][1], 0])
    }
    c = centre(pts)
    ph_pts.push([c[0], c[1], params.hauteur])
    
    ph_polys = []
    for(j = 0; j < pts.length; j++) {
      ph_polys.push([j, (j+1)%pts.length, pts.length])
    }
    l = []

    for(j = pts.length -1; j >= 0; j--) {
       l.push(j)
    }
    ph_polys.push(l)
    
    ph = polyhedron({points: ph_pts, faces: ph_polys, orientation: 'inward'})
    ph.color = colorNameToRgb(cols[i % cols.length])
    r.push(ph)
  }

  return r
}

// RECUPERATION DES DONNEES DE L'EDITEUR DE POLYGONES
function getPolys (ch){
    var l = [], re, i

    l = []
    re = /(polygon\([^\;]*\)\;)/gm
    poly = ch.match(re)
    for(i in poly) {
        l.push(chPolyToPts(poly[i]))
    }
    return l
}

// RECUP. DES COORDONNEES D'UN POLYGONE
function chPolyToPts (ch) {
var poly, pp, pts, i

poly = ch.slice(9,-2).replace(/\]/g, "").replace(/\[/g, "")
poly = poly.replace(/\/\*.+?\*\//g, "")
pp = poly.split(',')
pts = []
	
for(i = 0; i < pp.length; i += 2)
	pts.push([parseFloat(pp[i]), parseFloat(pp[i+1])])

return pts
}

function centre (d) {
  var r = [0,0]
  for (var i = 0; i < d.length; i++) {
    r[0] += d[i][0]
    r[1] += d[i][1]
  }
  r[0] = r[0] / d.length
  r[1] = r[1] / d.length
  
  return r
}
module.exports = { getParameterDefinitions, main }
   
