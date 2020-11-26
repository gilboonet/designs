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
  const faces =[[0,206,214],[1,149,156],[1,156,223],[2,157,150],[2,223,157],[3,190,222],[3,222,93],[4,8,94],[4,149,5],[5,9,4],[5,10,9],[5,149,1],[5,223,6],[6,10,5],[6,11,10],[6,150,7],[6,223,2],[7,11,6],[7,75,95],[7,93,75],[7,150,93],[8,4,9],[9,96,8],[10,13,9],[10,97,14],[11,74,97],[11,95,74],[11,97,10],[12,96,13],[13,26,25],[13,81,12],[13,96,9],[14,13,10],[14,26,13],[14,69,26],[14,97,15],[15,69,14],[15,97,69],[16,80,117],[16,82,169],[16,212,80],[17,29,225],[17,153,29],[17,156,153],[18,30,151],[18,225,30],[19,70,132],[19,172,70],[19,221,172],[20,91,112],[20,117,91],[21,77,127],[21,132,77],[22,90,107],[22,112,90],[23,76,122],[23,127,76],[24,36,83],[24,81,25],[24,107,81],[25,37,24],[25,81,13],[26,37,25],[26,39,38],[26,69,27],[27,39,26],[27,122,71],[28,82,115],[28,210,168],[29,153,154],[29,159,160],[29,227,226],[30,162,152],[30,225,226],[30,227,161],[31,72,130],[31,217,72],[32,89,110],[32,115,89],[33,79,125],[33,130,79],[34,88,105],[34,110,88],[35,78,120],[35,125,78],[36,24,37],[36,59,85],[36,105,83],[37,59,36],[37,60,53],[38,37,26],[38,60,37],[38,61,54],[39,61,38],[39,120,73],[40,98,208],[40,195,207],[40,207,98],[41,56,147],[41,147,57],[41,159,56],[41,227,160],[42,57,145],[42,145,58],[42,162,161],[42,227,57],[43,179,215],[43,215,99],[44,87,100],[44,98,87],[44,100,67],[45,67,142],[45,142,63],[45,147,67],[46,63,140],[46,140,65],[46,145,63],[47,65,101],[47,99,65],[48,86,102],[48,100,86],[48,102,66],[49,66,137],[49,137,62],[49,142,66],[50,62,135],[50,135,64],[50,140,62],[51,64,103],[51,101,64],[52,85,59],[52,102,85],[53,59,37],[53,137,59],[54,60,38],[54,135,60],[55,103,61],[56,164,148],[56,209,164],[57,147,146],[57,227,41],[58,144,165],[58,145,144],[58,162,42],[58,218,162],[59,102,52],[59,137,138],[60,135,136],[60,137,53],[61,73,55],[61,103,134],[61,135,54],[62,137,136],[62,140,141],[62,142,49],[63,142,141],[63,145,146],[63,147,45],[64,101,139],[64,135,134],[64,140,50],[65,99,144],[65,140,139],[65,145,46],[66,100,48],[66,102,138],[66,142,143],[67,98,44],[67,100,143],[67,147,148],[68,132,133],[68,187,221],[68,221,19],[69,97,123],[69,122,27],[70,130,131],[70,173,31],[71,39,27],[71,120,39],[71,122,121],[72,182,216],[73,61,39],[73,103,55],[73,120,119],[74,95,128],[74,122,123],[74,127,23],[75,93,133],[75,127,128],[75,132,21],[76,120,121],[76,125,35],[76,127,126],[77,125,126],[77,130,33],[77,132,131],[78,101,51],[78,103,119],[78,125,124],[79,99,47],[79,101,124],[79,130,129],[80,205,211],[80,211,118],[81,96,12],[81,107,108],[82,117,116],[83,105,106],[83,107,24],[84,114,207],[84,115,114],[84,196,210],[84,210,28],[85,102,104],[85,105,36],[86,100,109],[86,105,104],[86,110,34],[87,98,114],[87,110,109],[87,115,32],[88,107,106],[88,110,111],[88,112,22],[89,112,111],[89,115,116],[89,117,20],[90,94,8],[90,96,108],[90,112,113],[91,92,4],[91,94,113],[91,117,118],[92,149,4],[92,211,0],[93,219,3],[93,222,133],[94,91,4],[95,11,7],[96,90,8],[98,207,114],[99,165,144],[99,216,43],[101,79,47],[103,78,51],[104,102,86],[104,105,85],[105,86,34],[106,105,88],[106,107,83],[107,88,22],[108,96,81],[108,107,90],[109,100,87],[109,110,86],[110,87,32],[111,110,89],[111,112,88],[112,89,20],[113,94,90],[113,112,91],[114,115,87],[115,84,28],[116,115,82],[116,117,89],[117,82,16],[118,92,91],[118,117,80],[118,211,92],[119,103,73],[119,120,78],[120,76,35],[121,120,71],[121,122,76],[122,74,23],[123,97,74],[123,122,69],[124,101,78],[124,125,79],[125,77,33],[126,125,76],[126,127,77],[127,75,21],[128,95,75],[128,127,74],[129,99,79],[129,130,72],[129,216,99],[130,70,31],[131,130,77],[131,132,70],[132,68,19],[133,132,75],[133,222,68],[134,103,64],[134,135,61],[136,135,62],[136,137,60],[138,102,59],[138,137,66],[139,101,65],[139,140,64],[141,140,63],[141,142,62],[143,100,66],[143,142,67],[144,145,65],[146,145,57],[146,147,63],[148,98,67],[148,147,56],[148,164,98],[149,92,163],[149,213,155],[150,6,2],[150,157,158],[150,220,166],[151,157,18],[151,171,158],[151,173,172],[152,151,30],[152,162,173],[153,156,155],[153,168,154],[153,170,169],[154,159,29],[154,168,159],[155,156,149],[155,170,153],[155,213,170],[156,225,224],[157,223,224],[157,225,18],[158,157,151],[158,220,150],[159,168,167],[159,209,56],[160,159,41],[160,227,29],[161,162,30],[161,227,42],[162,218,174],[163,92,214],[163,203,213],[163,213,149],[164,198,208],[165,99,215],[165,180,218],[165,218,58],[166,93,150],[166,189,219],[167,197,209],[167,209,159],[168,82,28],[168,210,167],[169,82,168],[169,168,153],[169,212,16],[170,204,212],[170,212,169],[171,188,220],[171,220,158],[172,171,151],[172,221,171],[173,70,172],[173,151,152],[173,217,31],[174,173,162],[174,181,217],[174,217,173],[175,43,182],[175,182,179],[176,72,181],[176,181,182],[177,165,179],[178,174,180],[179,43,175],[179,180,177],[180,165,177],[180,179,181],[180,181,178],[181,174,178],[181,179,182],[182,72,176],[183,3,189],[183,189,190],[184,68,190],[184,190,187],[185,166,188],[185,188,189],[186,171,187],[186,187,188],[187,68,184],[188,171,186],[188,187,189],[189,166,185],[189,187,190],[190,3,183],[191,40,198],[192,84,195],[193,164,197],[194,167,196],[195,40,191],[195,196,192],[196,84,192],[196,195,198],[196,197,194],[197,167,194],[197,196,198],[197,198,193],[198,164,193],[198,195,191],[199,0,205],[199,205,206],[200,80,204],[201,163,206],[201,206,203],[202,170,203],[202,203,204],[203,163,201],[203,206,204],[204,170,202],[204,205,200],[204,206,205],[205,80,200],[206,0,199],[207,195,84],[208,98,164],[208,198,40],[209,197,164],[210,196,167],[211,205,0],[212,204,80],[213,203,170],[214,92,0],[214,206,163],[215,179,165],[216,129,72],[216,182,43],[217,181,72],[218,180,174],[219,93,166],[219,189,3],[220,188,166],[221,187,171],[222,190,68],[223,5,1],[224,223,156],[224,225,157],[225,156,17],[226,225,29],[226,227,30]]
  const vertices = [[-254.60584769,-255.39176535,-649.81088284],[-250.50590912,-255.89640378,-216.76402847],[-250.50590912,-255.89640378,216.56887153],[-255.40689285,-256.15817804,650.29328619],[-254.60584769,-82.05834535,-649.81088284],[-254.60584769,-82.05834535,-216.47733284],[-254.60584769,-82.05834535,216.85556716],[-255.40689285,-82.82475804,650.29328619],[-254.60584769,91.27481465,-649.81088284],[-254.60584769,91.27481465,-216.47733284],[-254.60584769,91.27481465,216.85556716],[-255.40689285,90.50840196,650.29328619],[-254.60584769,264.60823465,-649.81088284],[-254.60584769,264.60823465,-216.47733284],[-254.60584769,264.60823465,216.85556716],[-255.40689285,263.84182196,650.29328619],[-81.27242769,-255.39176535,-649.81088284],[-81.27242769,-255.39176535,-216.47733284],[-81.27242769,-255.39176535,216.85556716],[-81.27242769,-255.39176535,650.18911716],[-81.27242769,-82.05834535,-649.81088284],[-82.3800498,-83.60312954,649.85159312],[-81.27242769,91.27481465,-649.81088284],[-82.71830353,89.2626195,649.75283282],[-81.27242769,264.60823465,-649.81088284],[-81.27242769,264.60823465,-216.47733284],[-81.27242769,264.60823465,216.85556716],[-81.42411766,264.46310286,650.20884314],[92.06073231,-255.39176535,-649.81088284],[92.06073231,-255.39176535,-216.47733284],[92.06073231,-255.39176535,216.85556716],[92.06073231,-255.39176535,650.18911716],[92.06073231,-82.05834535,-649.81088284],[90.90504833,-83.83389923,649.67438635],[92.06073231,91.27481465,-649.81088284],[90.56687711,89.01989569,649.56366881],[92.06073231,264.60823465,-649.81088284],[92.06073231,264.60823465,-216.47733284],[92.06073231,264.60823465,216.85556716],[91.89477816,264.32418982,650.08633339],[265.39415231,-255.39176535,-649.81088284],[265.39415231,-255.39176535,-216.47733284],[265.39409277,-255.37813271,216.8419305],[265.39415231,-255.39176535,650.18911716],[265.39415231,-82.05834535,-649.81088284],[267.27638468,-83.64477414,-218.64608722],[267.4757899,-81.19642328,211.81697859],[264.53965819,-82.9228633,650.25360743],[265.39415231,91.27481465,-649.81088284],[267.25744065,89.70435273,-218.62425944],[267.4565853,92.17127901,211.82058485],[264.40917349,90.17079276,650.15673983],[264.6692132,263.21571225,-646.7308404],[264.6692132,263.21571225,-213.3972904],[264.66916236,263.22735172,219.92396669],[263.86816803,262.44929956,653.37332863],[230.05171474,-229.39176535,-433.14410784],[287.66529749,-291.79540885,-14.03336008],[230.05171474,-229.39176535,433.52234216],[229.32677563,263.21571225,-430.0640654],[286.94035837,252.81206875,-10.95331765],[229.32677563,263.21571225,436.6023846],[287.664061,81.15429442,-12.25768951],[287.66467736,-92.3199957,-13.14595566],[231.07126971,90.86175101,435.13165647],[231.08551592,-82.46770828,434.08583267],[230.99686099,90.47820354,-431.09303325],[231.00202676,-82.8593104,-432.12198625],[-167.93913769,-255.39176535,624.18911716],[-167.93913769,264.60823465,624.18911716],[5.39415231,-255.39176535,676.18911716],[5.08785483,264.18299997,676.09771942],[178.72744231,-255.39176535,624.18911716],[178.36497275,263.91197345,625.72913838],[-168.70260559,90.31663312,624.06231583],[-168.41270551,-82.62225252,624.1406839],[3.71016782,88.83058898,675.58104919],[4.06352826,-84.00781799,675.69064079],[177.6401688,89.90105356,623.7380758],[178.05166402,-83.01506972,623.83839635],[-167.93913769,-255.39176535,-623.81088284],[-167.93913769,264.60823465,-623.81088284],[5.39415231,-255.39176535,-675.81088284],[5.39415231,264.60823465,-675.81088284],[178.72744231,-255.39176535,-623.81088284],[178.36497275,263.91197345,-622.27086162],[178.49466764,91.27481465,-623.81088284],[178.61105489,-82.05834535,-623.81088284],[5.39415231,91.27481465,-675.81088284],[5.39415231,-82.05834535,-675.81088284],[-167.93913769,91.27481465,-623.81088284],[-167.93913769,-82.05834535,-623.81088284],[-254.60584769,-168.72505535,-623.81088284],[-255.40689285,-169.49146804,624.29328619],[-254.60584769,4.60823465,-675.81088284],[-255.40689285,3.84182196,676.29328619],[-254.60584769,177.94152465,-623.81088284],[-256.45807352,175.24567579,623.51292389],[239.39415231,-168.72505535,-623.81088284],[237.94244907,-171.03769786,623.46083938],[291.39415231,4.60823465,-675.81088284],[290.37220014,6.50603269,673.09299363],[239.03168275,177.24526345,-622.27086162],[237.17945693,174.54941459,625.05294511],[178.43019342,177.09659314,-597.04530397],[92.06073231,177.48769938,-623.81088284],[5.39415231,177.87124179,-649.81088284],[-81.27242769,177.71461184,-623.81088284],[-167.93913769,177.55798206,-597.81088284],[178.55285554,4.61676594,-649.81088284],[92.06073231,4.60823465,-675.81088284],[5.39415231,4.59970336,-701.81088284],[-81.27242769,4.60823465,-675.81088284],[-167.93913769,4.61676594,-649.81088284],[178.66921396,-168.67346678,-597.81088284],[92.06073231,-168.72505535,-623.81088284],[5.39415231,-168.77664392,-649.81088284],[-81.27242769,-168.72505535,-623.81088284],[-167.93913769,-168.67346678,-597.81088284],[177.27249931,174.73684238,598.18464503],[90.71781334,174.78347154,623.44669292],[3.89452285,174.82839772,649.46707177],[-82.76649975,175.01447222,623.46634908],[-169.24413304,175.20036733,597.44176128],[177.71521024,2.56044343,649.69044491],[90.61487245,2.05713086,675.52888042],[3.79039268,2.09284111,701.5641151],[-82.66123456,2.47251666,675.71889175],[-168.66874922,3.2789535,650.01874014],[177.58116239,-171.08234912,597.4132902],[90.81358184,-171.16515251,623.43423905],[4.06357614,-171.2479356,649.44508784],[-82.60022662,-171.29284391,623.44472668],[-168.11182993,-169.40823211,598.2115743],[204.22807553,174.03692699,436.0746022],[240.07603469,177.04371519,215.6236045],[261.26182714,176.56617886,-11.40614556],[239.96407666,176.40977086,-216.01228903],[204.17123677,175.87280322,-430.5843522],[257.06708085,6.82210266,432.01871325],[293.46428774,6.88874395,211.40881053],[313.65199788,7.01468219,-15.47737929],[293.25348377,7.25810861,-221.68119595],[256.99942285,4.51484075,-431.60332244],[204.5589326,-170.94228411,434.02538721],[240.42607354,-168.75698184,214.14928114],[261.66529749,-169.6817791,-13.46253442],[240.3358245,-169.46753676,-217.56235066],[204.52567137,-169.3432901,-432.63433706],[-254.60584769,-229.39176535,-433.14410784],[-255.00637027,-229.7749717,433.57442668],[-81.27242769,-229.39176535,433.5568257],[92.06073231,-229.39176535,433.53762661],[-81.27242769,-229.39176535,-433.14410784],[92.06073231,-229.39176535,-433.14410784],[-167.93913769,-229.39176535,-433.14410784],[-167.28203887,-255.47264396,-216.52328166],[-167.28203887,-255.47264396,216.80961834],[-167.93780728,-229.58292387,433.56560577],[178.72744231,-229.39176535,-433.14410784],[178.72744231,-255.39176535,-216.47733284],[178.72813155,-255.38494897,216.84874877],[178.72744231,-229.39176535,433.52802705],[-254.60584769,-255.39176535,-541.47749534],[247.72293353,-255.39176535,-541.47749534],[247.72293353,-255.39176535,541.85572966],[-255.20663156,-255.96657487,541.93385644],[178.72744231,-255.39176535,-541.47749534],[92.06073231,-255.39176535,-541.47749534],[-81.27242769,-255.39176535,-541.47749534],[-167.93913769,-255.39176535,-541.47749534],[-167.9385638,-255.47422464,541.96060836],[-81.27242769,-255.39176535,541.94544175],[92.06073231,-255.39176535,541.8981764],[178.72744231,-255.39176535,541.87454369],[241.51857246,-515.39176535,619.85812204],[198.18521746,-515.39176535,606.85812204],[232.68296307,-515.39176535,565.69142829],[198.18521746,-515.39176535,565.70083531],[237.10076777,-515.39176535,592.77477517],[215.43409027,-515.39176535,565.6961318],[198.18521746,-515.39176535,586.27947867],[219.85189496,-515.39176535,613.35812204],[-233.51484966,-515.95293188,619.94375162],[-189.78097208,-515.56972554,606.8916671],[-233.41471902,-515.8571303,565.76403674],[-189.78068513,-515.61095518,565.7774127],[-189.78082861,-515.59034036,586.3345399],[-211.59770208,-515.73404274,565.77072472],[-233.46478434,-515.90503109,592.85389418],[-211.64791087,-515.76132871,613.41770936],[241.51857246,-515.39176535,-619.47753596],[198.18521746,-515.39176535,-606.47753596],[232.68296307,-515.39176535,-565.31084221],[198.18521746,-515.39176535,-565.31084221],[219.85189496,-515.39176535,-612.97753596],[198.18521746,-515.39176535,-585.89418909],[215.43409027,-515.39176535,-565.31084221],[237.10076777,-515.39176535,-592.39418909],[-232.93917019,-515.39176535,-619.47753596],[-189.60581519,-515.39176535,-606.47753596],[-232.93917019,-515.39176535,-565.31084221],[-189.60581519,-515.39176535,-565.31084221],[-211.27249269,-515.39176535,-565.31084221],[-189.60581519,-515.39176535,-585.89418909],[-211.27249269,-515.39176535,-612.97753596],[-232.93917019,-515.39176535,-592.39418909],[222.06079731,-255.39176535,-636.81088284],[256.55854292,-255.39176535,-595.64418909],[213.22518792,-255.39176535,-541.47749534],[178.72744231,-255.39176535,-582.64418909],[-211.27249269,-255.39176535,-636.81088284],[-167.93913769,-255.39176535,-582.64418909],[-211.27249269,-255.39176535,-541.47749534],[-254.60584769,-255.39176535,-595.64418909],[256.55854292,-255.39176535,596.02242341],[222.06079731,-255.39176535,637.18911716],[178.72744231,-255.39176535,583.03183043],[213.22518792,-255.39176535,541.86513668],[-255.30676221,-256.06237646,596.11357131],[-211.57259768,-255.72039976,541.9472324],[-167.93885074,-255.432995,583.07486276],[-211.67301527,-255.7749717,637.24120168],[-250.50590912,-281.89640378,-0.097578471],[-167.28203887,-281.47264396,-2.2550728],[-81.27242769,-281.39176535,-4.4843394],[92.06073231,-281.39176535,-8.97672504],[178.72776878,-281.38853662,-11.22293372]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
