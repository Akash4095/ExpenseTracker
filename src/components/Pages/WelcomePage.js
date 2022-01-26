import React from "react";
import { Link } from "react-router-dom";

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
     
    </>
  );
};

export default WelcomePage;
