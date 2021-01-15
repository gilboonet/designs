const jscad = require('@jscad/modeling')
const { rectangle, cuboid, polygon } = jscad.primitives
const { intersect, subtract, union } = jscad.booleans
const { translate, translateX, translateY, translateZ, mirrorX, mirrorY, mirrorZ } = jscad.transforms
const { extrudeLinear } = jscad.extrusions
const { colorize, colorNameToRgb } = jscad.colors

const getParameterDefinitions = () => {
  return [
    {name: 'largeur', caption: 'Largeur:', type: 'float', initial: 39},
    {name: 'hauteur', caption: 'Hauteur:', type: 'float', initial: 26.5},
    {name: 'profondeur', caption: 'Profondeur:', type: 'float', initial: 4},
    {name: 'epaisseurCarton', caption: 'Epaisseur Carton:', type: 'float', initial: 0.6},
    {name: 'epaisseurEcran', caption: 'Epaisseur Ecran:', type: 'float', initial: 4.5},
    {name: 'epaisseurHaut', caption: 'Epaisseur Haut:', type: 'float', initial: 6},
    {name: 'ratioPtCentral', caption: 'Ratio point central:', type: 'float', initial: 0.3},
    {name: 'etatFenetre', type: 'choice', caption: 'Etat Fenetre:', values: [0, 1], captions: ['Fermé', 'Ouvert'], initial: 0 },
    {name: 'mode', type: 'choice', caption: 'Mode:', values: [3, 2], captions: ['vue 3d', 'Gabarit 2d'], initial: 2 }
  ]
}

const main = (params) => {
  const epaisseurCarton = 0.6
  
  const largTotale = params.largeur + params.epaisseurEcran * 2 + params.epaisseurCarton * 2
  const hautTotale = params.hauteur + params.epaisseurEcran + params.epaisseurHaut + params.epaisseurCarton * 2
  
  function extrudeCarton(geom){ return extrudeLinear({height: params.epaisseurCarton}, geom) }

  let ecran = translateY( (params.epaisseurEcran - params.epaisseurHaut)/2, rectangle({size: [params.largeur, params.hauteur]}))
  let cadre = rectangle({size: [largTotale, hautTotale]})
  let avant = subtract(cadre, ecran)
  let plaqueAvant = extrudeCarton(avant)
  
  let entretoise = cuboid({size:[largTotale, params.epaisseurCarton, params.profondeur]})
     
  const x0 = -largTotale /2
  const x2 =  largTotale /2
  const x1 = (x0 + x2) / 2
  
  const y0 = -hautTotale /2
  const y2 =  hautTotale /2
  const y1 = y0 + (y2 - y0) * params.ratioPtCentral 
  
  let pH = polygon({points: [ [x1, y1], [x2, y2], [x0,y2] ]})
  let pG = polygon({points: [ [x0, y0], [x1, y0], [x1,y1], [x0, y2] ]})
  let pD = polygon({points: [ [x2, y2], [x1, y1], [x1,y0], [x2, y0] ]})
   
  let decalage = params.epaisseurCarton + params.profondeur/2 + 0.01
  let plaqueH = translateZ(decalage, extrudeCarton(pH))
  let plaqueG = translateZ(decalage, extrudeCarton(pG))
  let plaqueD = translateZ(decalage, extrudeCarton(pD))

  console.log('=>',params.etatFenetre)
  if((params.etatFenetre == 1)&&(params.mode == 3)){
		plaqueH = translate([0,hautTotale,-params.epaisseurCarton], mirrorY(plaqueH))
		plaqueG = translate([-largTotale,0,-params.epaisseurCarton], mirrorX(plaqueG))
		plaqueD = translate([largTotale,0,-params.epaisseurCarton], mirrorX(plaqueD))
	}
  
  let r = []
  
	if(params.mode == 3){
		r.push(colorize(colorNameToRgb('tan'), translateZ(- params.profondeur/2, plaqueAvant)))
		r.push(colorize(colorNameToRgb('tan'), translateZ(  params.profondeur/2, plaqueAvant)))
		r.push(colorize(colorNameToRgb('orange'), translate([0,  hautTotale/2 - params.epaisseurCarton/2, 0], entretoise)))
		r.push(colorize(colorNameToRgb('orange'), translate([0, -hautTotale/2 + params.epaisseurCarton/2, 0], entretoise)))
  
		r.push(colorize(colorNameToRgb('yellow'), plaqueH))
		r.push(colorize(colorNameToRgb('Green'), plaqueG))
		r.push(colorize(colorNameToRgb('Maroon'), plaqueD))
	} else {
		r.push(translateY(hautTotale/2+ params.profondeur/2, rectangle({size: [largTotale, 4]})))
		r.push(avant)
		r.push(translateY(-hautTotale/2- params.profondeur/2, rectangle({size: [largTotale, 4]})))
		r.push(translateY(-hautTotale- params.profondeur, avant))
		
		decalage = -hautTotale*2 - params.profondeur/2*2
		r.push(translateY(-hautTotale*2 - params.profondeur/2*2, pH))
		
		
		r.push(translate([-largTotale,-hautTotale*1 - params.profondeur/2*2], mirrorX(pG)))
		r.push(translate([largTotale,-hautTotale*1 - params.profondeur/2*2], mirrorX(pD)))
	}
  
  return r
}

module.exports = { main, getParameterDefinitions }
