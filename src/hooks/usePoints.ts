import { useState, useEffect } from 'react';
import { ClickAnimationType } from '../utils/types';

type UsePointsOptions = {
  initialPoints: number;
  profitPerHour: number;
  pointsToAdd: number;
};

export const usePoints = ({ initialPoints, profitPerHour, pointsToAdd }: UsePointsOptions) => {
  const [points, setPoints] = useState(initialPoints);
  const [clicks, setClicks] = useState<ClickAnimationType[]>([]);

  // Автоматическое увеличение очков в зависимости от profitPerHour
  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return {
    points,
    setPoints,
    clicks,
    handleCardClick,
    handleAnimationEnd,
  };
};

export default usePoints; 