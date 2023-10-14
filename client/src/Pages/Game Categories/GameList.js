import React from 'react'
import styles from './GameCategories.module.css';
import { useDispatch } from 'react-redux';
import { Switch } from 'antd'

function GameList({category,activeFun}) {
   
    const dispatch = useDispatch();
    
   const list =category.map(d =><li key={d.id} className={`box_shadow ${d.active ? styles.color_green : styles.color_red}`}> 
   <span>{d.text}</span>
   <Switch defaultChecked = {d.active} onChange={()=> dispatch(activeFun(d.id))} />    
    
</li> )
  return (
    <ul className={`${styles.game_cat_container} box_shadow`}>
                {list}
    </ul>
  )
}

export default GameList