import React from 'react';
import styles from '../Game Categories/GameCategories.module.css'
import GameList from '../Game Categories/GameList'
import { selectSupGameCategorie,closeSupGameCategories } from '../../Feactures/StaticDataSlice';
import { useSelector } from 'react-redux';

function SupGameCategory() {
  const supGameCategory = useSelector(selectSupGameCategorie);

  return (
    <div className='page_style'>
        <span className={styles.game_title}>Sup Game Categories</span>
        {<GameList category={supGameCategory} activeFun={closeSupGameCategories} />}
    </div>
  )
}

export default SupGameCategory