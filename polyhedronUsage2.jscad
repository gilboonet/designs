// title      : Polyhedron manipulation 2
// author     : Gilbert Duval
// license    : MIT License
// revision   : 0.001
// tags       : polyhedron
// file       : polyhedronUsage2.jscad

function tetrahedron(){
    var C0, vertices, faces;
    
    C0 = Math.sqrt(2) / 4;
    vertices = [ [C0,C0,C0],[-C0,-C0,C0],[-C0,C0,-C0],[C0,-C0,-C0] ];
    faces = [ [0, 3, 1],[0,1,2],[2,1,3],[0,2,3] ];
    
    return polyhedron({points:vertices, polygons:faces});
}
function main(){
// Creation d'un tetraedre/pyramide (bleu)
// Transformation de chaque facette en pic (vert)
// puis encore une fois (rouge)
var a, b, c;
        
a = tetrahedron().scale(20).translate([0,0,20]);
b = herisse(a, 25);
c = herisse(b, 10);

return [
    color([0,0,1], a),
    color([0,1,0,0.5], b),
    color([1,0,0,0.25], c)
];
}
function herisse(csg, long_pic){ // herisse le solide de pics
var r, il, i, p, pz, v, pts, k, mp, vl, j, j2;
const prec = 0.00001;

    // calcul des pics
    r = [];
    il = csg.polygons.length;
    for(i = 0; i < il; i++){
        p = CSG.fromPolygons([csg.polygons[i]]);
        pz = p.polygons[0].plane.normal._z;       
        if( (Math.abs(pz - 1) < prec) || (Math.abs(pz + 1) < prec) ){
			// pas de pics sur les plats
            v = p.polygons[0].vertices;
            pts = [];
            for(k = 0; k < v.length; k++){
                pts.push(v[k].pos);
            }
            r.push(creePoly(pts));
        }else{
            mp = p.polygons[0].plane.normal.times(long_pic)
				.translate(centroid(p));
            v = p.polygons[0].vertices;
            vl = v.length;
            for(j = 0; j < vl; j++){
                j2 = j + 1;
                if(j2 == vl)j2 = 0;
                r.push(creePoly([v[j].pos, v[j2].pos, mp]));
            }
        }
    }
    return CSG.fromPolygons(r);
}
function creePoly(p){ // cree un polygone avec le contenu de p [Vector3D]
    var pts = [];
    for(var i=0; i<p.length; i++){
        pts.push(new CSG.Vertex(new CSG.Vector3D(p[i])));
    }
    return new CSG.Polygon(pts);
}
function centroid(p){ // retourne le centroid du polygone p
	var c = new CSG.Vector3D(0,0,0);
	
	for(var i=0; i< p.polygons[0].vertices.length; i++){
		c = c.plus(p.polygons[0].vertices[i].pos);
	}
	
	return c.dividedBy(p.polygons[0].vertices.length);
}
