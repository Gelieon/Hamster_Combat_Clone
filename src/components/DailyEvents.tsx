import React from 'react';
import { DailyEventType } from '../utils/types';

type DailyEventsProps = {
  events: DailyEventType[];
};

const DailyEvents: React.FC<DailyEventsProps> = ({ events }) => {
  return (
    <div className="px-4 mt-6 flex justify-between gap-2">
      {events.map((event, index) => (
        <div key={index} className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
          <div className="dot"></div>
          <img
            src={event.imageSrc}
            alt={event.title}
            className="mx-auto w-12 h-12"
          />
          <p className="text-[10px] text-center text-white mt-1">
            {event.title}
          </p>
          <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
            {event.timeLeft}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DailyEvents; 