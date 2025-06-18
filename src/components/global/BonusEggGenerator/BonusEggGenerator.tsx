import React, { useEffect, useState } from 'react';
import eggImg from '../../../assets/img/egg.png';
import './BonusEggGenerator.css'
import { Player } from '../../../context/player-context.tsx';

interface Props {
   tickCounter: React.RefObject<number>,
   player: Player,
   setPlayer: (player: Player) => void,
}

interface Egg {
   tickStart: number,
   tickEnd: number,
   left: number,
   top: number,
   onClick: (event: React.MouseEvent<HTMLImageElement>, egg: Egg, player: Player, setPlayer: (player: Player) => void) => void,
   onTickEnd: () => void,
}

interface EggBonus {
   index: number,
   name: string,
   weight: number,
   onClick: (player: Player, setPlayer: (player: Player) => void) => void,
}

const BonusEggGenerator = (props: Props) => {
   const { tickCounter, player, setPlayer } = props;
   const [egg, setEgg] = useState<Egg>();

   const bonuses: EggBonus[] = [{
      index: 0,
      weight: 1,
      name: "Бонусные яичкинсы!",
      onClick: function (player: Player, setPlayer: (player: Player) => void): void {
         let playerCopy = { ...player };
         playerCopy.score += 500 + playerCopy.baseScorePerSecond * 600;
         playerCopy.stats.totalScore += 500 + playerCopy.baseScorePerSecond * 600;
         playerCopy.stats.bonusEggsGathered += 1;
         playerCopy.stats.maxScore = Math.max(playerCopy.stats.maxScore, playerCopy.score);
         setPlayer(playerCopy);
      }
   }]

   // Функция для генерации случайной задержки от 5 до 10 минут
   const getRandomDelay = () => {
      const min = 5 * 60 * 10; // 5 минут в тиках
      const max = 10 * 60 * 10; // 10 минут в тиках
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   // Функция для генерации нового яйца
   const getNewEgg = (player: Player) => {
      const timeDelimeter = player.upgrades
         .filter(upgrade => upgrade.type === "bonuseggfrequency")
         .reduce((a, v) => a * 2, 1);
      const tickStart = tickCounter.current + (getRandomDelay() / timeDelimeter);
      const tickEnd = tickStart + 600;
      const x = Math.random() * (window.innerWidth - 100); // 100 - ширина яйца
      const y = Math.random() * (window.innerHeight - 100); // 100 - высота яйца
      console.log("Next egg will spawn in {} ticks", tickStart - tickCounter.current);
      setEgg({
         tickStart,
         tickEnd,
         left: x,
         top: y,
         onClick: (e, egg, player, setPlayer) => {
            console.log("Egg clicked!");
            setEgg({ ...egg, tickEnd: tickStart });
            getRandomByWeight(bonuses).onClick(player, setPlayer);
         },
         onTickEnd: () => { console.log("Egg disappeared! New egg generated"); }
      })
   };

   if (egg == undefined) {
      getNewEgg(player);
   }
   if (egg !== undefined && egg.tickEnd <= tickCounter.current) {
      egg.onTickEnd();
      getNewEgg(player);
   }

   return (
      <div>
         {egg?.tickStart !== undefined &&
            egg.tickStart <= tickCounter.current &&
            egg.tickEnd > tickCounter.current &&
            (
               <img
                  src={eggImg} // Замените на реальный URL картинки яйца
                  alt="Яйцо"
                  onClick={(event) => egg.onClick(event, egg, player, setPlayer)}
                  className='bonus-egg-img'
                  style={{
                     left: egg.left,
                     top: egg.top,
                     animationDuration: `${(egg.tickEnd - egg.tickStart) / 9}s`
                  }}
               />
            )}
      </div>
   );
}

function getRandomByWeight(bonuses: EggBonus[]) {
   // Сначала определяем общую сумму весов
   const totalWeight = bonuses.reduce((sum, element) => sum + element.weight, 0);

   // Генерируем случайное число от 0 до общей суммы весов
   const randomNum = Math.random() * totalWeight;

   // Ищем элемент, соответствующий сгенерированному случайному числу
   let cumulativeWeight = 0;

   for (const element of bonuses) {
      cumulativeWeight += element.weight;

      if (randomNum < cumulativeWeight) {
         return element;
      }
   }
   return bonuses[-1];
}

export default BonusEggGenerator;
