import React from "react";
import { selectTable1Data } from "../../Feactures/adminTwodSlice";
import Tables from "../../Component/Tables";
import { useSelector } from "react-redux";
import { selectLuckyWinner } from "../../Feactures/twoDapiSlice";
import styles from "./ThaiTwoD12am.module.css";

function ThaiTwoDTable({ mainData, text }) {
  const table1Data = useSelector(selectTable1Data);
  const luckyWinner = useSelector(selectLuckyWinner);

  const foundObjects = mainData?.map((target) => {
    const foundData = luckyWinner.data?.filter(
      (data) => data.number === target.number
    );

    console.log("working", foundData);

    if (foundData) {
      return { ...target, foundData };
    } // or handle the case when no match is found
  });

  console.log(foundObjects);

  const list = foundObjects
    ?.sort((a, b) => a.number - b.number)
    .map((d, i) => (
      <tr className="table_d_tbody_tr" key={d.number}>
        <td>{i + 1}</td>
        <td>{d.number}</td>
        <td>{d.count}</td>
        <td>{d.amount}</td>
        <td>
          {d.foundData?.reduce((acc, curr) => acc + curr.returnedAmount, 0)}
        </td>
        <td>
          {d.foundData.length >= 1
            ? d.foundData?.reduce((acc, curr) => acc + curr.returnedAmount, 0) -
              d.amount
            : `${-d.amount}`}
        </td>
      </tr>
    ));
  return (
    <div className={`table_d_container hide_scroll ${styles.table1}`}>
      {text === "Choose 2D Category" ? (
        ""
      ) : (
        <Tables thead={table1Data} tbody={list} />
      )}
    </div>
  );
}

export default ThaiTwoDTable;
