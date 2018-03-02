// Initiation OPENJSCAD : design de plaque incurvee + inclusion de texte en volets
// fichier : plaque_incurv1p.jscad
function main(params){
    // le design :
    const c = cube(10); // on prend un cube 
    const s = sphere({r: 10, fn: params.res, type: 'geodesic'}); // et une sphere
    var p = c.subtract(s); // la plaque = le cube - la sphere
    p = mirror([0,0,1], p).translate([0,0,10]); // on dispose le resultat comme voulu
    p = p.scale([params.echX,4,0.5]); // puis on le deforme (en fonction du texte)
    
    const t = text(params.dX, params.dY, params.txt); // le texte (fn prise dans l'aide)
    
    var r = p.subtract(t); // le resultat = la plaque - le texte
    
    // volets pour l'impression 3d
    const vL = rotate([params.av,0,0],cube([100,0.1,8]).translate([0,0,0]));
    var volets = [];
    for(var i=-5;i<30;i++){volets.push(vL.translate([0,i,0]));}
    
    const t2 = t.intersect(union(volets));
    const rt  = t2.intersect(p);
    return [r, rt];
    //return union(r, rt);
    
}

// PARAMETRES
function getParameterDefinitions() {
    return [
{ name:'res',  type:'int',   initial:10, caption:"Resolution:"},
{ name:'echX', type:'float', initial:10, caption:"Agrandissement en X:"},
{ name:'txt',  type:'text',  initial:"Gilboo", caption:"Texte:"},
{ name:'dX',   type:'float', initial:2,  caption:"Decalage en X:"},
{ name:'dY',   type:'float', initial:2,  caption:"Decalage en Y:"},
{ name:'av',   type:'float', initial:15, caption:"Angle des volets:"}
        ];
}


function text(x,y, ch){
var l = vector_text(x,y, ch);   // l contains a list of polylines to be drawn
var o = [];
l.forEach(function(pl) {                   // pl = polyline (not closed)
   o.push(rectangular_extrude(pl, {w: 2, h: 4}));   // extrude it to 3D
});
return union(o);    
}
