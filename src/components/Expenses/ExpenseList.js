import React from "react";

const ExpenseList = (props) => {
    return (
        <div>
            {props.items.map((item) => {
                return(
                    <ul>
                    <li>{item.money}{console.log(item.money)}</li>
                    <li>{item.description} {console.log(`item.descript : ${item.description}`)} </li>
                    <li>{item.category}</li>
                </ul>
                )

            })}
        </div>
    )

}

export default ExpenseList;