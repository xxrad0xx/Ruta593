import React from 'react';
import DriverSeat from '../images/icon/DriverSeat.svg';
import Door from '../images/icon/Door.svg';

interface BusTemplateProps {
  children: React.ReactNode;
  floorNumber: number;
  horizontal?: boolean;
}

const BusTemplate: React.FC<BusTemplateProps> = ({ children, floorNumber, horizontal }) => {
  return (
    <div
      className={`relative bg-white overflow-hidden mx-auto rounded-2xl border border-gray-300 shadow-lg ${
        horizontal ? 'w-[600px] h-[300px] flex' : 'w-full h-full max-w-xs flex-col'
      }`}
    >
      {/* Cabecera del bus */}
      {floorNumber === 1 && (
        <div
          className={`${
            horizontal
              ? 'w-[60px] h-full flex flex-col justify-between items-center bg-gray-100 p-2 border-l border-gray-300'
              : 'w-full flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100'
          }`}
        >
          {/* PUERTA ARRIBA */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={Door} alt="Door side" className="h-12 w-12 rotate-90" />
          </div>

          {/* CONDUCTOR ABAJO con rotación */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={DriverSeat} alt="Driver Seat Icon" className="h-12 -rotate-90" />
          </div>
        </div>
      )}

      {/* Área de asientos */}
      <div className={`${horizontal ? 'flex-1 p-4 relative' : 'p-4 relative'}`}>
        {children}
      </div>
    </div>
  );
};

export default BusTemplate;
