// import React, { useState } from "react";
// import Container from "../../../Component/Container";
// import NormalButton from "../../../Component/Button";
// import { useSelector } from "react-redux";

// import { reportBool } from "../../../Feactures/ShowHideSlice";
// import styles from "./TwoDPage.module.css";
// import UnitNoandReport from "./UnitNoandReport";
// import ReportInterface from "./ReportInterface";

// const btnData = [
//   { title: "2D", btnName: "Morning" },
//   { title: "2D", btnName: "Evening" },
// ];

// function TwoDPage() {
//   const [btnTitle, setBtnTitle] = useState("Morning");
//   // const [showReport, setShowReport] = useState(true);
//   const showReport = useSelector(reportBool);

//   return (
//     <div className={styles.two_d_page}>
//       {showReport ? (
//         <Container className={styles.two_d_container}>
//           <div className={styles.btn_container}>
//             {btnData.map((d) => (
//               <NormalButton
//                 key={d.btnName}
//                 className={styles.btn_2d}
//                 onClick={() => setBtnTitle(d.btnName)}
//               >
//                 <span>{d.title}</span>
//                 <span className={styles.btn_dname}>{d.btnName}</span>
//               </NormalButton>
//             ))}
//           </div>
//           {btnTitle === "Morning" ? (
//             <UnitNoandReport title="Morning"  />
//           ) : (
//             <UnitNoandReport title="Evening"  />
//           )}
//         </Container>
//       ) : (
//         <ReportInterface  />
//       )}
//     </div>
//   );
// }

// export default TwoDPage;

import React from "react";
import Container from "../../../Component/Container";
import OneClose from "./OneClosecomponent/OneClose";
import { selectTwoDHead } from "../../../Feactures/adminTwodSlice";
import { useSelector } from "react-redux";
import TwoDHead from "./TwoDHead";
import styles from "./TwoDPage.module.css";
import FirstTopNo from "./FistTopSection/FirstTopNo";
import OpenandCloseTime from "./TimePicker/OpenandCloseTime";
import GivetwoDZa from "./GivetwoDZa/GivetwoDZa";
function TwoDPage() {
  const twoDHead = useSelector(selectTwoDHead);
  return (
    <Container className={styles.two_d_page}>
      <div className={styles.two_d_container}>
        <h3>နစ်လုံးထီအပြင်အဆင်</h3>
        <TwoDHead />

        {twoDHead[0].active && <FirstTopNo />}
        {twoDHead[1].active && <OneClose />}
        {twoDHead[2].active && <OpenandCloseTime />}
        {twoDHead[3].active && <GivetwoDZa />}
      </div>
    </Container>
  );
}

export default TwoDPage;
