// https://openjscad.xyz/#https://raw.githubusercontent.com/gilboonet/designs/master/2023/CREEVASE.js
// CREATES A VASE FROM ITS PROFILE
// Gilbert Duval 2023-03-22
//-----------------------------------
// PROFILE POLYGON EDITOR  : http://gilboo.carton.free.fr/OPSPED/
// SIMPLE PATTERN CREATION : https://gilboonet.github.io/deplieurJS/index.html

// INCLUDES
const jscad = require('@jscad/modeling')
const { polygon } = jscad.primitives
const { extrudeRotate} = jscad.extrusions
const { center, scale } = jscad.transforms
const { colorize, colorNameToRgb } = jscad.colors
 
// PARAMETERS
const getParameterDefinitions = () => {
    return [
        { name: 'modele', type: 'text', initial: "Polygon([[0,-40],[3,-40],[8,-39],[13,-37],[15,-35],[16,-34],[18,-32],[20,-29],[21,-25],[22,-21],[23,-16],[23,-11],[22,-8],[21,-5],[19,-3],[17,-1],[15,0],[11,1],[12,30],[14,31],[16,32],[16,37],[0,37]]);", caption: 'Modèle?' }, 
        { name: 'nbCotes', type: 'int', initial:4, caption: 'Nb côtés (min. 4)?' },
        { name: 'ech', type: 'int', initial:10, caption: 'Echelle?' }
    ]
}

// CONVERTS PROFILE DATA TO POINTS
function polygonToPoints(ch) {
  const re = /[pP]olygon\((.*)\)\;/
  const R = ch.match(re)
  const pts = JSON.parse(R[1])

  return pts
}

// VASE DESIGN : gather data and create the vase using them with extrudeRotate
const main = (params) => {

  const pts = polygonToPoints(params.modele)
  var nbCotes = params.nbCotes
  const echelle = new Array(2).fill(params.ech)
  const poly = scale(echelle, polygon({points : pts}))
  const vase = extrudeRotate({segments: nbCotes}, poly)

  // COLORIZE EACH PIECE DIFFERENTLY SO THEY CAN BE NICELY UNFOLDED 
  const nbF = vase.polygons.length
  const nbSF = Math.round(nbF/nbCotes)
  const cols = ["aqua", "yellow", "blue", "fuchsia", "gray", "green", "lime", "maroon",
    "navy", "olive", "purple", "red", "silver", "teal", "white","black"]
  for (var i = 0, j = 0, n = 0; i < nbF; i++) {
    vase.polygons[i].color = colorNameToRgb(cols[j%(cols.length)])
    n++
    if (n == nbSF) {
      n = 0
      j++
    }
  }
  return vase
}
 
module.exports = { getParameterDefinitions, main }
