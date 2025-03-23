import React from 'react';
import { BottomMenuItemType } from '../utils/types';

type BottomMenuProps = {
  menuItems: BottomMenuItemType[];
};

const BottomMenu: React.FC<BottomMenuProps> = ({ menuItems }) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`text-center text-[#85827d] w-1/5 ${
            item.isActive ? 'bg-[#1c1f24]' : ''
          } ${item.isActive ? 'm-1 p-2 rounded-2xl' : ''}`}
        >
          {typeof item.icon === 'string' ? (
            <img
              src={item.icon as string}
              alt={item.title}
              className="w-8 h-8 mx-auto"
            />
          ) : (
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              {item.icon}
            </div>
          )}
          <p className="mt-1">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomMenu; 