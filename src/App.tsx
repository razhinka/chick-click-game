import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MainPage from './components/main/MainPage/MainPage.tsx';
import { defaultPlayer } from './context/player-context-entities.tsx';
import { Player } from './context/player-context.tsx';
import WelcomePage from './components/global/WelcomePage/WelcomePage.tsx';

function App() {
  const [player, setPlayer] = useState<Player>(defaultPlayer);
  const playerRef = useRef(player);
  let ysdk: any;
  let ysdkplayer: any;

  const setName = (name: string) => {
    setPlayer({...player, name});
  }

  const initPlayerAndSdk = () => {
    let playerStored = localStorage.getItem("player");
    let storedPlayer: Player | undefined = undefined;
    if (playerStored !== null && playerStored !== '' && playerStored !== "{}") {
      let data = JSON.parse(playerStored);
      if (Object.keys(data).length > 0) {
        storedPlayer = convertDataToPlayer(data);
        playerRef.current = storedPlayer;
        setPlayer(storedPlayer);
      }
    }

    if (typeof window.YaGames !== 'undefined') {
      window.YaGames.init()
        .then((_ysdk) => {
          ysdk = _ysdk;
          console.log("YSDK is here!")

          ysdk.getPlayer().then(_player => {
            ysdkplayer = _player;
            _player.getData(["player"])
              .then(data => {
                if (data !== null && data !== undefined && Object.keys(data).length > 0) {
                  console.log("Loading data about player from yandex cloud", { data });
                  let cloudPlayer = convertDataToPlayer(data["player"]);
                  if (cloudPlayer.endedAt > playerRef.current.endedAt) {
                    console.log("Found newer data in cloud, updating stats");
                    storedPlayer = cloudPlayer;
                    setPlayer(cloudPlayer);
                  } else {
                    console.log("Current local storage contains newer data, ignoring cloud result");
                  }
                }
              });
          });
        })
        .catch((error) => {
          console.error('Ошибка инициализации Yandex SDK:', error);
        });
    } else {
      console.log('YaGames не доступен');
    }

    if (storedPlayer == undefined) {
      console.log("Current player doesn't have any save. Initializing new player");
      setPlayer(defaultPlayer);
    } else{
      let playerCopy = {...storedPlayer};
      let eggsEarned = ((Date.now() - playerCopy.endedAt.getTime()) / 1000) * playerCopy.baseScorePerSecond;
      playerCopy.score = playerCopy.score + eggsEarned;
      playerCopy.totalScore = playerCopy.totalScore + eggsEarned;
      console.log("Player returned to the game, during AFK he earned {}", eggsEarned);
      setPlayer(playerCopy);
      
    }
    window.addEventListener('beforeunload', () => {
      console.log("Saving player data before leaving");
      if(playerRef.current){
        playerRef.current.endedAt = new Date();
        localStorage.setItem("player", JSON.stringify(playerRef.current));
        if (ysdkplayer) {
          ysdkplayer.setData({
            player: playerRef.current
          });
        }
      }
    })
  };

  useEffect(() => {
    playerRef.current = player;
  }, [player])

  useEffect(() => {
    // Загрузка Yandex SDK
    const scriptElement = document.createElement('script');
    const script = document.getElementsByTagName('script')[0];
    if (process.env.REACT_APP_YANDEX_SDK_LINK === undefined) {
      console.error("Failed to initialize sdk, sdk link is undefined");
      return;
    }
    scriptElement.src = process.env.REACT_APP_YANDEX_SDK_LINK; // Укажите правильный путь к SDK
    scriptElement.async = true;
    script.parentNode?.insertBefore(scriptElement, script);

    scriptElement.onload = initPlayerAndSdk; // Инициализация SDK после загрузки скрипта
    scriptElement.onerror = (e) => {
      console.error("Ошибка при загрузке", e)
    }

    // Очистка при размонтировании компонента
    return () => {
      script.parentNode?.removeChild(scriptElement);
    };
  }, []);

  return (
    <div>
      {player.name === "" ? (<WelcomePage setName={setName}/>) : (
        <MainPage player={player} setPlayer={setPlayer} />)
      }
    </div>
  );
}

function convertDataToPlayer(data: Object): Player {
  return {
    name: data["name"] || defaultPlayer.name,
    score: data["score"] || defaultPlayer.score,
    totalScore: data["totalScore"] || defaultPlayer.totalScore,
    maxScore: data["maxScore"] || defaultPlayer.maxScore,
    baseClickPower: data["baseClickPower"] || defaultPlayer.baseClickPower,
    baseScorePerSecond: data["baseScorePerSecond"] || defaultPlayer.baseScorePerSecond,
    buildings: data["buildings"] || defaultPlayer.buildings,
    upgrades: data["upgrades"] || defaultPlayer.upgrades,
    gameTick: data["gameTick"] || defaultPlayer.gameTick,
    startedAt: new Date(data["startedAt"]) || defaultPlayer.startedAt,
    endedAt: new Date(data["endedAt"]) || defaultPlayer.endedAt,
    bonusEggsGathered: data["bonusEggsGathered"] || defaultPlayer.bonusEggsGathered,
    settings: data["settings"] || defaultPlayer.settings
  }
}

export default App;
