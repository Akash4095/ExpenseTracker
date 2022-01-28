import { useRef, useState } from "react";
import ExpenseList from "./ExpenseList";

const Expenses = () => {
  const dummyExpense = [
    {
      money: "100",
      description: "For health and school",
      category: "salary",
    },
  ];

  const [expense, setExpense] = useState(dummyExpense);

  const inputExpenseMoneyRef = useRef();
  const inputExpenseDescriptionRef = useRef();
  const inputExpenseCategoryRef = useRef();

  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    const enteredExpenseMoney = inputExpenseMoneyRef.current.value;
    const enteredExpenseDescription = inputExpenseDescriptionRef.current.value;
    const enteredExpenseCategory = inputExpenseCategoryRef.current.value;

    setExpense((prevState) => {
      return [
        {
          money: enteredExpenseMoney,
          description: enteredExpenseDescription,
          category: enteredExpenseCategory,
        },
        ...prevState,
      ];
    });
    inputExpenseMoneyRef.current.value = "";
    inputExpenseCategoryRef.current.value = "";
    inputExpenseDescriptionRef.current.value = "";
  };

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
      {console.log(`Expenses: ${expense}`)}
      
      <ExpenseList items={expense} />
    </div>
  );
};

export default Expenses;
