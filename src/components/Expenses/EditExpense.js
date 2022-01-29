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
    const enteredEditMoney = inputEditCategoryRef.current.value;
    const enteredEditDescription = inputEditDescriptionRef.current.value;
    const enteredEditCategory = inputEditCategoryRef.current.value;

    const newEditExpense = {
      money: enteredEditMoney,
      description: enteredEditDescription,
      category: enteredEditCategory,
      id: Math.random().toString(),
    };

    axios
      .put(
        `https://expensetracker-c301c-default-rtdb.firebaseio.com/expenses/${editKey}.json`,
        newEditExpense
      )
      .then((response) => {
        console.log("resDelete", response.data);
        navigate('/welcome')
      });
    };

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