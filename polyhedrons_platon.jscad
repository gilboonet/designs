// title      : Regular polyhedrons (Platonic solids)
// author     : Gilbert Duval
// license    : MIT License
// revision   : 0.001
// tags       : polyhedron
// file       : polyhedrons_platon.jscad

// data from dmccooey.com/polyhedra

function getParameterDefinitions() {
return [
    { type: 'group', caption: 'REGULAR POLYHEDRONS'},
    { name: 'mode', type: 'choice', caption:'Mode ?'
        ,values: ['demo','tetra','octa','hexa','dode','icosa']
        ,captions: ['View Demo','Edit Tetrahedron', 'Edit Octahedron', 'Edit Hexahedron','Edit Dodecadron','Edit Icosahedron']},
    { name: 'scale', type: 'int', initial: 10, caption: 'Scale ?'}, 
];
}

function tetrahedron(){
    var C0, vertices, faces;
    
    C0 = Math.sqrt(2) / 4;
    vertices = [ [C0,C0,C0],[-C0,-C0,C0],[-C0,C0,-C0],[C0,-C0,-C0] ];
    faces = [ [0, 3, 1],[0,1,2],[2,1,3],[0,2,3] ];
    
    return polyhedron({points:vertices, polygons:faces});
}

function octahedron(){
    var C0, vertices, faces;
    
    C0 = 1;
    vertices = [ [C0, 0, 0],[-C0, 0, 0],[0, C0, 0]
                ,[0, -C0, 0],[0, 0, C0],[0, 0, -C0] ];
    faces = [ [4,2,0],[4,0,3],[4,3,1],[4,1,2],[5,0,2],[5,3,0],[5,1,3],[5,2,1] ];
    
    return polyhedron({points:vertices, polygons:faces});
}

function hexahedron(){
    var vertices, faces;
    
    vertices = [[0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5],
        [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5] ];
    faces = [ 	[0,3,2,1],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7] ];
    
    return polyhedron({points:vertices, polygons:faces});
}

function dodecahedron(){
    var C0, vertices, faces;
    
    C0 = 1.61803399;
    vertices = [
	[+1, +1, +1], [+1, -1, +1], [-1, -1, +1], [-1, +1, +1],
	[+1, +1, -1], [-1, +1, -1],	[-1, -1, -1], [+1, -1, -1],
	[0, +1/C0, +C0], [0, -1/C0, +C0],
	[0, -1/C0, -C0], [0, +1/C0, -C0],
	[-1/C0, +C0, 0], [+1/C0, +C0, 0],
	[+1/C0, -C0, 0], [-1/C0, -C0, 0],
	[-C0, 0, +1/C0], [+C0, 0, +1/C0],
	[+C0, 0, -1/C0], [-C0, 0, -1/C0] ];
    faces = [
    [1,9,8], [1,8,0], [1,0,17],	[9,1,14], [9,14,15], [9,15,2],
	[9,2,16], [9,16,3], [9,3,8], [8,3,12], [8,12,13], [8,13,0],
	[0,13,4], [0,4,18], [0,18,17], [1,17,18], [1,18,7], [1,7,14],
	[15,14,7], [15,7,10], [15,10,6], [2,15,6], [2,6,19], [2,19,16],
	[16,19,5], [16,5,12], [16,12,3], [12,5,11], [12,11,4], [12,4,13],
	[18,4,11], [18,11,10], [18,10,7], [19,6,10], [19,10,11], [19,11,5] ];
    
    return polyhedron({points:vertices, polygons:faces});
}

function icosahedron(){
    var C0, vertices, faces;
    
    C0 = 1.61803399;
    vertices = [
    	[0, +1, +C0],	[0, +1, -C0],	[0, -1, -C0],	[0, -1, +C0],
    	[+C0, 0, +1],	[+C0, 0, -1],	[-C0, 0, -1],	[-C0, 0, +1],
    	[+1, +C0, 0],	[+1, -C0, 0],	[-1, -C0, 0],	[-1, +C0, 0] ];
    faces = [
        [3,0,4], [3,4,9], [3,9,10], [3,10,7], [3,7,0], [0,8,4], [0,7,11],
        [0,11,8], [4,8,5], [4,5,9], [7,10,6], [7,6,11], [9,5,2], [9,2,10],
        [2,6,10], [1,5,8], [1,8,11], [1,11,6], [5,1,2], [2,1,6] ];

    return polyhedron({points:vertices, polygons:faces});
}


function main(params){

var r;

switch(params.mode){
    case 'demo':
        r = [];
        r.push(color('blue', tetrahedron().scale(5).translate([0,-20,5])));
        r.push(color('yellow',octahedron().scale(3).translate([0,-10,5])));
        r.push(color('magenta',hexahedron().scale(3).translate([0,0,5])));
        r.push(color('green',dodecahedron().scale(1.5).translate([0,10,5])));
        r.push(color('cyan',icosahedron().scale(1.5).translate([0,20,5])));
        
        return r;

    case 'tetra':
        r = tetrahedron();
        break;
        
    case 'octa':
        r = octahedron();
        break;
        
    case 'hexa':
        r = hexahedron();
        break;
        
    case 'dode':
        r = dodecahedron();
        break;
    case 'icosa':
        r = icosahedron();
        break;
}

return r.scale(params.scale);
}
