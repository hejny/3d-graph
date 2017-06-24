import * as React from "react";
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
    return {
        countPoint:state.countPoint
    }
};



const mapDispachToProps = (dispatch) => {
    return {
        countPointChange:(code)=>dispatch({type:'COUNT_POINT_CHANGE',code})
    }
};


let Editor = ({ countPoint,countPointChange }) => {
    return (
        <div className="editor">
            <textarea defaultValue={countPoint} onChange={(event=>countPointChange(event.target.value))}></textarea>
        </div>
    )
};



Editor = connect(mapStateToProps,mapDispachToProps)(Editor);

export default Editor