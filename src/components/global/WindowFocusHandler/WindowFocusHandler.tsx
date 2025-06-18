import React, { useEffect, useState } from 'react';
import { Player } from '../../../context/player-context';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
}

interface BlurInfo {
   eggsOnBlur: number,
   totalEggsOnBlur: number,
   wasBluredAt: number,
}

const WindowFocusHandler = (props: Props) => {
   const {player, setPlayer} = props;
   const [blurInfo, setBlurInfo] = useState<BlurInfo>();

   const onFocus = () => {
      if(blurInfo !== undefined){
         let playerCopy = {...player};
         let eggsEarned = ((Date.now() - blurInfo.wasBluredAt) / 1000) * playerCopy.baseScorePerSecond;
         playerCopy.score = blurInfo.eggsOnBlur + eggsEarned;
         playerCopy.stats.totalScore = blurInfo.totalEggsOnBlur + eggsEarned;
         console.log("Player returned to the game, during AFK he earned {}", eggsEarned);
         setPlayer(playerCopy);
      }
   };

   const onBlur = () => {
      const blurState : BlurInfo = {
         eggsOnBlur: player.score,
         totalEggsOnBlur: player.stats.totalScore,
         wasBluredAt: Date.now()
      }
      setBlurInfo(blurState);
   };

   useEffect(() => {
      window.addEventListener("focus", onFocus);
      window.addEventListener("blur", onBlur);
      return () => {
          window.removeEventListener("focus", onFocus);
          window.removeEventListener("blur", onBlur);
      };
   }, [player]);


   return <></>;
}


export default WindowFocusHandler;
