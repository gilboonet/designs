const jscad = require('@jscad/modeling')
const { curves, maths, extrusions, primitives, transforms, booleans, 
	colors, geometries, measurements, utils } = jscad
const { bezier } = curves
const { slice, extrudeLinear } = extrusions
const { cuboid, polygon, polyhedron } = primitives
const { intersect, subtract,union } = booleans
const { center, scale, translateX, translateY, translateZ, translate
		,rotateX, rotateY, rotateZ } = transforms
const { colorize } = colors
const { geom3, poly3 } = geometries
const { vec3 } = maths
const { measureBoundingBox, measureArea } = measurements
const { degToRad } = utils

const getParameterDefinitions = () => {
  return [
    {name: 'g1', caption: 'Lignes (rouge)', type: 'group'},
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

    {name: 'g2', caption: 'Colonnes (bleu)', type: 'group'},
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
    ,{name: 'mode', type:'choice', caption:'mode:', captions:["2d","3d"], values:[2,3], initial:2}
    ,{name: 'ep', type:'float', caption: 'ep (mm):', initial: 6.0}    
    ,{name: 'dky', type:'float', caption: 'decalage Y (mm):', initial: 30}    

   ];
}

const main = (params) => {
  const sc = 1, ep = params.ep *2

	const vdata = {
		faces : [[0,3,2],[0,8,1],[0,33,32],[0,43,9],[1,3,0],[1,5,3],[1,8,5],[2,24,33],[2,33,0],[3,5,7],[3,24,2],[4,13,5],[4,34,13],[5,10,4],[5,15,7],[6,26,7],[6,37,35],[6,41,27],[7,15,6],[7,26,3],[8,0,9],[9,10,8],[9,43,10],[10,5,11],[10,34,4],[10,43,42],[11,5,8],[11,8,10],[12,5,13],[12,15,5],[12,16,15],[12,28,16],[13,28,12],[13,34,36],[13,47,29],[14,6,15],[14,20,37],[14,37,6],[15,20,14],[16,30,17],[17,18,16],[17,38,18],[18,22,19],[18,38,39],[18,45,23],[19,15,16],[19,16,18],[19,22,15],[20,15,21],[20,45,44],[21,15,22],[21,22,20],[22,18,23],[23,20,22],[23,45,20],[24,3,25],[24,41,40],[25,3,26],[25,26,24],[26,6,27],[27,24,26],[27,41,24],[28,13,29],[29,30,28],[29,47,30],[30,16,31],[30,38,17],[30,47,46],[31,16,28],[31,28,30],[32,33,48],[32,43,0],[33,62,49],[34,52,36],[34,56,50],[35,41,6],[36,47,13],[36,52,47],[37,41,35],[38,55,39],[38,60,54],[39,45,18],[39,55,45],[40,33,24],[40,62,33],[41,58,63],[41,62,40],[42,34,10],[42,56,34],[43,48,57],[43,56,42],[44,37,20],[44,41,37],[45,55,59],[45,58,44],[46,38,30],[46,60,38],[47,52,61],[47,60,46],[48,43,32],[48,51,50],[49,48,33],[49,62,51],[50,52,34],[50,56,48],[51,48,49],[51,52,50],[52,51,53],[52,55,54],[53,51,58],[53,58,55],[54,55,38],[54,60,52],[55,52,53],[57,48,56],[57,56,43],[58,41,44],[59,55,58],[59,58,45],[61,52,60],[61,60,47],[63,51,62],[63,58,51],[63,62,41]]
		,vertices : [[-40,-40,-40],[-40,-40,40],[-40,200,-40],[-40,200,40],[40,-40,-40],[40,-40,40],[40,200,-40],[40,200,40],[-40,-60,40],[-40,-60,-40],[40,-60,-40],[40,-60,40],[360,-40,40],[360,-40,-40],[360,200,-40],[360,200,40],[440,-40,40],[440,-40,-40],[440,200,-40],[440,200,40],[360,440,-40],[360,440,40],[440,440,40],[440,440,-40],[-40,440,-40],[-40,440,40],[40,440,40],[40,440,-40],[360,-60,40],[360,-60,-40],[440,-60,-40],[440,-60,40],[-40,-40,-360],[-40,200,-360],[40,-40,-360],[40,200,-360],[360,-40,-360],[360,200,-360],[440,-40,-360],[440,200,-360],[-40,440,-360],[40,440,-360],[40,-60,-360],[-40,-60,-360],[360,440,-360],[440,440,-360],[440,-60,-360],[360,-60,-360],[-40,-40,-440],[-40,200,-440],[40,-40,-440],[40,200,-440],[360,-40,-440],[360,200,-440],[440,-40,-440],[440,200,-440],[40,-60,-440],[-40,-60,-440],[360,440,-440],[440,440,-440],[440,-60,-440],[360,-60,-440],[-40,440,-440],[40,440,-440]]
	}
	const vv = polyhedron({points: vdata.vertices, faces: vdata.faces})

  const vol = center({}, rotateX(degToRad(90), vv))
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)

	// Recup parametres
  const pv = Object.values(params)
  const lH = pv.slice(0,10).filter(Number).map(x => (x-50)/100)
  const lV = pv.slice(10,20).filter(Number).map(x => (x-50)/100)
  
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
		
		eH.push(intersect(tmp[i], c1));
		eV.push(intersect(tmp[i], c2));
	}
	
	rH = rH.map(x=> subtract(x, eV));
	rV = rV.map(x=> subtract(x, eH));

	
	if(params.mode == '3'){ // 3d
		r.push(colorize([0,1,0,0.8], translateX(-70, subtract(vol, [rH,rV]))));
		
		r.push(colorize([0.5,0.0,0], translateX(-70, rH.shift())));
		if(rH.length > 0){
			r.push(colorize([1,0,0], translateX(-70, rH)));
		}
				
		r.push(colorize([0,0,0.5], translateX(-70, rV.shift())));
		if(rV.length > 0){
			r.push(colorize([0,0,1], translateX(-70, rV)));
		}
	} else { // 2d
		var dk = Math.max(fV, fH) *1.1
		for(let ih = 0; ih < rH.length; ih++){
			let b = measureBoundingBox(rH[ih]);
			r.push(translateX(dk *ih, union(vol2surf(rH[ih], 'x', b[0][0]))))
			//r.push(translateX(dk *ih, vol2surf(rH[ih], 'x', b[0][0])))
		}
		for(let iv = 0; iv < rV.length; iv++){
			let b = measureBoundingBox(rV[iv]);
			r.push(translate([dk *iv, -dk - params.dky], union(vol2surf(rV[iv], 'y', b[0][1]))))
			//r.push(translate([dk *iv, -dk], vol2surf(rV[iv], 'y', b[0][1])))
		}
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
