// table TETE ELEPHANT pour choix couleur

function main()
{
    pProfil = polygon([[0,32],[17,31],[22,24],[25,0],[22,-20],[11,-27],[4,-21],[6,-21],[11,-25],[19,-19],[18,-4],[16,5],[10,8],[0,8]]);
    
    oeil = circle(1).translate([14,17]);

    p= pProfil.subtract(oeil);

    p = p.extrude({offset:[0,0,1]});
    p = color("silver", p);
    
    oeil = oeil.extrude({offset:[0,0,1]});
    oeil = color("black", oeil);
    
    p = p.union(oeil);
    p = p.union(p.mirroredX());
    p = p.union(p.rotateY(90));


    plateau = cube([60,4,60]);
    plateau = plateau.translate([-30,30,-30]);
    
    table1 = p.union(color("ivory", plateau));
    table2 = p.union(color("tan", plateau));

    return [
        table1.translate([-50,0,150]),
        table2.translate([ 50,0,150])
    ];
}
