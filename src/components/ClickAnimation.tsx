import React from 'react';
import { ClickAnimationType } from '../utils/types';

type ClickAnimationProps = {
  clicks: ClickAnimationType[];
  pointsToAdd: number;
  handleAnimationEnd: (id: number) => void;
};

const ClickAnimation: React.FC<ClickAnimationProps> = ({
  clicks,
  pointsToAdd,
  handleAnimationEnd,
}) => {
  return (
    <>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  );
};

export default ClickAnimation; 