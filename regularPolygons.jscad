// title      : Regular polygons (non intersecting) generator
// author     : Gilbert Duval
// license    : MIT License
// revision   : 0.001
// tags       : polygon
// file       : regularPolygons.jscad

function getParameterDefinitions() {
return [
    { type: 'group', caption: 'REGULAR POLYGONS (non intersecting)'},
    { name: 'mode', type: 'choice', caption:'Mode ?', values: ['demo','edit'], captions : ['View Demo','Edit Polygon']},
    { name: 'count', type: 'int', initial: 3, caption: 'Number of segments ?', min:3}, 
    { name: 'length', type: 'int', initial: 10, caption: 'Length ?' },
];
}

function simpleRotate(cx, cy, x, y, angle) {
// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
// cx, cy : center of rotation - x,y : point to rotate, angle : rotation angle in degrees

var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;

return [nx, ny];
}

function regularPolygon(edgesCount, edgeLength){
// http://www.georgehart.com/virtual-polyhedra/polygons.html

var angleD, vertices = [], i, x, y;

angleD = 360 / edgesCount;

vertices.push([0,0]);
for(i = 1; i < edgesCount; i++){
    x = vertices[i-1][0];
    y = vertices[i-1][1];
    vertices.push(simpleRotate(x, y, x, y + edgeLength, angleD * i));
}

return polygon({points:vertices});
}

function main(params){

var r, i;
    
if(params.mode !== 'demo'){
    r = regularPolygon(params.count, params.length);
} else {
    r = [];
    for(i = 3; i< 9; i++){
        r.push(regularPolygon(i,(9-i)*2).translate([(i-5)*15,9-i]));
    }

    r.push(
        difference(
            regularPolygon(8,10).translate([0,-30]),
            regularPolygon(4,10).rotateZ(45).translate([5,-34])
        )
    );
}

return r;
}
