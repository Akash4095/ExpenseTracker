import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import Premium from "../Pages/Premium";
import { expenseActions } from "../../store/expenseReducer";
import "./Expense.css";


const Expenses = () => {

   const [premiumBtn, setPremiumBtn] = useState(false)
  const [premiumfeatures, setPremiumfeatures] = useState(false)

  const TotalExpense = useSelector((state) => state.expense.totalexpense);
  console.log("total", TotalExpense);

  // const dummyExpense = [
  //   {
  //     id:'e1',
  //     money: "100",
  //     description: "For health and school",
  //     category: "salary",
  //   },
  // ];

  const dispatch = useDispatch();
  const inputExpenseMoneyRef = useRef();
  const inputExpenseDescriptionRef = useRef();
  const inputExpenseCategoryRef = useRef();

  useEffect(() => {
    axios
      .get(
        "https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses.json"
      )
      .then((response) => {
        if (response.data !== null) {
          console.log("res dat", response.data);

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

            dispatch(expenseActions.totalExpense(response.data[key].money));
          }

          dispatch(expenseActions.expense(dataArray));
        } else {
          console.log("nothing to show");
        }
      });
  }, [dispatch]);

  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    const enteredExpenseMoney = inputExpenseMoneyRef.current.value;
    const enteredExpenseDescription = inputExpenseDescriptionRef.current.value;
    const enteredExpenseCategory = inputExpenseCategoryRef.current.value;

    const newExpense = {
      money: enteredExpenseMoney,
      description: enteredExpenseDescription,
      category: enteredExpenseCategory,
      id: Math.random().toString(),
    };

    fetch(
      "https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("data sent to the backend");
          return res.json();
        } else {
          return res.json((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then(
        dispatch(expenseActions.addingExpense(newExpense)),
        dispatch(expenseActions.totalExpense(newExpense.money))
      )
      .catch((err) => {
        alert(err.message);
      });

    inputExpenseMoneyRef.current.value = "";
    inputExpenseCategoryRef.current.value = "";
    inputExpenseDescriptionRef.current.value = "";
  };

  useEffect(() => {
    if (TotalExpense >= 10000) {
      setPremiumBtn(true);
    } else {
      setPremiumBtn(false);
    }
  }, [TotalExpense]);

  const activatePremiumHandler = () =>{
    setPremiumfeatures(true)
  }

  // const deleteListHandler=(id)=>{

  //   const deleted= expense.filter((item)=> {return item.id !== id})
  //   setExpense(deleted);

  //  fetch(`https://expensetracker-51d76-default-rtdb.firebaseio.com/Expenses/${id}.json`,{
  //    method:'DELETE',
  //    headers: {
  //     "Content-Type": "application/json",
  //   },
  //  }).then(res=>{
  //    if(res.ok){
  //      alert("Expense successfuly deleted")
  //      return res.json()
  //    }  else{
  //     return res.json((data)=>{
  //       throw new Error(data.error.message)
  //     })
  //   }
  //  })
  // }

  return (
    <div>
      <h2>Enter Daily Expenses</h2>
      <form onSubmit={expenseSubmitHandler}>
        <label htmlFor="expenseMoney">Money Spent</label>
        <input id="expenseMoney" type="text" ref={inputExpenseMoneyRef}></input>
        <label htmlFor="expenseDescription">Description</label>
        <input
          id="expenseDescription"
          type="text"
          ref={inputExpenseDescriptionRef}
        ></input>
        <label htmlFor="expenseCategory">Category</label>
        <select
          name="Category"
          id="expenseCategory"
          ref={inputExpenseCategoryRef}
        >
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <h2 className="totalexpense">Total Expense : ${TotalExpense}</h2>
      {premiumBtn && <button type="button" onClick={activatePremiumHandler}>Activate Premium</button>}
      {premiumfeatures && <Premium/>}


      <ExpenseList />
    </div>
  );
};

export default Expenses;
