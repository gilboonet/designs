// title      : Semi-regular Polyhedrons Test(Archimedean Solids)
// author     : Gilbert Duval
// license    : MIT License
// revision   : 0.001
// tags       : polyhedron archimede
// file       : test_archimede.jscad

include ("polyhedrons_archimede.jscad");

function csgFromSegments (segments) {
  let output = [];
  segments.forEach(segment => output.push(
    rectangular_extrude(segment, { w:2, h:1 })
  ));
  return union(output);
}

const DK = 15, Z=4;
function main(){
  
  polyh2();
  r = [];

  r.push(color("darkorange", polyh2.truncated_icosidodecahedron().scale(1.2).translate([-DK*2,DK,Z])));
  r.push(color("lime", polyh2.rhombicosidodecahedron().scale(2).translate([-DK,DK,Z])));
  r.push(color("purple", polyh2.icosidodecahedron().scale(2.5).translate([0,DK,Z])));
  r.push(color("crimson", polyh2.snub_cube_dextro().scale(3).translate([DK,DK,Z])));

  r.push(color("magenta", polyh2.rhombicuboctahedron().scale(3).translate([-DK*2,0,Z])));
  r.push(color("blue", polyh2.truncated_octahedron().scale(3).translate([-DK,0,Z])));
  r.push(color("yellow", polyh2.cuboctahedron().scale(5).translate([0,0,Z])));
  r.push(color("green", polyh2.truncated_tetrahedron().scale(4).translate([DK,0,Z])));

  r.push(color("red", polyh2.truncated_cube().scale(3).translate([-DK*2,-DK,Z])));
  r.push(color("lightblue", polyh2.snub_cube_laevo().scale(4).translate([-DK,-DK,Z])));
  r.push(color("orange", polyh2.truncated_cuboctahedron().scale(2).translate([0,-DK,Z])));
  r.push(color("beige", polyh2.snub_dodecahedron_laevo().scale(2).translate([DK,-DK,Z])));

  r.push(color("lavender", polyh2.snub_dodecahedron_dextro().scale(2).translate([-DK*2,-DK*2,Z])));

  r.push(csgFromSegments(vectorText("SOLIDES")).scale(0.25).translate([-10,-30,0]));
  r.push(csgFromSegments(vectorText("D'ARCHIMEDE")).scale(0.25).translate([-29.5,-40,0]));
  
  return r;
}
