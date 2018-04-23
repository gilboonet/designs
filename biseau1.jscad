function getParameterDefinitions () {
    return [
        { name: 'modele', type: 'text', initial: "polygon([[0,0],[0,16],[16,16],[16,0]]);", caption: 'Modele :' }, 
        { name: 'hauteur', type: 'int', initial: 4, caption: 'Hauteur :' },
    ];
}
function main (params) {

var ch, pp, r, i, pts, ph_pts, ph_polys, j, c;

ch = params.modele;
pp = getPolys(ch);

r = [];
for (i in pp){
 pts = pp[i];
 
 ph_pts = [];
 for(j in pts){
    ph_pts.push([pts[j][0], pts[j][1],0]);
 }
 c = centre(pts);
 ph_pts.push([c[0], c[1], 4]);
 
 ph_polys = [];
 for(j=0;j<pts.length;j++){
    ph_polys.push([j, (j+1)%pts.length, pts.length]);
 }
 l = [];
 
 for(j=pts.length-1;j>=0;j--){
     l.push(j);
 }
 ph_polys.push(l);
 
 ph = polyhedron({
  points: ph_pts, 
  polygons: ph_polys
});
r.push(ph);
}

rr = union(r).setColor([1,0,0]);

return rr.union(rr.mirroredY());
}

function getPolys (ch){
    var l = [], re, i;

    l = [];
    re = /(polygon\([^\;]*\)\;)/gm;
    poly = ch.match(re);
    for(i in poly){
        l.push(chPolyToPts(poly[i]));
    }
    return l;
}

function chPolyToPts (ch) {
var poly, pp, pts, i;

poly = ch.slice(9,-2).replace(/\]/g, "").replace(/\[/g, "");
poly = poly.replace(/\/\*.+?\*\//g, "");
pp = poly.split(',');
pts = [];
	
for(i=0; i<pp.length; i+=2)
	pts.push([parseFloat(pp[i]), parseFloat(pp[i+1])]);

return pts;
}

function centre	(d) {
    var r, i;

    r = new CSG.Vector2D([0, 0]);

    for(i=0; i<d.length; i++){
        r = r.plus(new CSG.Vector2D([d[i][0], d[i][1]]));
    }
    r = r.dividedBy(d.length);
    
    //return r;
    return [r.x, r.y];
}
