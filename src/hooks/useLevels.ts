import { useState, useEffect } from 'react';
import { LevelType } from '../utils/types';

const defaultLevels: LevelType[] = [
  { name: 'Bronze', minPoints: 0 }, // From 0 to 4999 coins
  { name: 'Silver', minPoints: 5000 }, // From 5000 coins to 24,999 coins
  { name: 'Gold', minPoints: 25000 }, // From 25,000 coins to 99,999 coins
  { name: 'Platinum', minPoints: 100000 }, // From 100,000 coins to 999,999 coins
  { name: 'Diamond', minPoints: 1000000 }, // From 1,000,000 coins to 2,000,000 coins
  { name: 'Epic', minPoints: 2000000 }, // From 2,000,000 coins to 10,000,000 coins
  { name: 'Legendary', minPoints: 10000000 }, // From 10,000,000 coins to 50,000,000 coins
  { name: 'Master', minPoints: 50000000 }, // From 50,000,000 coins to 100,000,000 coins
  { name: 'GrandMaster', minPoints: 100000000 }, // From 100,000,000 coins to 1,000,000,000 coins
  { name: 'Lord', minPoints: 1000000000 }, // From 1,000,000,000 coins to ∞
];

type UseLevelsOptions = {
  initialLevelIndex: number;
  points: number;
  customLevels?: LevelType[];
};

export const useLevels = ({
  initialLevelIndex,
  points,
  customLevels = defaultLevels,
}: UseLevelsOptions) => {
  const [levelIndex, setLevelIndex] = useState(initialLevelIndex);
  const levels = customLevels;

  useEffect(() => {
    const currentLevelMin = levels[levelIndex].minPoints;
    const nextLevelMin = levelIndex < levels.length - 1 ? levels[levelIndex + 1].minPoints : Infinity;
    
    if (points >= nextLevelMin && levelIndex < levels.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levels]);

  const calculateProgress = () => {
    if (levelIndex >= levels.length - 1) {
      return 100;
    }
    const currentLevelMin = levels[levelIndex].minPoints;
    const nextLevelMin = levels[levelIndex + 1].minPoints;
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  return {
    levelIndex,
    levels,
    calculateProgress,
  };
};

export default useLevels; 