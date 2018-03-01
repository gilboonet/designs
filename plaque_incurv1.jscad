// Initiation OPENJSCAD : design de plaque incurvée + inclusion de texte en volets
// fichier : plaque_incurv1.jscad
function main(){
    // le design :
    const c = cube(10); // on prend un cube 
    const s = sphere({r: 10, fn: 100, type: 'geodesic'}); // et une sphere
    var p = c.subtract(s); // la plaque = le cube - la sphere
    p = mirror([0,0,1], p).translate([0,0,10]); // on dispose le résultat comme voulu
    p = p.scale([10,4,0.5]); // puis on le déforme (en fonction le texte)
    
    const t = text(2,2,'Gilboo'); // le texte (fn prise dans l'aide)
    
    var r = p.subtract(t); // le résultat = la plaque - le texte
    
    // volets pour l'impression 3d
    const vL = rotate([15,0,0],cube([100,0.1,8]).translate([0,0,0]));
    var volets = [];
    for(var i=0;i<25;i++){volets.push(vL.translate([0,i,0]));}
    
    const t2 = t.intersect(union(volets));
    const rt  = t2.intersect(p);
    return [r, rt];
    //return union(r, rt);
    
}



function text(x,y, ch){
var l = vector_text(x,y, ch);   // l contains a list of polylines to be drawn
var o = [];
l.forEach(function(pl) {                   // pl = polyline (not closed)
   o.push(rectangular_extrude(pl, {w: 2, h: 4}));   // extrude it to 3D
});
return union(o);    
}
