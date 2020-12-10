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
    //,{name: 'v', type:'text', caption: 'volume:', initial: 'base002'}
    ,{name: 'ep', type:'float', caption: 'ep (mm):', initial: 6.0}    

   ];
}

volume = function () {
  const faces =[[0,4,8],[1,12,3],[1,14,37],[1,40,7],[1,42,41],[2,4,0],[2,8,10],[2,22,5],[2,42,3],[3,13,32],[3,32,2],[3,42,1],[4,2,5],[4,11,9],[5,11,4],[5,23,24],[5,24,6],[6,11,5],[6,16,7],[6,40,43],[7,15,30],[7,21,1],[7,40,6],[8,2,0],[8,11,10],[9,8,4],[10,11,44],[10,42,2],[10,44,42],[11,8,9],[12,19,13],[12,36,19],[12,37,36],[13,3,12],[13,19,17],[14,1,21],[14,21,19],[15,7,16],[15,18,20],[16,18,15],[16,27,18],[17,19,18],[17,34,13],[18,22,17],[18,25,23],[19,38,14],[20,18,19],[20,19,21],[20,28,15],[21,28,20],[21,30,29],[22,2,32],[22,18,23],[22,34,17],[23,5,22],[24,16,6],[24,23,25],[25,18,26],[25,27,24],[26,18,27],[26,27,25],[27,16,24],[28,21,29],[29,30,28],[30,15,31],[30,21,7],[31,15,28],[31,28,30],[32,13,33],[33,13,34],[33,34,32],[34,22,35],[35,22,32],[35,32,34],[37,12,1],[37,14,38],[37,38,36],[38,19,39],[39,19,36],[39,36,38],[40,46,43],[41,40,1],[41,48,40],[42,48,41],[43,11,6],[43,46,11],[45,11,46],[45,44,11],[45,47,44],[46,40,47],[46,47,45],[47,40,48],[48,42,49],[48,44,47],[49,42,44],[49,44,48]]
  const vertices = [[58.89518414,-65.4674221,-70],[78.89518414,-65.4674221,-90],[-101.10481586,-65.4674221,-70],[-101.10481586,-65.4674221,-90],[58.89518414,-65.4674221,70],[-101.10481586,-65.4674221,70],[-101.10481586,-65.4674221,90],[78.89518414,-65.4674221,90],[58.89518414,74.5325779,-70],[58.89518414,74.5325779,70],[-101.10481586,74.5325779,-70],[-101.10481586,74.5325779,70],[38.89518414,-85.4674221,-90],[-61.10481586,-85.4674221,-90],[78.89518414,-85.4674221,-50],[38.89518414,-85.4674221,90],[-61.10481586,-85.4674221,90],[-61.10481586,-85.4674221,-50],[-61.10481586,-85.4674221,50],[38.89518414,-85.4674221,-50],[38.89518414,-85.4674221,50],[78.89518414,-85.4674221,50],[-101.10481586,-85.4674221,-50],[-101.10481586,-85.4674221,50],[-101.10481586,-105.4674221,90],[-101.10481586,-105.4674221,50],[-61.10481586,-105.4674221,50],[-61.10481586,-105.4674221,90],[38.89518414,-105.4674221,50],[78.89518414,-105.4674221,50],[78.89518414,-105.4674221,90],[38.89518414,-105.4674221,90],[-101.10481586,-105.4674221,-90],[-61.10481586,-105.4674221,-90],[-61.10481586,-105.4674221,-50],[-101.10481586,-105.4674221,-50],[38.89518414,-105.4674221,-90],[78.89518414,-105.4674221,-90],[78.89518414,-105.4674221,-50],[38.89518414,-105.4674221,-50],[78.89518414,74.5325779,90],[78.89518414,74.5325779,-90],[-101.10481586,74.5325779,-90],[-101.10481586,74.5325779,90],[-101.10481586,94.5325779,-70],[-101.10481586,94.5325779,70],[-101.10481586,94.5325779,90],[78.89518414,94.5325779,90],[78.89518414,94.5325779,-90],[-101.10481586,94.5325779,-90]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

const main = (params) => {
  const sc = 1, ep = params.ep //*2

	const vd = volume()
	const vv = polyhedron({points: vd.vertices, faces: vd.faces})
	//const vv = require('./' + params.v + '.obj')

  //let vol = center({}, rotateY(degToRad(180), rotateX(degToRad(90), vv)))
  let vol = center({}, rotateZ(degToRad(180), rotateX(degToRad(90), vv)))
  //let vol = center({}, scale([sc,sc,sc], rotateX(degToRad(-90), vv)))
  //let vol = vv
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)
  console.log(bV)

	// Recup parametres
  const pv = Object.values(params)
  const lH = pv.slice(0,10).filter(Number).map(x => (x-50)/100)
  const lV = pv.slice(10,20).filter(Number).map(x => (x-50)/100)
  
	//console.log(pv,lH, lV)
	// 1°) Traverses en X (H)
  fH = bV[1][0] - bV[0][0]
  mH = (bV[1][0] + bV[0][0]) / 2
  
  console.log(ep, 1+bV[1][1]- bV[0][1], 1+bV[1][2] - bV[0][2])
 
  var trH = cuboid( {
		size: [ ep, 1+bV[1][1]- bV[0][1], 1+bV[1][2] - bV[0][2] ]} )
	for (let i = 0; i < lH.length; i++){
		var t = intersect(vol, translateX(fH * lH[i], trH))
		if (t.polygons.length > 0)
			rH.push(t)
	}
	
	console.log('ok')

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
		//r.push(translateX(dk *ih, vol2surf(rH[ih], 'x', b[0][0])))
	}
	for(let iv = 0; iv < rV.length; iv++){
		let b = measureBoundingBox(rV[iv]);
		r.push(translate([dk *iv, -dk], union(vol2surf(rV[iv], 'y', b[0][1]))))
		//r.push(translate([dk *iv, -dk], vol2surf(rV[iv], 'y', b[0][1])))
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
