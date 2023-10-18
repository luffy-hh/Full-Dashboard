import React from 'react'
import styles from './ThaiTwoD12am.module.css';
import { selectTwoDReportHead,changeTwoDReportHade } from '../../Feactures/adminTwodSlice';
import { useSelector,useDispatch } from 'react-redux';


function ThaiTwoDHeader() {

    const twoDHead = useSelector(selectTwoDReportHead);
    const dispatch = useDispatch();

    const list = twoDHead.map(d => <li onClick={()=>dispatch(changeTwoDReportHade({id :d.id}))} className={d.active ? styles.twoD_head_active : ""} key={d.id}>
        {d.text}
    </li>)
  return (
    <ul className={styles.twoD_head}>
        {list}
    </ul>
  )
}

export default ThaiTwoDHeader