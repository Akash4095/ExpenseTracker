import React from "react";
import './ExpenseList.css';
import { useNavigate } from "react-router-dom";

const ExpenseList = (props) => {

    const navigate=useNavigate();
    return (
        <div className='main'>
            {props.items.map((item) => {
                return(
                    <ul key={item.id} className='ul' >
                    <li>Money Spent: {item.money}</li>
                    <li>Description: {item.description} </li>
                    <li>Category: {item.category}</li>
                    <button type="btn" onClick = {()=> navigate(`/editexpense/${item.tempkey}`)}>Edit</button>
                    <button onClick={()=>props.onclick(item.id)} className="btn">Delete</button>
                </ul>
                )

            })}
        </div>
    )

}

export default ExpenseList;