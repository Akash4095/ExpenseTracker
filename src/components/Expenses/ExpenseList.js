import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseReducer";

const ExpenseList = (props) => {
  const settingExpense = useSelector(state=> state.expense.expense)

  const dispatch = useDispatch();
    const navigate = useNavigate();
 
  const removeHandler = (tempkey, money) => {
    console.log("tempk", tempkey);

    axios
      .delete(
        `https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses/${tempkey}.json`
      )
      .then((response) => {

          console.log("resDelete", response.data)
        axios
          .get(
            "https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses.json"
          )
          .then((response) => {
            
            const dataArray = [];
            for (const key in response.data) {
              console.log("sfjbh", key);
              dataArray.push({
                tempkey: key,
                id: response.data[key].id,
                money: response.data[key].money,
                description: response.data[key].description,
                category: response.data[key].category,
              });
            }

         
            

            dispatch(expenseActions.expense(dataArray))


          });
          dispatch(expenseActions.afterDeleteExpense(money))
      });
  };


  return (
    <div>
      

      {settingExpense.map((item) => {
        return (
          <ul key={item.id}>
           
            <li>Money Spent: ${item.money}</li>
            <li>Description: {item.description} </li>
            <li>Category: {item.category}</li>
            <button type="button" onClick = {()=> navigate(`/editexpense/${item.tempkey}`)}>Edit</button>
           
            <button type="button" onClick={() => removeHandler(item.tempkey,item.money)}>
              Delete
            </button>
          </ul>
        );
      })}
    </div>
  );
};
export default ExpenseList;