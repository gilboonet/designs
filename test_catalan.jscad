include ("polyhedrons_catalan.jscad");

const DK = 15, Z=6;

function csgFromSegments (segments) {
  let output = [];
  segments.forEach(segment => output.push(
    rectangular_extrude(segment, { w:2, h:1 })
  ));
  return union(output);
}

function main(){
  polyh3();

  r = [];

  r.push(color("darkorange", polyh3.triakis_tetrahedron().scale(4).translate([-DK*2,DK,Z])));
  r.push(color("lime", polyh3.rhombic_dodecahedron().scale(6).translate([-DK,DK,Z])));
  r.push(color("purple", polyh3.tetrakis_hexahedron().scale(3.5).translate([0,DK,Z])));
  r.push(color("crimson", polyh3.triakis_octahedron().scale(2.5).translate([DK,DK,Z])));

  r.push(color("magenta", polyh3.deltoidal_icositetrahedron().scale(3.5).translate([-DK*2,0,Z])));
  r.push(color("blue", polyh3.pentagonal_icositetrahedron_dextro().scale(4).translate([-DK,0,Z])));
  r.push(color("yellow",polyh3.pentagonal_icositetrahedron_laevo().scale(4).translate([0,0,Z])));
  r.push(color("green", polyh3.rhombic_triacontahedron().scale(3.5).translate([DK,0,Z])));

  r.push(color("red", polyh3.disdyakis_dodecahedron().scale(2).translate([-DK*2,-DK,Z])));
  r.push(color("lightblue", polyh3.pentakis_dodecahedron().scale(2).translate([-DK,-DK,Z])));
  r.push(color("orange", polyh3.triakis_icosahedron().scale(1.6).translate([0,-DK,Z])));
  r.push(color("beige", polyh3.deltoidal_hexecontahedron().scale(2.25).translate([DK,-DK,Z])));

  r.push(color("lavender", polyh3.pentagonal_hexecontahedron_dextro().scale(2).translate([-DK*2,-DK*2,Z])));
  r.push(color("cyan", polyh3.pentagonal_hexecontahedron_laevo().scale(2).translate([-DK,-DK*2,Z])));
  r.push(color("indigo", polyh3.disdyakis_triacontahedron().scale(1.25).translate([0,-DK*2,Z])));
  
  r.push(csgFromSegments(vectorText("SOLIDES DE CATALAN")).scale(0.25).translate([-50,-40,0]));

  return r;
}
