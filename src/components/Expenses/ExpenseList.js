import React from "react";

const ExpenseList = (props) => {
    return (
        <div>
            {props.items.map((item) => {
                return(
                    <ul key={item.id}>
                    <li>Money Spent: {item.money}</li>
                    <li>Description: {item.description} </li>
                    <li>Category: {item.category}</li>
                </ul>
                )

            })}
        </div>
    )

}

export default ExpenseList;