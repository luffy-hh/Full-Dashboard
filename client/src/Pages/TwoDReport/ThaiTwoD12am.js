import React from 'react'
import styles from './ThaiTwoD12am.module.css';
import ThaiTwoDHeader from './ThaiTwoDHeader';
import { selectTable1Data,selecttable1ExpData,showTable1,showTable3,showTable2} from '../../Feactures/adminTwodSlice';

import { useSelector } from 'react-redux';
import ThaiTwoDTable from './ThaiTwoDTable';
import ThaiTable3 from './ThaiTable3';
import ThaiTwoDTable2 from './ThaiTwoDTable2';

function ThaiTwoD12am() {

    const table1Data = useSelector(selectTable1Data);
    const tableexpData = useSelector(selecttable1ExpData);
    const table1 = useSelector(showTable1);
    const table3 = useSelector(showTable3);
    const table2 = useSelector(showTable2);
    
  return (
    <div className="page_style">
        <div className={`box_shadow ${styles.two_d_head_container}`}>
            <ThaiTwoDHeader />
           {table1 && <ThaiTwoDTable tableData = {table1Data} tableExpData = {tableexpData} />}
           {table2 && <ThaiTwoDTable2 />}
           {table3 && <ThaiTable3 />}
        </div>
       
    </div>
  )
}

export default ThaiTwoD12am