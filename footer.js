import React from 'react';
import './footer.css';
class footer extends React.Component {
    render() {
        const {total,displayAll,deleteAll} =this.props

        // const selectDesign = {
        //     border: "1px solid black",
        //     borderRadius: "5px"
        // }
        return (
            <div>
                <p className="itemsLenght">{total.length}-Items Left</p>
                <button className="buttonDisplay" onClick={()=>displayAll("active")}>Active</button>
                <button className="buttonDisplay"onClick={()=>displayAll("all")}>All</button>
                <button className="buttonDisplay" onClick={()=>displayAll("completed")}>Completed</button>
                <button className="btnClearCompleted" onClick={()=>deleteAll("clearCompleted")}>Clear Completed</button>
            </div >
        )
    }
}
export default footer;