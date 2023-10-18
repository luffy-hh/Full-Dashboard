import React from 'react'
import styles from './GameCategories.module.css';
import { useDispatch } from 'react-redux';
import { setModalSupGameCat } from '../../Feactures/modalSlice';
import { setClickSubName,setFilterSupGameArr } from '../../Feactures/twoDapiSlice';
import { Switch } from 'antd'

function GameList({category,activeFun}) {
   
    const dispatch = useDispatch();

    const handleSupCat = (id,catName) =>{

      dispatch(setModalSupGameCat(true))
      dispatch(setClickSubName(catName))
      dispatch(setFilterSupGameArr({id : id}))
    }
    
   const list = category && category.map(d =><li key={d._id} className={`box_shadow ${d.status ? styles.color_green : styles.color_red}`}> 
   <span style={{cursor:'pointer'}} onClick={() => handleSupCat(d._id,d.cat_name)}>{d.cat_name}</span>
   <Switch defaultChecked = {d.status} onChange={()=> dispatch(activeFun(d.cat_name))} />    
    
</li> )
  return (
    <ul className={`${styles.game_cat_container} box_shadow`}>
                {list}
    </ul>
  )
}

export default GameList