joined_truncated_cube = function () {
  // http://dmccooey.com/polyhedra/JoinedTruncatedCube.html
var C0, C1, vertices, faces;

C0 = (1 + sqrt(2)) / 2;
C1 = 1 + sqrt(2);

vertices = [
[ 0.0,  0.0,   C1],
[ 0.0,  0.0,  -C1],
[  C1,  0.0,  0.0],
[ -C1,  0.0,  0.0],
[ 0.0,   C1,  0.0],
[ 0.0,  -C1,  0.0],
[  C0,  0.5,   C0],
[  C0,  0.5,  -C0],
[  C0, -0.5,   C0],
[  C0, -0.5,  -C0],
[ -C0,  0.5,   C0],
[ -C0,  0.5,  -C0],
[ -C0, -0.5,   C0],
[ -C0, -0.5,  -C0],
[  C0,   C0,  0.5],
[  C0,   C0, -0.5],
[  C0,  -C0,  0.5],
[  C0,  -C0, -0.5],
[ -C0,   C0,  0.5],
[ -C0,   C0, -0.5],
[ -C0,  -C0,  0.5],
[ -C0,  -C0, -0.5],
[ 0.5,   C0,   C0],
[ 0.5,   C0,  -C0],
[ 0.5,  -C0,   C0],
[ 0.5,  -C0,  -C0],
[-0.5,   C0,   C0],
[-0.5,   C0,  -C0],
[-0.5,  -C0,   C0],
[-0.5,  -C0,  -C0],
[ 1.0,  1.0,  1.0],
[ 1.0,  1.0, -1.0],
[ 1.0, -1.0,  1.0],
[ 1.0, -1.0, -1.0],
[-1.0,  1.0,  1.0],
[-1.0,  1.0, -1.0],
[-1.0, -1.0,  1.0],
[-1.0, -1.0, -1.0]
];
faces = [
[30,  6,  2, 14],
[30, 14,  4, 22],
[30, 22,  0,  6],
[31,  7,  1, 23],
[31, 23,  4, 15],
[31, 15,  2,  7],
[32,  8,  0, 24],
[32, 24,  5, 16],
[32, 16,  2,  8],
[33,  9,  2, 17],
[33, 17,  5, 25],
[33, 25,  1,  9],
[34, 10,  0, 26],
[34, 26,  4, 18],
[34, 18,  3, 10],
[35, 11,  3, 19],
[35, 19,  4, 27],
[35, 27,  1, 11],
[36, 12,  3, 20],
[36, 20,  5, 28],
[36, 28,  0, 12],
[37, 13,  1, 29],
[37, 29,  5, 21],
[37, 21,  3, 13],
[ 0,  8,  2,  6],
[ 0, 10,  3, 12],
[ 1,  7,  2,  9],
[ 1, 13,  3, 11],
[ 2, 15,  4, 14],
[ 2, 16,  5, 17],
[ 3, 18,  4, 19],
[ 3, 21,  5, 20],
[ 4, 26,  0, 22],
[ 4, 23,  1, 27],
[ 5, 24,  0, 28],
[ 5, 29,  1, 25]
];

return polyhedron({points:vertices, polygons:faces.map(f=>f.reverse())});
};

function creePoly(p){ // cree un polygone avec le contenu de p [Vector3D]
    return new CSG.Polygon(p.map(v=>new CSG.Vertex(new CSG.Vector3D(v))));
}

function extrudeBetweenFaces(f1, f2){
    var r, i, i2, tmp;
    
    r = [];
    r.push(f1, f2);

    for(i = 0; i < f1.vertices.length; i++){
        i2 = (i + 1) % f1.vertices.length;
        tmp = [
            f1.vertices[i].pos, f1.vertices[i2].pos,
            f2.vertices[i2].pos, f2.vertices[i].pos
        ];
        r.push(creePoly(tmp));
    }
    return r;
}

function main(){
    var r, v, fn, n, f1, f2;
    
    r = [];
    v = joined_truncated_cube().scale(10).translate([0,0,40]);
    fn = [];
    
    for(n = 0; n < v.polygons.length; n++){
        //if(Math.random() < Math.random()){
        f1 = v.polygons[n];
        if(f1.getArea() > 100){
            //f1 = v.polygons[n];
            f2 = f1.translate(f1.plane.normal.times(5));

            tmp = extrudeBetweenFaces(f1, f2);
            for(i=0; i< tmp.length ; i++){
                fn.push(tmp[i]);
            }
        }
    }

    r.push(CSG.fromPolygons(fn));
    r.push(color("white", v));
    return r;
}
