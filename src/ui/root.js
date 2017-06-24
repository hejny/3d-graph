import * as React from "react";
import Editor from './editor';


import './style/root.scss';
import './style/menu-top.scss';
import './style/footer.scss';


export default function Root() {
    return (
        <div className="root">


            <Editor/>


        </div>
    )
}