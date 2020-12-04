const jscad = require('@jscad/modeling')
const { curves, maths, extrusions, primitives, transforms, booleans, 
	colors, geometries, measurements, utils } = jscad
const { bezier } = curves
const { slice, extrudeLinear } = extrusions
const { cuboid, polygon, polyhedron } = primitives
const { intersect, subtract,union } = booleans
const { center, scale, translateX, translateY, translateZ, translate
		,rotateX, rotateY, rotateZ, rotate } = transforms
const { colorize } = colors
const { geom3, poly3 } = geometries
const { vec3 } = maths
const { measureBoundingBox, measureArea } = measurements
const { degToRad } = utils

const getParameterDefinitions = () => {
  return [
    {name: 'g1', caption: 'Lignes', type: 'group'},
    {name: 'l0', caption: '#1:', type: 'slider', min:"0", max:"100", step:"1", initial:"50"},
    {name: 'l1', caption: '#2:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l2', caption: '#3:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l3', caption: '#4:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l4', caption: '#5:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l5', caption: '#6:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l6', caption: '#7:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l7', caption: '#8:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l8', caption: '#9:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l9', caption: '#10:',type: 'slider', min:"0", max:"100", step:"1", initial:"0"},

    {name: 'g2', caption: 'Colonnes', type: 'group'},
    {name: 'c0', caption: '#1:', type: 'slider', min:"0", max:"100", step:"1", initial:"50"},
    {name: 'c1', caption: '#2:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c2', caption: '#3:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c3', caption: '#4:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c4', caption: '#5:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c5', caption: '#6:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c6', caption: '#7:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c7', caption: '#8:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c8', caption: '#9:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c9', caption: '#10:',type: 'slider', min:"0", max:"100", step:"1", initial:"0"},

    {name: 'g3', caption: 'Parametres', type: 'group'},
    //,{name: 'v', type:'text', caption: 'volume:', initial: 'test'}
    ,{name: 'ep', type:'float', caption: 'ep (mm):', initial: 6.0}    

   ];
}

// volume that cannot export to 2d
volume = function () {
  const faces =[[0,2,4],[0,6,7],[0,7,1],[0,29,6],[0,45,29],[1,2,0],[1,7,8],[1,9,2],[2,9,3],[3,4,2],[3,9,10],[3,13,5],[4,13,12],[4,31,30],[4,45,0],[5,4,3],[5,13,4],[6,14,15],[6,15,7],[6,29,28],[6,33,14],[7,15,16],[7,16,8],[8,9,1],[8,16,9],[9,19,10],[10,13,3],[10,19,13],[11,19,18],[11,31,4],[12,11,4],[12,19,11],[13,19,12],[14,20,15],[14,22,20],[14,47,17],[15,20,21],[15,21,16],[16,23,19],[17,22,14],[17,27,26],[17,31,11],[17,47,32],[18,17,11],[18,27,17],[19,9,16],[19,27,18],[20,23,21],[22,17,24],[22,23,20],[22,24,23],[23,16,21],[23,24,25],[24,27,25],[25,19,23],[26,24,17],[26,27,24],[27,19,25],[28,29,35],[28,33,6],[30,31,39],[30,44,4],[32,31,17],[33,46,14],[34,29,43],[34,43,35],[35,29,34],[35,33,28],[35,40,36],[36,33,35],[36,46,33],[37,31,32],[37,32,41],[38,31,37],[38,42,39],[39,31,38],[39,44,30],[40,35,43],[40,46,36],[41,38,37],[42,38,41],[42,41,44],[42,44,39],[43,46,40],[44,46,45],[45,4,44],[45,43,29],[45,46,43],[46,44,47],[47,14,46],[47,41,32],[47,44,41]]
  const vertices = [[-449.70586831,-1.10506454,148.6750298],[-450,0,450],[-450,133.3334,450],[-450,266.6666,450],[-450,400,149.99985],[-450,400,450],[-149.70571831,-1.10506454,-151.3246702],[-149.99985,0,149.99985],[-149.99985,0,450],[-149.99985,133.3334,450],[-149.99985,266.6666,450],[-149.99985,400,-149.99985],[-149.99985,400,149.99985],[-149.99985,400,450],[150.29398169,-1.10506454,-451.3248202],[149.99985,0,-149.99985],[149.99985,0,149.99985],[149.99985,400,-450],[149.99985,400,-149.99985],[149.99985,400,149.99985],[450,0,-450],[450,0,-149.99985],[450,133.3334,-450],[450,133.3334,-149.99985],[450,266.6666,-450],[450,266.6666,-149.99985],[450,400,-450],[450,400,-149.99985],[-149.64137135,48.97774939,-151.26032324],[-414.52806261,48.97774946,113.62591802],[-414.65044961,349.91718614,114.52160569],[-150.06419696,349.91718607,-150.06419696],[114.52160569,349.91718614,-414.65044961],[114.64176809,48.97774946,-415.54391269],[-136.41261528,48.26309894,391.74149294],[128.47407598,48.26309887,126.85525168],[392.75721543,48.26309894,-137.42833776],[392.63705303,349.20253562,-136.53487469],[128.05125038,349.20253555,128.05137796],[-136.53500227,349.20253562,392.63718062],[392.70115889,176.92099833,-136.47065191],[392.70125021,221.43647391,-136.47056059],[-136.47050554,221.57862506,392.70156043],[-136.47041422,177.20530063,392.70165175],[-414.58595287,222.29327558,114.58598551],[-414.58586156,177.91995115,114.58607683],[114.58571156,177.63564885,-414.58622683],[114.58580287,222.15112442,-414.58613551]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

/* volume that is OK
volume = function () {
  const faces =[[0,3,2],[0,4,1],[0,15,6],[0,25,12],[1,3,0],[1,4,3],[2,5,7],[2,25,0],[3,4,5],[3,5,2],[4,0,9],[4,11,5],[6,9,0],[6,27,7],[7,8,6],[7,11,10],[7,13,2],[7,27,14],[8,9,6],[8,11,9],[10,8,7],[10,11,8],[11,4,9],[11,7,5],[12,15,0],[12,25,16],[13,22,24],[13,24,2],[14,13,7],[14,27,18],[15,20,26],[15,26,6],[16,15,12],[16,20,17],[16,25,23],[17,15,16],[18,13,14],[18,22,19],[18,27,21],[19,13,18],[20,15,17],[20,25,26],[21,22,18],[22,13,19],[22,27,24],[23,20,16],[23,25,20],[24,27,25],[25,2,24],[26,25,27],[27,6,26],[27,22,21]]
  const vertices = [[-223.79780761,-201.50782252,423.34127485],[-10.93686036,-200.40275798,636.61818713],[-223.06900078,199.59724202,424.48604671],[-10.93686036,199.59724202,636.61818713],[201.19528006,-200.40275798,424.48604671],[201.19528006,199.59724202,424.48604671],[-223.79780761,-201.50782252,-425.18665044],[-223.06900078,199.59724202,-424.04187858],[-10.93686036,-200.40275798,-636.174019],[201.19528006,-200.40275798,-424.04187858],[-10.93686036,199.59724202,-636.174019],[201.19528006,199.59724202,-424.04187858],[-223.70680727,-151.42500853,373.68334528],[-223.16000112,149.51442816,374.40323278],[-223.16000112,149.51442816,-373.95906466],[-223.70680727,-151.42500852,-374.6758061],[169.60792047,-152.13965904,373.68343549],[169.60792047,-152.13965904,-374.67571589],[170.15472663,148.79977764,-373.95897444],[170.15472663,148.79977764,374.403323],[170.24546868,-23.48175966,-373.95889177],[170.24559782,21.03371592,-373.95889177],[170.24585611,21.17586707,374.40324033],[170.24598525,-23.19745735,374.40324033],[-223.06887164,21.89051759,374.40315011],[-223.06874249,-22.48280683,374.40315011],[-223.06925907,-22.76710914,-373.95898198],[-223.06912992,21.74836644,-373.95898198]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}
*/

const main = (params) => {
  const sc = 1, ep = params.ep

	const vd = volume()
	const vv = polyhedron({points: vd.vertices, faces: vd.faces})

  let vol = center({}, scale([sc,sc,sc], rotateX(degToRad(90), vv)))
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)

	// Recup parametres
  const pv = Object.values(params)
  const lH = pv.slice(0,10).filter(Number).map(x => (x-50)/100)
  const lV = pv.slice(10,20).filter(Number).map(x => (x-50)/100)
  
	console.log(pv,lH, lV)
	// 1°) Traverses en X (H)
  fH = bV[1][0] - bV[0][0]
  mH = (bV[1][0] + bV[0][0]) / 2
  var trH = cuboid( {
		size: [ ep, 1+bV[1][1]- bV[0][1], 1+bV[1][2] - bV[0][2] ]} )
	for (let i = 0; i < lH.length; i++){
		var t = intersect(vol, translateX(fH * lH[i], trH))
		if (t.polygons.length > 0)
			rH.push(t)
	}

	// 2°) Traverses en Y (V)
	fV = bV[1][1] - bV[0][1]
	mV = (bV[1][1] + bV[0][1]) / 2
	var trV = cuboid( {
		size: [ 1+ bV[1][0] - bV[0][0], ep, 1+ bV[1][2] - bV[0][2] ]} )	
	for (let i = 0; i < lV.length; i++){
		var t = intersect(vol, translateY(fV * lV[i], trV))
		if (t.polygons.length > 0)
			rV.push(t)
	}
	
	// 3°) Entrecroisement
	var ur = union(intersect(union(rH), union(rV)));
	var tmp = scission3d(ur)  
	var eS = [], eH = [], eV = [];
	for(let i=0; i< tmp.length; i++){
		let p = tmp[i];
		let b = measureBoundingBox(p), 
				d = vec3.subtract(b[1], b[0]);
		let c1 = translate([b[0][0], b[0][1] + ep/2, b[0][2]], 
					cuboid({size: [d[0], d[1]*2, d[2]]}));
		let c2 = translate([b[0][0] + ep/2, b[0][1], b[1][2]], 
					cuboid({size: [d[0]*2, d[1], d[2]]}));
		
		eH.push(intersect(tmp[i], c2));
		eV.push(intersect(tmp[i], c1));
	}
	
	rH = rH.map(x=> subtract(x, eV));
	rV = rV.map(x=> subtract(x, eH));

	// 3d
	//r.push(colorize([0,1,0], translateX(-70, vol)));
	//r.push(colorize([1,0,0], translateX(32-70, rH)));
	//r.push(colorize([0,0,1], translateX(-32-70, rV)));
	
	// 2d
	
	console.log("haut.", fV, fH)
	var dk = Math.max(fV, fH) +1
	for(let ih = 0; ih < rH.length; ih++){
		let b = measureBoundingBox(rH[ih]);
		r.push(translate([dk *ih, dk/2], union(vol2surf(rH[ih], 'x', b[0][0]))))
	}
	for(let iv = 0; iv < rV.length; iv++){
		let b = measureBoundingBox(rV[iv]);
		r.push(translate([dk *iv, -dk], union(vol2surf(rV[iv], 'y', b[0][1]))))
	}
		
	return r;
}
function rndColors(){return [Math.random(), Math.random(), Math.random()];}
function sortNb	(E){ // returns E numerically sorted and deduplicated
	return E.sort(function(a, b) {return a-b}).filter(
	    function(item, pos, ary) {return !pos || item != ary[pos - 1]});
}
function scission3d	(geom){
  var i, Pl, j, i1, j1, ok, ti, tj, z, 
  zz = [], P, RScission, til, tjl, tii1, zzl, zzdl;
// construit table de correspondance entre Polygones (P)
// build polygons lookup table
  //P = geom.toPolygons();
  P = geom.polygons;
  
  RScission = [];
  Pl = P.length;
  for (i = 0; i < Pl; i++){
	ti = P[i].vertices;
	z = [];
	for (j = 0; j < Pl; j++){
      tj = P[j].vertices;
	  ok = false;
	  for (i1 = 0; i1 < ti.length; i1++){
	    tii1 = ti[i1];
		for(j1 = 0; j1 < tj.length; j1++)
		  if (!ok)ok = vec3.distance(tii1, tj[j1]) < 0.01;
	  }
	  if (ok)z.push(parseInt(j));
	}
	z = sortNb(z);
	zz.push({e:0, d:z});
  }

// regroupe les correspondances des polygones se touchant
// boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
// merge lookup data from linked polygons as long as possible
  ok = false;
  nElOk = 0;
  do {
    lnElOk = nElOk;
	nElOk = 0;
	for (i = 0; i < zz.length; i++){
	  if (zz[i].e >= 0) {
	    nElOk++;
		for (j = 0; j < zz[i].d.length; j++){
		  a = zz[i].d[j];
		  if (zz[a].e >= 0)
		    if (i != a) {
			  zz[i].d = sortNb(zz[i].d.concat(zz[a].d));
			  zz[a].e = -1;
			}
		}
	  }
	}
	ok = lnElOk == nElOk;
  }while (!ok);

// construit le tableau des CSG à retourner
// build array of CSG to return
  for (i = 0, zzl = zz.length; i < zzl; i++) {
    if (zz[i].e >= 0) {
			z = [];
			for (j = 0, zzdl = zz[i].d.length; j < zzdl; j++){
				z.push(P[zz[i].d[j]]);
			}
			if(z.length > 0) {
			RScission.push(geom3.create(z));
			}
	  }
  }

  return RScission;
}
function vol2surf(vol, axe, orig = 0){ // axe = 'x' | 'y' | 'z'
// retourne la surface formee par le volume avec l'axe z (à 0)
let S = [];
let X, Y, Z;

for(let n = 0; n < vol.polygons.length; n++){
  let pts = [];
  let P = vol.polygons[n];
  let ok = true;
  switch(axe){
		case 'x':
			X = 1; Y = 2; Z = 0;
			break;
		case 'y':
			X = 0; Y = 2; Z = 1;
			break;
		case 'z':
			X = 0; Y = 1; Z = 2;
			break;
	}
  for(let i=0; (i < P.vertices.length) && ok; i++){
    let pt = P.vertices[i];
    if(Math.abs(pt[Z] - orig)< 0.05){
      pts.push([pt[X], pt[Y]]);
    } else {
      ok = false;
    }
  }
  if (ok){
    if(axe == 'x'){
			S.push(polygon({points:pts.reverse()}));
		} else {
			S.push(polygon({points:pts}));
		}
  }
}

return S;
}

module.exports = { main, getParameterDefinitions }
