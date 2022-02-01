import React from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { themesActions } from "../../store/themeReducer";

const Premium = ()=> {
    const csvData = useSelector(state=> state.expense.expense)
    const dispatch = useDispatch();
    const changeThemeHandler = () => {
        console.log("click")
        dispatch(themesActions.theme())

    }

    const csvReport = {
        filename: 'Repost.csv',
        data: csvData
    }

    return (
        <div>
            <button onClick={changeThemeHandler}>Change theme mode</button>
            <CSVLink {...csvReport}>Download Expenses</CSVLink>

        </div>
    )
}

export default Premium;