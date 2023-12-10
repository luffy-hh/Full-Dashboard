import React from "react";
import { selectTable3Data } from "../../Feactures/adminTwodSlice";
import { selectLuckyWinner } from "../../Feactures/twoDapiSlice";
import { useSelector } from "react-redux";
import Tables from "../../Component/Tables";
import styles from "./ThaiTwoD12am.module.css";
function ThaiTable3({ mainData, text }) {
  const table3Data = useSelector(selectTable3Data);
  const luckyWinner = useSelector(selectLuckyWinner);

  console.log(mainData && mainData, "from table3");
  console.log(luckyWinner && luckyWinner, "from tale3");

  const result = mainData?.reduce((accumulator, currentValue) => {
    const existingItem = accumulator.find(
      (item) => item.userId?._id === currentValue.userId?._id
    );

    if (existingItem) {
      existingItem.count++;
      existingItem.amount += currentValue.amount;
    } else {
      accumulator.push({
        userId: currentValue.userId,
        count: 1,
        amount: currentValue.amount,
      });
    }

    return accumulator;
  }, []);

  console.log(result);

  const finalData = result?.map((id) => {
    const winObj = luckyWinner?.data.filter(
      (d) => d?.userId?._id === id?.userId?._id
    );

    if (winObj) {
      return { ...id, winObj };
    }
  });

  const list = finalData?.map((d, i) => (
    <tr key={d.userId.userId} className="table_d_tbody_tr">
      <td>{i + 1}</td>
      <td>{d.userId.name}</td>
      <td>{d.count}</td>
      <td>{d.amount}</td>
      <td>{d.winObj.reduce((acc, curr) => acc + curr.returnedAmount, 0)}</td>
      <td>no data</td>
      <td>
        {d.winObj.length >= 1
          ? d.winObj?.reduce((acc, curr) => acc + curr.returnedAmount, 0) -
            d.amount
          : `${-d.amount}`}
      </td>
    </tr>
  ));

  return (
    <div className={`hide_scroll table_d_container ${styles.table3_report}`}>
      {text === "Choose Category" ? (
        ""
      ) : (
        <Tables thead={table3Data} tbody={list} />
      )}
    </div>
  );
}

export default ThaiTable3;

//
