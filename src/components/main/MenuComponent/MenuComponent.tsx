import React, { useRef, useState } from 'react';
import { Player } from '../../../context/player-context.tsx';
import ReactDOM from 'react-dom';
import menuPng from '../../../assets/img/menu.png';
import egg from '../../../assets/img/egg.png';
import './MenuComponent.css';
import { formatNumber } from '../../../util/number-formatter.tsx';
import { defaultPlayer } from '../../../context/player-context-entities.tsx';
import Slider from '../../ui/Slider/Slider.tsx';
import ConfirmationPopup from '../../ui/ConfirmationPopup/ConfirmationPopup.tsx';

interface Props {
   player: Player,
   setPlayer: (player: Player) => void,
   visible: boolean,
   setVisible: (visible: boolean) => void,
}

const MenuComponent = (props: Props) => {
   const { player, setPlayer, visible, setVisible } = props;
   const [activeTab, setActiveTab] = useState<number>(0);

   const tabs = [
      { id: 0, label: "Статистика", content: (<MenuStatsComponent player={player} setPlayer={setPlayer} />) },
      { id: 1, label: "Настройки", content: (<MenuSettingsComponent player={player} setPlayer={setPlayer}/>) }
   ]
   if (process.env.REACT_APP_ENV !== undefined && process.env.REACT_APP_ENV == 'development') {
      tabs.push({ id: 9999, label: "Читы", content: (<MenuDeveloperComponent player={player} setPlayer={setPlayer} />) })
   }

   const disableMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
   }

   const closeMenu = () => {
      setVisible(!visible);
   }

   return (
      <div className={`menu-component-container ${visible ? 'open' : 'closed'}`} onClick={disableMenuClick}>
         <div className='menu-component-close' onClick={closeMenu}>
            Закрыть меню
         </div>
         <div className='menu-component-tabs-container'>
            {
               tabs.map(tab => (
                  <div className={`menu-component-tab ${tab.id == activeTab ? 'active' : ''}`}
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}>
                     {tab.label}
                  </div>
               ))
            }
         </div>
         <div className='menu-component-tab-content'>
            {tabs.find(tab => tab.id === activeTab)?.content}
         </div>
      </div>
   );
}

interface MenuStatsProps {
   player: Player,
   setPlayer: (player: Player) => void
}

const MenuStatsComponent = (props: MenuStatsProps) => {
   const { player, setPlayer } = props;

   const calculateTimeElapsed = (): string => {
      const currentTime = new Date();
      const elapsedTime = currentTime.getTime() - player.startedAt.getTime();
      const seconds = Math.floor((elapsedTime / 1000) % 60);
      const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      const days = Math.floor((elapsedTime / (1000 * 60 * 60 * 24)) % 365);
      return (days == 0 ? "" : days + " дней ") +
         (hours == 0 ? "" : hours + " часов ") +
         (minutes == 0 ? "" : minutes + " минут ") +
         (seconds == 0 ? "" : seconds + " секунд");
   }

   return (
      <div className='menu-component-stats-container'>
         <h1>Статистика</h1>
         <div className='menu-component-stats-player'>
            <p>Имя игрока: {player.name}</p>
            <p>Количество яичек: {formatNumber(player.score)}</p>
            <p>Количество яичек за все время: {formatNumber(player.totalScore)}</p>
            <p>Количество яичек за клик: {formatNumber(player.baseClickPower, 1)}</p>
            <p>Количество яичек в секунду: {formatNumber(player.baseScorePerSecond)}</p>
            <p>Максимальное количество яиц за все время: {formatNumber(player.maxScore)}</p>
            <p>Количество зданий: {player.buildings.reduce((a, v) => a + v.amount, 0)}</p>
            <p>Количество улучшений: {player.upgrades.length}</p>
            <p>Время в игре: {(calculateTimeElapsed())}</p>
         </div>
      </div>
   )
}

const MenuDeveloperComponent = (props: MenuStatsProps) => {
   const { player, setPlayer } = props;
   const [confirmOpen, setConfirmOpen] = useState(false);
   const [confirmMessage, setConfirmMessage] = useState("");

   const giveEggs = () => {
      let playerCopy = { ...player };
      playerCopy.score += 10000;
      playerCopy.totalScore += 10000;
      setPlayer(playerCopy);
   }

   const unlockAllBuildings = () => {
      let playerCopy = { ...player };
      playerCopy.maxScore = 10 * Math.pow(10, 99);
      setPlayer(playerCopy);
   }

   const give10minutesEggs = () => {
      let playerCopy = { ...player };
      playerCopy.score += player.baseScorePerSecond * 600;
      playerCopy.totalScore += player.baseScorePerSecond * 600;
      setPlayer(playerCopy);
   }

   const give10hoursEggs = () => {
      let playerCopy = { ...player };
      playerCopy.score += player.baseScorePerSecond * 60 * 60 * 10;
      playerCopy.totalScore += player.baseScorePerSecond * 60 * 60 * 10;
      setPlayer(playerCopy);
   }

   const resetPlayer = () => {
      setPlayer(defaultPlayer);
   }

   const resetPlayerConfirm = () => {
      setConfirmMessage("Вы уверены, что хотите удалить свои данные?");
      setConfirmOpen(true);
   }

   return (
      <div>
         <button onClick={giveEggs}>Дать 10000 яиц</button>
         <button onClick={give10minutesEggs}>Дать 10 минут cps</button>
         <button onClick={give10hoursEggs}>Дать 10 часов cps</button>
         <button onClick={unlockAllBuildings}>Открыть все здания</button>
         <button onClick={resetPlayerConfirm}>Откатить весь прогресс</button>
         <ConfirmationPopup 
            isOpen={confirmOpen}
            onConfirm={resetPlayer}
            onCancel={()=>setConfirmOpen(false)}
            message={confirmMessage}
         />
      </div>
   )
}

const MenuSettingsComponent = (props: MenuStatsProps) => {
   const { player, setPlayer } = props;

   return (
      <div>
         <h1>Настройки</h1>
         <h2>Настройки звука</h2>
         <p>Громкость окружения:</p>
         <EnvSoundSlider player={player} setPlayer={setPlayer}></EnvSoundSlider>
      </div>)
}


interface SoundProps {
   player: Player,
   setPlayer: (player: Player) => void,
}

const EnvSoundSlider = (props: SoundProps) => {
   const { player, setPlayer } = props;
   const [volume, setVolume] = useState(player.settings.surroundingVolume);
   const [isMuted, setIsMuted] = useState(player.settings.surroundingVolumeMuted);

   const setValue = (value: number) => {
      setVolume(value);
      setPlayer({...player, settings: {...player.settings, surroundingVolume: value}});
   };

   const setDisabled = (disabled: boolean) => {
      setIsMuted(disabled);
      setPlayer({...player, settings: {...player.settings, surroundingVolumeMuted: disabled}})
   };

   return (
      <Slider value={volume} setValue={setValue} disabled={isMuted} setDisabled={setDisabled} iconEnabled={egg} iconDisabled={egg}/>
   );
}


interface MenuSelectorProps {
   player: Player,
   setPlayer: (player: Player) => void,
}

const MenuComponentSelector = (props: MenuSelectorProps) => {
   const { player, setPlayer } = props;
   const [visible, setVisible] = useState(false);

   const handleClick = () => {
      setVisible(!visible);
   }

   return (
      <div className="menu-component-selector-container" style={{
         display: visible ? 'none' : 'inline',
         pointerEvents: visible ? 'none' : 'auto'
      }}
         onClick={handleClick}>
         <img src={menuPng} className="menu-component-selector" />
         {ReactDOM.createPortal(
            (<MenuComponent player={player} setPlayer={setPlayer} visible={visible} setVisible={setVisible} />), document.body)
         }
      </div>
   );
}

export default MenuComponentSelector;
