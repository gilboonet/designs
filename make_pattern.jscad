function getParameterDefinitions() {
  return [{ name: 'patron', type: 'choice', caption: "Patron :",
  captions:['Cube', 'Dodecaedre', 'Boite Octo.', 'Tetraedre', 'Icosaedre'], values:[0,1,2,3,4]}
  , { name:'rendu', type: 'choice', caption: "Rendu :", initial:3,
  captions:['Developpement', '2d pour svg'], values:[3,2]}
  ];
}

function main (params){
	// trace un gabarit avec des polygones reguliers "attachés"
	var p= [], l, i;
	
	switch(params.patron){
	    case '1': l = patron_dodecaedre(); break;
	    case '2': l = patron_boiteOctogonale(); break;
	    case '3': l = patron_tetraedre(); break;
	    case '4': l = patron_icosaedre(); break;
	    case '0': l = patron_cube(); break;
	}
	// Le premier polygone est posé automatiquement sans attache
	p.push(polyR(l[0][0][0],l[0][0][1]).rotateZ(l[0][0][2]));
	// puis les autres sont posés par la fonction attache()
	for(i = 1; i < l.length; i++){
	    p.push(attache(polyR(l[i][0][0],l[i][0][1]), l[i][1], p[l[i][2]], l[i][3]));
	}

	return params.rendu == 3 ? rendu(p): rendu2d(p);
}

// parametres des fns patron_xx () :
// - premier polygone : [nb côtés, largeur, rotation]
// - suivants : [nb côtés, largeur], côté à attacher, poly cible, côté cible 
function patron_cube() {
return [[[4,10,0]],
    [[4,10],0,0,3],
    [[4,10],0,1,2],
    [[4,10],0,2,1],
    [[4,10],0,2,2],
    [[4,10],0,2,3]
    ];    
}

function patron_dodecaedre() {
return [[[5,10,225]],
    [[5,10],0,0,0],
    [[5,10],0,0,1],
    [[5,10],0,0,2],
    [[5,10],0,0,3],
    [[5,10],0,0,4],    
    [[5,10],0,5,2],    
    [[5,10],0,6,3],    
    [[5,10],0,7,4],    
    [[5,10],0,7,3],    
    [[5,10],0,7,2],    
    [[5,10],0,7,1]
    ];
}

function patron_boiteOctogonale() {
return [[[8,10,22.5]],
    [[4,10],0,0,0],
    [[4,10],0,0,2],
    [[4,10],0,0,4],
    [[4,10],0,0,6],
    [[6,10],0,1,1],
    [[6,10],0,1,3],
    [[8,10],0,1,2],
    [[4,10],0,7,2],
    [[4,10],0,7,6],
    [[8,10],0,2,2],
    [[8,10],0,4,2],
    [[6,10],0,3,1],
    [[6,10],0,3,3],
    [[8,10],0,3,2],
    [[4,10],0,14,2],
    [[4,10],0,14,6]
    ];
}

function patron_tetraedre() {
	return [[[3,15,45]],
    [[3,15],0,0,0],
    [[3,15],0,0,1],
    [[3,15],0,0,2]
    ];
}

function patron_icosaedre() {
    return [[[3,15,45]],
    [[3,15],0,0,2],
    [[3,15],0,1,1],
    [[3,15],0,2,2],
    [[3,15],0,3,1],
    [[3,15],0,4,1],
    [[3,15],0,5,1],
    [[3,15],0,6,2],
    [[3,15],0,4,2],
    [[3,15],0,8,1],
    [[3,15],0,8,2],
    [[3,15],0,9,1],
    [[3,15],0,9,2],
    [[3,15],0,11,2],
    [[3,15],0,12,1],
    [[3,15],0,10,1],
    [[3,15],0,10,2],
    [[3,15],0,14,2],
    [[3,15],0,15,2],
    [[3,15],0,16,1]
    ];
}

function rendu2d(p){
    var r= [], i, t, b, pa, c;
    
    for (i in p){
        r.push(polygon(p[i]));//.expandToCAG(0.1, 16));
    }

    return r;
}

function rendu(p){
    var r= [], i, t, b, pa, c;
    
    for (i in p){
        r.push(pose(p[i]));

        t = texte(i, 0,0, 0.125).setColor(css2rgb('black'));//.rotateZ(-22.5);
        b = t.getBounds();
        r.push(t.translate(centre(p[i].points).minus((b[1].minus(b[0])).dividedBy(2))));

        pa = p[i].points;
        for (j=0; j<pa.length; j++){
            c = centre([pa[j], pa[(j+1) % pa.length], centre(pa)]);
            r.push(texte(j.toString(), 0,0,0.075)//.rotateZ(-22.5)
            .translate(c).setColor(css2rgb('blue')));
        }
    }

    return r;
}

function centre	(d) {
    var r, i;

    r = new CSG.Vector2D([0, 0]);

    for(i=0; i<d.length; i++){
        r = r.plus(d[i]);
    }
    r = r.dividedBy(d.length);
    
    return r;
}

function texte(ch,x,y,ech){
    var l = vector_text(x,y,ch);
var o = [];
l.forEach(function(pl) {        
   o.push(rectangular_extrude(pl, {w: 2, h: 2}).scale(ech));
});
return union(o);
}

function attache(p1, p1pt0, p0, p0pt0){
    p0Pts = [p0pt0];
    p1Pts = [p1pt0];
        
    p0Pts.push((p0pt0 +1) % p0.points.length);
    p1Pts.push((p1pt0 +1 )% p1.points.length);
        
    // 1°) deplacer p1 de façon que ptOrig = ptDest
    ptDest = p0.points[p0Pts[0]];
    ptOrig = p1.points[p1Pts[1]];
    p1 = p1.translate(ptDest.minus(ptOrig));
    
    // 2°) trouver l'angle de correspondance
    g_prec = 0.01;
    ra = 0;
    p1_s = p1;
    pt0 = p0.points[p0Pts[1]];
    do{
        ra += g_prec;
        p1 = p1_s.rotate(p1_s.points[p1Pts[1]], [0,0,1], ra);
        delta = pt0.distanceTo(p1.points[p1Pts[0]]);
    } while ((ra < 360)&&(delta>g_prec));

    return p1;
}

function pose(p){
    //return p.expandToCAG(0.1, 16);

	switch(p.points.length){
		case 3: col = 'tomato'; break;
		case 4: col = 'yellow'; break;
		case 5: col = 'maroon'; break;
		case 6: col = 'orange'; break;
		case 8: col = 'tan'; break;
		default: col = 'red';
	}

    return union(linear_extrude({height:0.2},p.expandToCAG(0.1,16)).setColor(css2rgb('black')),
            linear_extrude({height:0.1},p.innerToCAG()).setColor(css2rgb(col)));
}

function polyR(n, l=10, x=0, y=0){
    var chemin, i, p0;
    
    l = l / (2 * Math.sin(Math.PI / n));
    p0 = [x + l * Math.cos(0), y + l * Math.sin(0) ];  
    chemin = new CSG.Path2D([ p0 ]);
    
    for (i = 1 ; i <= n ; i++) {
        chemin = chemin.appendPoint([
			x + l * Math.cos(i * 2 * Math.PI / n), 
			y + l * Math.sin(i * 2 * Math.PI / n) ]);
    }
    chemin = chemin.appendPoint(p0);
    chemin = chemin.close();

    return chemin.rotateZ(45);
}

function tPoly(n, t = [0,0], af = 0){
	// trace le polygone p
	var p = polyR(n), col;
	
	switch(p.points.length){
		case 4: col = 'yellow';	a = 45; break;
		case 5: col = 'maroon'; a = 15; break;
		case 6: col = 'orange';	a = 30; break;
		case 8: col = 'tan';	a = 22.5; break;
	}
	if (af !== 0) a = af;
		
    return linear_extrude({height:0.1},p.innerToCAG()).translate(t).rotateZ(a).setColor(css2rgb(col));
    //return polygon(p).translate(t).rotateZ(a);
}

function tracePtsPoly(p, n=-1){
    var i, r = [];

    for(i = 0; i < p.points.length; i++){
        if ((n == -1)||(i == n)||(i == ((n+1) % p.points.length))){
            r.push(sphere({r:0.15, center:true}).translate(p.points[i])
                .setColor(i === 0 ? [1,0,0] : i == 1 ? [0,1,0] : [0,0,1]));
        }
    }
    return r;
}
