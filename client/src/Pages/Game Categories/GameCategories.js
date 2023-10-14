import React from 'react'
import styles from './GameCategories.module.css'


import { selectGameCategorie,closeGameCategories } from '../../Feactures/StaticDataSlice';
import { useSelector } from 'react-redux';
import GameList from './GameList';
function GameCategories() {
    
    const gameCategories = useSelector(selectGameCategorie)

    

  return (
    <div className="page_style">
        <span className={styles.game_title}>Game Categories</span>
        
        {<GameList category={gameCategories} activeFun={closeGameCategories} />}     
    </div>
  )
}

export default GameCategories