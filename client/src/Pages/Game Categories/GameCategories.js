import React, { useEffect } from 'react'
import styles from './GameCategories.module.css'
import { selectlogInData } from '../../Feactures/apiSlice';
import { selectGameCat, selectGameCatStatus, fetGetGameCat,closeGameCat ,fetGetSubGameCat, selectClickSubName} from '../../Feactures/twoDapiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import GameList from './GameList';
import SubGameCatBox from '../../Component/CustomBox/SubGameCatBox'
function GameCategories() {
    
    const gameCat = useSelector(selectGameCat);
    const getGameCatStatus = useSelector(selectGameCatStatus);
    
    const clickSubName = useSelector(selectClickSubName);

    const logInData = useSelector(selectlogInData);
    const accessToken = logInData.token;
    const dispatch = useDispatch();

    useEffect(()=>{
         dispatch(fetGetGameCat({api: "gamecat", accessToken}))
         dispatch(fetGetSubGameCat({api : "gamesubcat", accessToken}))
    },[])
    
   const gameCatArr = getGameCatStatus === "succeeded" && gameCat.data.allGameCategory;
  


    

  return (
    <>
     {<SubGameCatBox title={clickSubName}  />}
    <div className="page_style">
        <span className={styles.game_title}>Game Categories</span>
        
        {<GameList category={gameCatArr} activeFun={closeGameCat}  />}     
    </div>

    </>
  )
}

export default GameCategories