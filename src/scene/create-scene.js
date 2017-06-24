import BABYLON from 'babylonjs';
import {Store, Action} from 'redux';


export default function createScene(canvas,engine,getStore) {


    var scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.White();

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(4, -1, 0), scene);


    function countPoint(t, u, v) {

        var u1 = u - 10;
        var v1 = v - 10;

        var u2 = u + 10;
        var v2 = v + 10;


        var distance1 = Math.sqrt(u1 * u1 + v1 * v1);
        //Math.sin(distance1-t*10)/Math.max(distance1,2)*10*Math.sin(t)

        const m = 1.5;
        const top = (Math.cos(v * 3 + t * 3) + Math.cos(u * 5 + t * 7) + 1) / 10 + 1;

        return ([

            -10 * top * Math.cos(u) * (m + Math.cos(v))
            ,
            -10 * top * Math.sin(v)
            ,
            -10 * top * Math.sin(u) * (m + Math.cos(v))


            //Math.sin(Math.sqrt(u1*u1+v1*v1)-t*10)
            //+
            //Math.sin(Math.sqrt(u2*u2+v2*v2)/2-t*5)*2

        ]);
    }


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


    const material = new BABYLON.StandardMaterial("texture", scene);
    //material.diffuseTexture = new BABYLON.Texture("textures/misc.jpg", scene);
    //material.diffuseTexture.hasAlpha = true;//Have an alpha
    material.backFaceCulling = false;//Show all the faces of the element


    var ribbon = null;
    /*setInterval(function(){

     if(ribbon)ribbon.dispose();
     ribbon = BABYLON.Mesh.CreateRibbon("ribbon", createGraphArray(), false, false, 0, scene);



     },10);*/

    scene.registerBeforeRender(function () {
        if (ribbon)ribbon.dispose();
        ribbon = BABYLON.Mesh.CreateRibbon("ribbon", createGraphArray(), false, false, 0, scene);
        ribbon.material = material;
    });


    return scene;

}