import React from "react";
import "./App.css";
import { binanceLogo, dailyReward, dailyCipher, dailyCombo, hamsterCoin } from "./images";
import Mine from "./icons/Mine";
import Friends from "./icons/Friends";
import Coins from "./icons/Coins";
import Header from "./components/Header";
import DailyEvents from "./components/DailyEvents";
import MainCharacter from "./components/MainCharacter";
import BottomMenu from "./components/BottomMenu";
import ClickAnimation from "./components/ClickAnimation";
import usePoints from "./hooks/usePoints";
import useLevels from "./hooks/useLevels";
import useTimeCountdown from "./hooks/useTimeCountdown";
import { BottomMenuItemType, DailyEventType } from "./utils/types";

function App() {
  const profitPerHour = 126420;
  const pointsToAdd = 11;
  const initialPoints = 36749365;
  const initialLevelIndex = 6; // Legendary level

  // Используем хуки
  const { points, clicks, handleCardClick, handleAnimationEnd } = usePoints({
    initialPoints,
    profitPerHour,
    pointsToAdd,
  });

  const { levelIndex, levels, calculateProgress } = useLevels({
    initialLevelIndex,
    points,
  });

  // Время для ежедневных событий
  const dailyRewardTimeLeft = useTimeCountdown(0); // 00:00 UTC
  const dailyCipherTimeLeft = useTimeCountdown(19); // 19:00 UTC 
  const dailyComboTimeLeft = useTimeCountdown(12); // 12:00 UTC

  // Данные для ежедневных событий
  const dailyEvents: DailyEventType[] = [
    {
      title: "Daily reward",
      imageSrc: dailyReward,
      timeLeft: dailyRewardTimeLeft,
    },
    {
      title: "Daily cipher",
      imageSrc: dailyCipher,
      timeLeft: dailyCipherTimeLeft,
    },
    {
      title: "Daily combo",
      imageSrc: dailyCombo,
      timeLeft: dailyComboTimeLeft,
    },
  ];

  // Элементы нижнего меню
  const menuItems: BottomMenuItemType[] = [
    {
      icon: binanceLogo,
      title: "Exchange",
      isActive: true,
      bgColor: "#1c1f24",
    },
    {
      icon: <Mine className="w-8 h-8 mx-auto" />,
      title: "Mine",
    },
    {
      icon: <Friends className="w-8 h-8 mx-auto" />,
      title: "Friends",
    },
    {
      icon: <Coins className="w-8 h-8 mx-auto" />,
      title: "Earn",
    },
    {
      icon: hamsterCoin,
      title: "Airdrop",
    },
  ];

  return (
    <>
      <div className="bg-black flex justify-center">
        <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
          <Header
            levelNames={levels}
            levelIndex={levelIndex}
            points={points}
            profitPerHour={profitPerHour}
            calculateProgress={calculateProgress}
          />
          <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
            <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
              <DailyEvents events={dailyEvents} />
              <MainCharacter points={points} handleCardClick={handleCardClick} />
              <BottomMenu menuItems={menuItems} />
            </div>
          </div>
        </div>

        <ClickAnimation
          clicks={clicks}
          pointsToAdd={pointsToAdd}
          handleAnimationEnd={handleAnimationEnd}
        />
      </div>
    </>
  );
}

export default App;
