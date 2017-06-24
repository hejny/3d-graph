import * as BABYLON from 'babylonjs';

export default function updateScene(scene, state, material) {
    //console.log('updateScene');

    scene.meshes.forEach((mesh) => {
        mesh.dispose();
    });
    scene.meshes = [];

    const countPoint = eval(state.countPoint);
    //const countPoint = null;
    //console.log(state,countPoint);

    function createGraphArray() {


        const
            parts = 40,
            umin = 0,
            umax = Math.PI * 2,
            vmin = 0,
            vmax = Math.PI * 2
            ;

        const
            ustep = (umax - umin) / parts,
            vstep = (vmax - vmin) / parts
            ;


        var t = new Date() / 1000;

        var graphArray = [];
        for (var u = umin; u <= umax; u += ustep) {

            var graphRow = [];
            for (var v = umin; v <= vmax; v += vstep) {

                const [x,y,z] = countPoint(t, u, v);
                graphRow.push(new BABYLON.Vector3(x, y, z));

            }

            graphArray.push(graphRow);
        }
        return graphArray;
    }


    // (name, array of paths, closeArray, closePath, offset, scene)





    //var ribbon = null;
    /*setInterval(function(){

     if(ribbon)ribbon.dispose();
     ribbon = BABYLON.Mesh.CreateRibbon("ribbon", createGraphArray(), false, false, 0, scene);



     },10);*/


    const ribbon = BABYLON.Mesh.CreateRibbon("ribbon", createGraphArray(), false, false, 0, scene);
    ribbon.material = material;


    /*scene.registerBeforeRender(function () {
        if (ribbon)ribbon.dispose();
        ribbon = BABYLON.Mesh.CreateRibbon("ribbon", createGraphArray(), false, false, 0, scene);
        ribbon.material = material;
    });*/
}