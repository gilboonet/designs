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

volume = function () {
  const faces =[[0,2,4],[0,6,7],[0,7,1],[0,29,6],[0,45,29],[1,2,0],[1,7,8],[1,9,2],[2,9,3],[3,4,2],[3,9,10],[3,13,5],[4,13,12],[4,31,30],[4,45,0],[5,4,3],[5,13,4],[6,14,15],[6,15,7],[6,29,28],[6,33,14],[7,15,16],[7,16,8],[8,9,1],[8,16,9],[9,19,10],[10,13,3],[10,19,13],[11,19,18],[11,31,4],[12,11,4],[12,19,11],[13,19,12],[14,20,15],[14,22,20],[14,47,17],[15,20,21],[15,21,16],[16,23,19],[17,22,14],[17,27,26],[17,31,11],[17,47,32],[18,17,11],[18,27,17],[19,9,16],[19,27,18],[20,23,21],[22,17,24],[22,23,20],[22,24,23],[23,16,21],[23,24,25],[24,27,25],[25,19,23],[26,24,17],[26,27,24],[27,19,25],[28,29,35],[28,33,6],[30,31,39],[30,44,4],[32,31,17],[33,46,14],[34,29,43],[34,43,35],[35,29,34],[35,33,28],[35,40,36],[36,33,35],[36,46,33],[37,31,32],[37,32,41],[38,31,37],[38,42,39],[39,31,38],[39,44,30],[40,35,43],[40,46,36],[41,38,37],[42,38,41],[42,41,44],[42,44,39],[43,46,40],[44,46,45],[45,4,44],[45,43,29],[45,46,43],[46,44,47],[47,14,46],[47,41,32],[47,44,41]]
  const vertices = [[-457.52023102,-201.50782252,141.00056207],[-457.81436271,-200.40275798,442.32553227],[-457.81436271,-67.06935798,442.32553227],[-457.81436271,66.26384202,442.32553227],[-457.81436271,199.59724202,142.32538227],[-457.81436271,199.59724202,442.32553227],[-157.52008102,-201.50782252,-158.99913793],[-157.81421271,-200.40275798,142.32538227],[-157.81421271,-200.40275798,442.32553227],[-157.81421271,-67.06935798,442.32553227],[-157.81421271,66.26384202,442.32553227],[-157.81421271,199.59724202,-157.67431773],[-157.81421271,199.59724202,142.32538227],[-157.81421271,199.59724202,442.32553227],[142.47961898,-201.50782252,-458.99928793],[142.18548729,-200.40275798,-157.67431773],[142.18548729,-200.40275798,142.32538227],[142.18548729,199.59724202,-457.67446773],[142.18548729,199.59724202,-157.67431773],[142.18548729,199.59724202,142.32538227],[442.18563729,-200.40275798,-457.67446773],[442.18563729,-200.40275798,-157.67431773],[442.18563729,-67.06935798,-457.67446773],[442.18563729,-67.06935798,-157.67431773],[442.18563729,66.26384202,-457.67446773],[442.18563729,66.26384202,-157.67431773],[442.18563729,199.59724202,-457.67446773],[442.18563729,199.59724202,-157.67431773],[-157.45573406,-151.42500859,-158.93479097],[-422.34242532,-151.42500853,105.95145029],[-422.46481232,149.51442816,106.84713797],[-157.87855967,149.51442809,-157.73866469],[106.70724298,149.51442816,-422.32491734],[106.82740538,-151.42500852,-423.21838042],[-144.22697799,-152.13965904,384.06702521],[120.65971327,-152.13965911,119.18078395],[384.94285272,-152.13965904,-145.10280549],[384.82269032,148.79977764,-144.20934242],[120.23688767,148.79977757,120.37691024],[-144.34936498,148.79977764,384.96271289],[384.88679618,-23.48175966,-144.14511964],[384.8868875,21.03371592,-144.14502832],[-144.28486825,21.17586707,385.0270927],[-144.28477693,-23.19745735,385.02718402],[-422.40031559,21.89051759,106.91151778],[-422.40022427,-22.48280683,106.9116091],[106.77134885,-22.76710914,-422.26069456],[106.77144016,21.74836644,-422.26060324]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

const main = (params) => {
  const sc = 1, ep = params.ep *2

	const vd = volume()
	const vv = polyhedron({points: vd.vertices, faces: vd.faces})

  //let vol = center({}, rotateY(degToRad(180), rotateX(degToRad(90), vv)))
  let vol = center({}, rotateX(degToRad(90), vv))
  
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
		
		eH.push(intersect(tmp[i], c1));
		eV.push(intersect(tmp[i], c2));
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
