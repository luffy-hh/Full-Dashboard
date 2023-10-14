import React, { useEffect } from 'react'
import { selectGetUnitTransfer, selectGetUnitTransferStatus,fetchGetAllUnitTransfer,selectlogInData } from '../../Feactures/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UnitHistoryTransfer.module.css'

function UnitHistoryTransfer() {

    const dispatch = useDispatch();
    const getUnitTransfer = useSelector(selectGetUnitTransfer);
    const getUnitTransferStatus = useSelector(selectGetUnitTransferStatus);
    const logInData = useSelector(selectlogInData);
    const accessToken = logInData.token

    useEffect(()=>{
       dispatch(fetchGetAllUnitTransfer({api:"mainunitstransfer",accessToken}))
    },[])

    const unitTransferArr = getUnitTransfer && getUnitTransfer.data.mainUnitTransferHistory;

    const list =  unitTransferArr &&  unitTransferArr.map((d,i)=> <tr key={i} className={styles.transfer_tr_style}>
        <td>{i+1}</td>
        <td>{new Date(d.transferDate).toLocaleTimeString()}</td>
        <td>{d.beforeUnitAmt}</td>
        <td style={{color : d.status === "in" ? '#22c55e' : "#ef4444" }}>{d.transferAmt}</td>
        <td>{d.afterUnitAmt}</td>
        <td>{d.fromName}</td>
        <td>{d.toName}</td>
        <td>This is for gift</td>
    </tr>)

  return (
    <div className={`page_style ${styles.unit_transfer_page}`}>
        <p className={`${styles.transfer_title} box_shadow`}>UnitHistoryTransfer</p>
        <div className={` hide_scroll ${styles.transfer_container} ` }>
        <table className={`box_shadow ${styles.table_transfer}`}>
            <thead>
                <tr>
                <th style={{minWidth : "10rem"}}>No</th>
                    <th style={{minWidth : "25rem"}}>Date/Time</th>
                   
                    <th style={{minWidth : "20rem"}}>Before Amount</th>
                    <th style={{minWidth : "20rem"}}>Amount</th>
                    <th style={{minWidth : "20rem"}}>After Amount</th>
                    <th style={{minWidth : "20rem"}}>From</th>
                    <th style={{minWidth : "20rem"}}>To</th>
                    <th style={{minWidth: "20rem"}}>Description</th>
                </tr>
            </thead>
            <tbody>
                 {list}
            </tbody>
        </table>
        </div>

    </div>
  )
}

export default UnitHistoryTransfer