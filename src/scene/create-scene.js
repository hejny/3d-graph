import BABYLON from 'babylonjs';
import {Store, Action} from 'redux';
import updateScene from './update-scene';

export default function createScene(canvas,engine,getStore) {


    var scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.White();

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(4, -1, 0), scene);




    const material = new BABYLON.StandardMaterial("texture", scene);
    //material.diffuseTexture = new BABYLON.Texture("textures/misc.jpg", scene);
    //material.diffuseTexture.hasAlpha = true;//Have an alpha
    material.backFaceCulling = false;//Show all the faces of the element



    scene.registerBeforeRender(function () {
        updateScene(scene,getStore().getState(),material);
    });




    return scene;

}