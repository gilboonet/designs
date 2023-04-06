// title      : Regular polyhedrons Library (Platonic solids)
// author     : Gilbert Duval
// license    : MIT License
// revision   : 0.002
// tags       : polyhedron platon
// file       : polyhedrons_platon.jscad

// Data from dmccooey.com/polyhedra

// Library to include with : include("polyhedrons_platon.jscad");
// Instanciate before use with : polyh1();

const jscad = require('@jscad/modeling')
const { polyhedron } = jscad.primitives
const { scale, translate } = jscad.transforms
const { colorize, colorNameToRgb } = jscad.colors

function main() {
  polyh1()
  
  let r = []
  
  function rpush(d, e, c, a) {
    return colorize(colorNameToRgb(c), translate(d, scale([e,e,e], a)))
  }
  
  r.push(rpush([-50, 0], 40, "skyblue", polyh1.tetrahedron()))
  r.push(rpush([  0, 0], 30, "darkgreen", polyh1.hexahedron()))
  r.push(rpush([ 50, 0], 25, "crimson", polyh1.octahedron()))
  r.push(rpush([-50,-50], 10, "gold", polyh1.icosahedron()))
  r.push(rpush([  0,-50], 10, "darkorange", polyh1.dodecahedron()))
  
  return r
}

module.exports = { main }

polyh1 = function () {
polyh1.tetrahedron = function () {
  var C0, vertices, faces;

  C0 = Math.sqrt(2) / 4;
  vertices = [
    [ C0,  C0,  C0],
    [-C0, -C0,  C0],
    [-C0,  C0, -C0],
    [ C0, -C0, -C0]
  ];

  faces = [
    [0, 3, 1],
    [0, 1, 2],
    [2, 1, 3],
    [0, 2, 3]
  ];

  return polyhedron({points:vertices, faces:faces, orientation:'inward'});
}

polyh1.octahedron = function () {
  var C0, vertices, faces;

  C0 = 1;
  vertices = [
    [C0, 0, 0], [-C0, 0, 0], [0, C0, 0],
    [0, -C0, 0], [0, 0, C0], [0, 0, -C0]
  ];

  faces = [
    [4,2,0],[4,0,3],[4,3,1],[4,1,2],
    [5,0,2],[5,3,0],[5,1,3],[5,2,1]
  ];

  return polyhedron({points:vertices, faces:faces, orientation:'inward'});
}

polyh1.hexahedron = function () {
  var vertices, faces;

  vertices = [
    [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5],
    [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5],
    [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
    [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5]
  ];

  faces = [
    [0,3,2,1],[0,1,5,4],[1,2,6,5],
    [2,3,7,6],[3,0,4,7],[4,5,6,7]
  ];

  return polyhedron({points:vertices, faces:faces, orientation:'inward'});
}

polyh1.dodecahedron = function () {
  var C0, vertices, faces;

  C0 = 1.61803399;
  vertices = [
    [+1, +1, +1], [+1, -1, +1], [-1, -1, +1], [-1, +1, +1],
    [+1, +1, -1], [-1, +1, -1], [-1, -1, -1], [+1, -1, -1],
    [0, +1/C0, +C0], [0, -1/C0, +C0], [0, -1/C0, -C0], [0, +1/C0, -C0],
    [-1/C0, +C0, 0], [+1/C0, +C0, 0], [+1/C0, -C0, 0], [-1/C0, -C0, 0],
    [-C0, 0, +1/C0], [+C0, 0, +1/C0], [+C0, 0, -1/C0], [-C0, 0, -1/C0]];

  faces = [
    [1,9,8], [1,8,0], [1,0,17],	[9,1,14], [9,14,15], [9,15,2],
    [9,2,16], [9,16,3], [9,3,8], [8,3,12], [8,12,13], [8,13,0],
    [0,13,4], [0,4,18], [0,18,17], [1,17,18], [1,18,7], [1,7,14],
    [15,14,7], [15,7,10], [15,10,6], [2,15,6], [2,6,19], [2,19,16],
    [16,19,5], [16,5,12], [16,12,3], [12,5,11], [12,11,4], [12,4,13],
    [18,4,11], [18,11,10], [18,10,7], [19,6,10], [19,10,11], [19,11,5]
  ];

  return polyhedron({points:vertices, faces:faces, orientation:'inward'});
}

polyh1.icosahedron = function () {
  var C0, vertices, faces;

  C0 = 1.61803399;
  vertices = [
    [0, +1, +C0], [0, +1, -C0], [0, -1, -C0], [0, -1, +C0],
    [+C0, 0, +1], [+C0, 0, -1], [-C0, 0, -1], [-C0, 0, +1],
    [+1, +C0, 0], [+1, -C0, 0], [-1, -C0, 0], [-1, +C0, 0] ];

  faces = [
    [3,0,4], [3,4,9], [3,9,10], [3,10,7], [3,7,0], [0,8,4], [0,7,11],
    [0,11,8], [4,8,5], [4,5,9], [7,10,6], [7,6,11], [9,5,2], [9,2,10],
    [2,6,10], [1,5,8], [1,8,11], [1,11,6], [5,1,2], [2,1,6]
  ];

  return polyhedron({points:vertices, faces:faces, orientation:'inward'});
}

}
