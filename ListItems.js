import React, { Component } from 'react';
import './App.css';
export default class listItems extends Component {
    render(){
    const handleUpdate=this.props.handleUpdate;
    const items = this.props.items;
    const handleKeyPress=this.props.handleKeyPress;
    const deleteItem=this.props.deleteItem;
    const setUpdate=this.props.setUpdate;
    const hanldeChecked=this.props.hanldeChecked
    const listItems = items.map(item => {
        const isChecked={
            textDecoration:item.isChecked === true ? "line-through" :"none",
            display:item.isDisplay ? "none" :"block "
        };
        
        const isDisplay = {
            display: item.isDisplay ? "block" : "none"
        };

        return <tr classNamsamllTd key={item.key}>
            <td className="deleteTd">
                <input className="checkBox" type="checkbox"checked={item.isChecked} onChange={()=>hanldeChecked(item.key)}></input>
              </td>
            <td className="listTd" onDoubleClick={() =>handleUpdate(item.key)}>
            <p className="listItems"style={isChecked}>{item.text}
                
            </p>
            <input type="text" className="txtUpdate"style={isDisplay} id={item.key} value={item.text}
                    onChange={
                        (e) =>
                            setUpdate(e.target.value, item.key)}
                            onKeyPress={handleKeyPress}
                            >
                </input>
            </td>
            <td className="deleteTd">
                <p className="delete" onClick={()=>deleteItem(item.key)}>X</p>
            </td>

        </tr>
    })
    return (
        <div>{listItems}</div>
    )
    }
}