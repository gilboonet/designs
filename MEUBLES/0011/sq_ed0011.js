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
  const faces =[[0,1,2],[1,17,18],[1,21,3],[2,17,0],[2,21,20],[3,2,1],[3,21,2],[4,9,7],[4,16,9],[5,7,6],[5,23,7],[5,26,13],[6,24,25],[6,26,5],[6,28,27],[6,29,10],[7,15,4],[7,22,15],[7,23,22],[8,6,7],[8,7,9],[8,11,24],[9,11,8],[9,30,12],[10,29,28],[11,9,12],[11,30,31],[12,30,11],[13,23,5],[13,26,33],[13,33,32],[14,4,15],[14,15,35],[15,22,34],[16,4,35],[16,36,19],[16,86,37],[17,1,0],[17,42,52],[17,61,18],[18,21,1],[18,92,21],[19,9,16],[19,75,30],[19,89,75],[20,17,2],[20,43,17],[20,63,43],[21,62,64],[21,63,20],[22,47,34],[23,49,22],[24,6,8],[24,79,25],[25,29,6],[25,79,29],[26,55,33],[27,26,6],[27,57,26],[28,6,10],[28,57,27],[29,77,40],[30,9,19],[30,81,31],[31,24,11],[31,81,24],[32,23,13],[32,49,23],[33,55,41],[34,35,15],[34,47,35],[35,4,14],[35,46,16],[36,16,37],[36,89,19],[37,38,36],[37,65,38],[37,86,65],[38,69,39],[39,36,38],[39,74,36],[40,28,29],[40,59,28],[41,32,33],[41,51,32],[42,17,43],[43,66,85],[43,84,42],[44,84,45],[45,16,46],[45,49,44],[45,83,16],[46,35,47],[46,47,45],[47,22,48],[48,22,49],[48,45,47],[49,32,50],[49,45,48],[50,32,51],[50,44,49],[51,44,50],[51,53,44],[52,42,53],[52,57,61],[53,51,54],[53,54,52],[53,84,44],[54,41,55],[54,51,41],[55,26,56],[55,52,54],[56,26,57],[56,52,55],[57,28,58],[57,52,56],[58,28,59],[58,61,57],[59,61,58],[59,76,60],[60,61,59],[60,92,61],[61,17,52],[61,92,18],[62,67,64],[62,91,73],[63,21,64],[63,72,87],[64,67,63],[65,70,38],[65,86,66],[66,70,65],[67,62,68],[67,69,72],[68,69,67],[68,74,69],[69,38,70],[69,74,39],[70,66,71],[70,72,69],[71,72,70],[71,87,72],[72,63,67],[73,68,62],[73,91,74],[74,68,73],[74,90,36],[75,89,76],[76,59,77],[76,80,75],[76,92,60],[77,29,78],[77,59,40],[77,78,76],[78,29,79],[79,24,80],[79,76,78],[80,24,81],[80,76,79],[81,30,82],[81,75,80],[82,30,75],[82,75,81],[83,45,84],[84,43,85],[84,53,42],[84,86,83],[85,66,86],[85,86,84],[86,16,83],[87,43,63],[87,66,43],[87,71,66],[88,76,89],[89,36,90],[89,91,88],[90,74,91],[90,91,89],[91,92,88],[92,76,88],[92,91,93],[93,21,92],[93,62,21],[93,91,62]]
  const vertices = [[58.89518414,-65.4674221,-70],[58.89518414,-65.4674221,70],[58.89518414,74.5325779,-70],[58.89518414,74.5325779,70],[78.89518414,-85.4674221,-50],[-61.10481586,-85.4674221,-50],[-61.10481586,-85.4674221,50],[38.89518414,-85.4674221,-50],[38.89518414,-85.4674221,50],[78.89518414,-85.4674221,50],[-61.10481586,-105.4674221,50],[38.89518414,-105.4674221,50],[78.89518414,-105.4674221,50],[-61.10481586,-105.4674221,-50],[78.89518414,-105.4674221,-50],[38.89518414,-105.4674221,-50],[78.89518414,-65.4674221,-80],[-91.10481586,-65.4674221,-70],[-91.10481586,-65.4674221,70],[78.89518414,-65.4674221,80],[-91.10481586,74.5325779,-70],[-91.10481586,74.5325779,70],[38.89518414,-85.4674221,-80],[-61.10481586,-85.4674221,-80],[38.89518414,-85.4674221,80],[-61.10481586,-85.4674221,80],[-91.10481586,-85.4674221,-50],[-91.10481586,-85.4674221,50],[-91.10481586,-105.4674221,50],[-61.10481586,-105.4674221,80],[78.89518414,-105.4674221,80],[38.89518414,-105.4674221,80],[-61.10481586,-105.4674221,-80],[-91.10481586,-105.4674221,-50],[38.89518414,-105.4674221,-80],[78.89518414,-105.4674221,-80],[78.89518414,74.5325779,80],[78.89518414,74.5325779,-80],[78.89518414,84.5325779,-80],[78.89518414,84.5325779,80],[-91.10481586,-105.4674221,80],[-91.10481586,-105.4674221,-80],[-101.10481586,-55.4674221,-80],[-101.10481586,64.5325779,-80],[-91.10481586,-75.4674221,-90],[68.89518414,-75.4674221,-90],[68.89518414,-95.4674221,-90],[48.89518414,-95.4674221,-90],[48.89518414,-75.4674221,-90],[-71.10481586,-75.4674221,-90],[-71.10481586,-95.4674221,-90],[-91.10481586,-95.4674221,-90],[-101.10481586,-75.4674221,-70],[-101.10481586,-75.4674221,-80],[-101.10481586,-95.4674221,-80],[-101.10481586,-95.4674221,-60],[-101.10481586,-75.4674221,-60],[-101.10481586,-75.4674221,60],[-101.10481586,-95.4674221,60],[-101.10481586,-95.4674221,80],[-101.10481586,-75.4674221,80],[-101.10481586,-75.4674221,70],[-101.10481586,84.5325779,80],[-101.10481586,84.5325779,-60],[-101.10481586,84.5325779,60],[68.89518414,84.5325779,-90],[-91.10481586,84.5325779,-90],[-91.10481586,94.5325779,70],[-91.10481586,94.5325779,80],[68.89518414,94.5325779,80],[68.89518414,94.5325779,-80],[-91.10481586,94.5325779,-80],[-91.10481586,94.5325779,-70],[-91.10481586,84.5325779,90],[68.89518414,84.5325779,90],[68.89518414,-75.4674221,90],[-91.10481586,-75.4674221,90],[-91.10481586,-95.4674221,90],[-71.10481586,-95.4674221,90],[-71.10481586,-75.4674221,90],[48.89518414,-75.4674221,90],[48.89518414,-95.4674221,90],[68.89518414,-95.4674221,90],[68.89518414,-55.4674221,-90],[-91.10481586,-55.4674221,-90],[-91.10481586,64.5325779,-90],[68.89518414,64.5325779,-90],[-101.10481586,84.5325779,-80],[-91.10481586,-55.4674221,90],[68.89518414,-55.4674221,90],[68.89518414,64.5325779,90],[-91.10481586,64.5325779,90],[-101.10481586,-55.4674221,80],[-101.10481586,64.5325779,80]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
