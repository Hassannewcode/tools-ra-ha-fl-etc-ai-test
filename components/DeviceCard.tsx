
import React from 'react';
import type { Device } from '../types';

interface DeviceCardProps {
  device: Device;
  onClick: (device: Device) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  const { name, description, Icon } = device;

  return (
    <div
      onClick={() => onClick(device)}
      className="bg-gray-800 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer
                 border-2 border-gray-700 hover:border-cyan-400 transition-all duration-300
                 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
    >
      <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
        <Icon className="h-16 w-16" />
      </div>
      <h3 className="font-bold text-lg text-gray-100 mb-2">{name}</h3>
      <p className="text-gray-400 text-sm flex-grow">{description}</p>
    </div>
  );
};

export default DeviceCard;
