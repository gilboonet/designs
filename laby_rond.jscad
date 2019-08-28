// Plateau labyrinthe circulaire aleatoire

function vol2surf(vol, orig=0){
var S, n, pts, ok, P, i, pt;

S = [];
for(n = 0; n < vol.polygons.length; n++){
    pts = [];
    P = vol.polygons[n];
    ok = true;
    for(i=0; (i < P.vertices.length) && ok; i++){
        pt = P.vertices[i].pos;
        if(Math.abs(pt.z - orig)< 0.00001){
            pts.push([pt.x, pt.y]);
        } else {
            ok = false;
        }
    }
    if (ok){
        S.push(polygon(pts));
    }
}
return S;
}

function getParameterDefinitions() {
    return [
        { name: 'g0', type: 'group', caption: 'LABY CIRCULAIRE'},
        { name: 'mode', type: 'choice', values:['3','2'], captions:["3d design", "2d lasercut"], initial: 3, caption: 'Mode?' }
    ];
}
function main(param){
    
    // fond du plateau
    r = circle({r:24, center:true}).extrude({offset:[0,0,0.3]});
    r= color("green", r);
    res = 72;
    rr = [];

    // bordure
    R1 = rotate_extrude({fn: res}, translate([24-1.8+1, 0, 0], square({size:[0.6*3,3], center: true})));
    RA = R1.translate([0,0,1.5]);
    rr.push(color("brown", RA));
    
    // murs
    for(i=0;i<5;i++){
        deb= 4*i;
        R1 = rotate_extrude({fn: res}, translate([deb+4, 0, 0], square({size:[0.6,2], center: true})));
        R0 = rotate_extrude({fn: res, startAngle: Math.random()*360, angle: 45/(i+1)}, translate([deb+4-0.05, 0, 0], 
                square({size:[0.8,2.1], center: true})));
        RA = R1.subtract(R0).translate([0,0,0.3+0.7]);
        rr.push(color("silver", RA));
    }
    if (params.mode == '3'){
        r = r.union(rr);
        boule = sphere({r:2, fn:res, type:'geodesic'}).translate([14,14,2.3]);
        return [r.scale(2), boule];
    } else {
        r = r.subtract(rr);
        r = r.scale(2);
        return vol2surf(r);
    }
}
