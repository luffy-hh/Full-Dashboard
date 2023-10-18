import React from 'react'
import styles from './CustomBox.module.css';
import { selectFilterSubGameArr, closeSupGameCat } from '../../Feactures/twoDapiSlice';
import { selectModalSupGameCat, setModalSupGameCat } from '../../Feactures/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch,Modal } from 'antd';


function SubGameCatBox({title}) {

    const dispatch = useDispatch();
    const modalSupGameCat = useSelector(selectModalSupGameCat);
    const filterSubGameArr = useSelector(selectFilterSubGameArr);

    const clickHandle = ()=>{
        dispatch(setModalSupGameCat(false))
    }

    const list = filterSubGameArr && filterSubGameArr.map(d => <div  key={d._id} className={`${styles.sup_game} box_shadow  ${d.status ? styles.color_green : styles.color_red}`}>
    <span>{d.subCatName}</span>
    <Switch onChange={()=> dispatch(closeSupGameCat(d._id))} defaultChecked= {d.status}  />
</div>)
    
  return (
    
        <>
      <Modal
        title={title}
        centered
        open={modalSupGameCat}
        onOk={clickHandle}
        onCancel={() => dispatch(setModalSupGameCat(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.sup_game_cat}>
            {list}
        </div>
      </Modal>
    </>
    
  )
}

export default SubGameCatBox;