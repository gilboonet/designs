const { cuboid } = require('@jscad/modeling').primitives
 
const main = () => {
  let A = cuboid({size:[100, 100, 50]})
  
  const cBlue = [0,0,1]
  const cGreen = [0,1,0]
  
  for (i = 0; i < A.polygons.length; i++) {
    A.polygons[i].color = cBlue
  }
  
  A.polygons[5].color = cGreen
  
  return A 
}
 
module.exports = { main }
