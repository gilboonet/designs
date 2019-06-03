// EXAMPLE d'utilisation des fonctions de pontage et d'extrusion
// Gilbert Duval 03/06/2019

function creePoly (p) {
    // cree un polygone avec le contenu de p [Vector3D]
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

function ponte(f1, f2, dk = 0){
    var r, i, i2, tmp;
    
    r = [];
    r.push(f1, f2);

    f1vl = f1.vertices.length;
    f2vl = f2.vertices.length;
    for(i = 0; i < f1vl; i++){
        i2 = (i + 1) % f1vl;
        //j = (f2vl-1) -i;
        j = ((f2vl-1) -i +dk) % f2vl;
        j2 = (j + 1) % f2vl;
        
        tmp = [
            f1.vertices[i].pos, f1.vertices[i2].pos,
            f2.vertices[j].pos, f2.vertices[j2].pos
        ];
        r.push(creePoly(tmp));
    }
    return r;
}

function cumule(t, l){ /// ajoute le contenu de l dans t
    l.forEach(function (f){ t.push(f);} );
    return t;
}

function creeMur(source, v1, f1, v2, f2, d =0){
    return ponte(source[v1].polygons[f1], source[v2].polygons[f2], d);
}

function affVolEtFace(vol, nFace){
    return [
        color("blue", CSG.fromPolygons([vol.polygons[nFace]])),
        CSG.fromPolygons(vol.polygons)
    ];
}

function getParameterDefinitions() {
return [
    { type: 'group', caption: 'EXAMPLE Pontage et Extrusion'},
    { name: 'mode', type: 'choice', caption:'Mode ?'
        ,values: ['D','P']
        ,captions: ['dev','prod']}
];
}

function main(params){
    var r = [], R = [];
    
    var volumes = [];
    volumes.push(cube({size:4, center:[true,true,false]}).scale(1).translate([0,0,2+10]));
    volumes.push(cube({size:4, center:[true,true,false]}).scale(2).translate([20,0,0+10]));
    volumes.push(cube({size:4, center:[true,true,false]}).scale(1).translate([20,20,2+10]));
    volumes.push(cube({size:4, center:[true,true,false]}).scale(2).translate([0,20,0+10]));
    
    R.push(creeMur(volumes, 0, 1, 1, 0));
    R.push(creeMur(volumes, 1, 3, 2, 2));
    R.push(creeMur(volumes, 2, 0, 3, 1));
    R.push(creeMur(volumes, 3, 2, 0, 3));
    
    volumes.forEach(function (f) {
        var tmp = f.polygons[4];
        var z = tmp.vertices[0].pos.z;
        R.push(extrudeBetweenFaces(tmp, tmp.translate(tmp.plane.normal.times(z))));
    });
    switch(params.mode){
        case 'D' :
            cumule(r, affVolEtFace(volumes[0], 4));
            cumule(r, affVolEtFace(volumes[1], 3));
            cumule(r, affVolEtFace(volumes[2], 0));
            cumule(r, affVolEtFace(volumes[3], 2));

            R.forEach(function (f){ cumule(r, [color([1,1,1,0.3], CSG.fromPolygons(f))]); });

            break;
        
        case 'P' :
            volumes.forEach(function (f){ cumule(r, f.polygons); });
            R.forEach(function (f){ cumule(r, f) });
    
            r = CSG.fromPolygons(r);
            break;
    }
    
    return r;
}
