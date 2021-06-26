const jscad = require('@jscad/modeling')
const { translate, scale } = jscad.transforms
const { line } = jscad.primitives
const { path2 } = jscad.geometries
const { colorize, colorNameToRgb } = jscad.colors
const { vec2 } = jscad.maths

const getParameterDefinitions = () => {
  return [
    {name: 'dx', caption: 'largeur (cm):', type: 'float', initial: 20}
   ];
}

function importeCheminSVG(str){
  ch = str.split(' ')
  ch.shift()
  let points = ch.map(x=> x.split(',').map(Number))
  
  let pt = [0,0]
  let p = []
  for(let i = 0; i< points.length; i++){
    pt = vec2.add(vec2.create(), pt, points[i])
    p.push(pt)
  }
  const poly = scale([0.260361747,0.260361747], line(p))
return poly
}

const main = (params) => {
 
  const str1 = `m 229.02762,687.23843 -16.43564,-48.98102 35.44678,-35.29938 0.19616,-94.17755 -35.29942,-35.44678 -51.22616,-6.71905 -19.88997,-31.99222 16.63952,-48.91211 51.22617,6.71912 19.88997,31.99218 0.0785,-37.67102`  
  const poly1 = importeCheminSVG(str1)
     
  //const dx = 870.06083 + params.dx / (1/0.393701)
  const dx = 870.06083 + (params.dx-20) * 39.3701
  const str2 ='m ' + dx + ',388.0845 -0.0785,37.67102 16.43561,48.98101 -35.44672,35.29938 -0.19616,94.17755 35.29937,35.44678 -16.63952,48.91205'
  const poly2 = importeCheminSVG(str2)

  let c = path2.concat(poly1, poly2)
  c = colorize(colorNameToRgb('red'), path2.close(c))
  console.log(c)
  let lignes = []
  lignes.push(line([poly1.points[1], poly2.points[5]]))
  lignes.push(line([poly1.points[2], poly2.points[4]]))
  lignes.push(line([poly1.points[3], poly2.points[3]]))
  lignes.push(line([poly1.points[4], poly2.points[2]]))
  lignes.push(line([poly1.points[4], poly1.points[9]]))
  lignes.push(line([poly1.points[9], poly2.points[1]]))
  lignes.push(line([poly1.points[5], poly1.points[9]]))
  lignes.push(line([poly1.points[6], poly1.points[8]]))
  
  for(i=0;i<lignes.length;i++)
    lignes[i] = colorize(colorNameToRgb('blue'), lignes[i])
  
  return [c, lignes]
}

module.exports = { main, getParameterDefinitions }
