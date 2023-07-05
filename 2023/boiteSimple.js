const { cuboid } = require('@jscad/modeling').primitives

const getParameterDefinitions = () => {
    return [
        { name: 'longueur', type: 'int', initial: 100, caption: 'Longueur ?' }, 
        { name: 'largeur', type: 'int', initial: 100, caption: 'Largeur ?' },
        { name: 'hauteur', type: 'int', initial: 50, caption: 'Hauteur ?' },
    ]
}

const main = (params) => {
  
  let A = cuboid({size:[params.longueur, params.largeur, params.hauteur]})
  
  const cBlue = [0,0,1]
  const cGreen = [0,1,0]
  
  // initialise les couleurs en BLEU
  for (i = 0; i < A.polygons.length; i++) {
    A.polygons[i].color = cBlue
  }
  
  // met la face du haut en VERT
  A.polygons[5].color = cGreen
  
  return A 
}
 
module.exports = { getParameterDefinitions, main }
