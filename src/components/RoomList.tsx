import React from 'react';
import { Users } from 'lucide-react';
import { rooms } from './BookingEngine';

interface RoomListProps {
  rooms: typeof rooms;
  selectedRoom: string | null;
  onRoomSelect: (roomId: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, selectedRoom, onRoomSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
            selectedRoom === room.id ? 'ring-2 ring-blue-600' : ''
          }`}
          onClick={() => onRoomSelect(room.id)}
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold">{room.name}</h4>
              <div className="text-right">
                <span className="text-2xl font-bold">${room.price}</span>
                <span className="text-sm text-gray-600">/night</span>
              </div>
            </div>
            <p className="text-gray-600">{room.description}</p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users size={18} />
              <span>Up to {room.capacity} guests</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;