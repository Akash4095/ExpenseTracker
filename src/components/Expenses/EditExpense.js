import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react/cjs/react.development";

const EditExpense = () => {
  const inputEditMoneyRef = useRef();
  const inputEditDescriptionRef = useRef();
  const inputEditCategoryRef = useRef();

  const [editKey, setEditKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = window.location.pathname;
    const editKey = pathname.split("/")[2];
    setEditKey(editKey);
  }, []);

  const expenseEditHandler = (event) => {
    event.preventDefault();
    const enteredEditMoney = inputEditMoneyRef.current.value;
    const enteredEditDescription = inputEditDescriptionRef.current.value;
    const enteredEditCategory = inputEditCategoryRef.current.value;

    const newEditExpense = {
      money: enteredEditMoney,
      description: enteredEditDescription,
      category: enteredEditCategory,
      id: Math.random().toString(),
    };

    fetch(
      `https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses/${editKey}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          money: enteredEditMoney,
          description: enteredEditDescription,
          category: enteredEditCategory,
         
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        alert("you edited successfully");
        navigate('/welcome')
      } else {
        return res.json().then((data) => {
          console.log(data.error);
        });
      }
    });
  }

    return (
      <div>
        <form onSubmit={expenseEditHandler}>
          <label htmlFor="editMoney">Money Spent</label>
          <input id="editMoney" type="text" ref={inputEditMoneyRef}></input>
          <label htmlFor="editDescription">Description</label>
          <input
            id="editDescription"
            type="text"
            ref={inputEditDescriptionRef}
          ></input>
          <label htmlFor="editCategory">Category</label>
          <select name="Category" id="editCategory" ref={inputEditCategoryRef}>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    );

};

export default EditExpense;