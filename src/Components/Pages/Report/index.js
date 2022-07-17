import React from "react";
import Card from "../../../UI/Card";
import "./Report.css";
import TableComp from "./TableComp";
import moment from "moment";

const Report = () => {
    const date = moment().format('DD-MM-YYYY')
  return (
    <div className="image-container">
      <div className="heading-container">
        <h1>Day to Day Expenses</h1>
      </div>
      <div className="dateinfo">
      <label>{date}</label>
      <label>{}</label>
      </div>
      <Card>
        <div className="year-container">
           <h3>2022</h3>
           <lable>July 2022</lable> 
        </div>
        <div>
            <TableComp />
        </div>
      </Card>
      <Card>
      <div className="year-container">
           <h3>Yearly Report</h3>
        </div>
        <div>
            <TableComp />
        </div>
      </Card>
    </div>
  );
};

export default Report;
