import React from 'react'
import { selectTable3ExpData } from '../../Feactures/adminTwodSlice';
import { useSelector } from 'react-redux';

function ThaiTable3() {

    const table3ExpData = useSelector(selectTable3ExpData);
    const list = table3ExpData.map((d,i) => <tr className='table_d_tbody_tr' key={i}>

    <td>{i + 1}</td>
    <td>{d.name}</td>
    <td>{d.amount}</td>
    <td>{d.totallBet}</td>
    <td>{d.winAmount}</td>
    <td>{d.top}</td>
    <td>{d.profit}</td>
    </tr>)
  return (
    <div className='hide_scroll table_d_container'>
        <table className='table_d'>
            <thead>
                <tr> 
                    <th>စဉ်</th>
                    <th>ထိုးသားစာရင်း</th>
                    <th>အကြိမ်အရေအတွက်</th>
                    <th>ထိုးသည့်ပမာဏစုစုပေါင်း</th>
                    <th>နိုင်သည့်ပမာဏ</th>
                    <th>ဂုတ်စီး</th>
                    <th>အရှုံးအမြတ်</th>
                </tr>
            </thead>
            <tbody>
                 {list}
            </tbody>
        </table>
    </div>
  )
}

export default ThaiTable3


//      