// CHARNIERE SIMPLE

function main() {
   var r = [];
   
   
   c = cube([30,50,3]);

   s = rotate([90,0,0], cylinder({r:3, h:50})).translate([0,50,3]);
   ss = rotate([90,0,0], cylinder({r:2, h:50})).translate([0,50,3]);

   s4 = rotate([90,0,0], cylinder({r:3, h:12.5})).translate([0,12.5,3]);
   ss4 = rotate([90,0,0], cylinder({r:2, h:12.5})).translate([0,12.5,3]);

   ch = c.subtract(s);
   s1 = s4.subtract(ss4);
   ch = ch.union(s1);
   ch = ch.union(s1.translate([0,25,0]));
   
   // trous pour vis
   t1 = cylinder({r:2, h:7}).translate([15+1.5,5+1.5,-2]);
   t2 = cylinder({r:2, h:7}).translate([15+1.5,50-5-1.5,-2]);
   
   
   ch = ch.subtract([t1,t2]);   
   r = ch;
   
   /* pour tester l'assemblage des deux parties
   r = [color("blue", ch), 
   color("green",rotate([0,-90,0],ch).mirroredX().mirroredY().translate([-3,50,3]))
   ];
   */
   
   return r;
   
}
