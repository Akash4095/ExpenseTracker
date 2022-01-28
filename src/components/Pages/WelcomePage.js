import React from "react";
import { Link } from "react-router-dom";
import Expenses from "../Expenses/Expense";

const WelcomePage = () => {
  return (
    <>
      <div>
        <h1>Welcome to expense tracker</h1>
      </div>
    
        <p>
          Your profile is Incomplete
        </p>
        <Link to="/completeprofile">Complete Now</Link>

        <Expenses/>
     
    </>
  );
};

export default WelcomePage;
