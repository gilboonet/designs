function creePoly(p){ // cree un polygone avec le contenu de p [Vector3D]
    return new CSG.Polygon(p.map(v=>new CSG.Vertex(new CSG.Vector3D(v))));
}
function extrudeBetweenFaces(f1, f2){
    var r, i, i2, tmp;
    
    r = [];
    r.push(f2);

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
function ponte(f1, f2){
    var r, i, i2, tmp;
    
    r = [];
    r.push(f1, f2);

    f1vl = f1.vertices.length;
    f2vl = f2.vertices.length;
    for(i = 0; i < f1vl; i++){
        i2 = (i + 1) % f1vl;
        j = (f2vl-1) -i;
        j2 = (j + 1) % f2vl;
        
        tmp = [
            f1.vertices[i].pos, f1.vertices[i2].pos,
            f2.vertices[j].pos, f2.vertices[j2].pos
        ];
        r.push(creePoly(tmp));
    }
    //return new CSG.fromPolygons(r);
    return r;
}

function main(){
    var r, v1, v2, p1, p2, v3;

    r = [];
    
    v1 = cube(10);
    v2 = cube(8).rotateY(30).translate([0,60,4]);
    
    p1 = v1.polygons[3];
    p2 = v2.polygons[2];
    
    //r.push(color("yellow", CSG.fromPolygons([p1])));
    //r.push(color("green", CSG.fromPolygons([p2])));
    
    v3 = ponte(p1, p2);
    r = v3;
    
    v1.polygons.forEach(function(f){ r.push(f); });
    v2.polygons.forEach(function(f){ r.push(f); });
    
    //r.push(color([1,0,0,0.3], CSG.fromPolygons(v3)));
    //r.push(color("green", CSG.fromPolygons(v1.polygons)));
    //r.push(color("yellow", CSG.fromPolygons(v2.polygons)));

    return CSG.fromPolygons(r);
}
