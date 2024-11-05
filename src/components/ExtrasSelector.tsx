import React from 'react';
import { Coffee, Car, Utensils, Waves } from 'lucide-react';

interface Extra {
  id: string;
  icon: React.ElementType;
  label: string;
  price: number;
}

const extras: Extra[] = [
  { id: 'breakfast', icon: Coffee, label: 'Breakfast', price: 25 },
  { id: 'parking', icon: Car, label: 'Parking', price: 15 },
  { id: 'dinner', icon: Utensils, label: 'Dinner', price: 45 },
  { id: 'pool', icon: Waves, label: 'Pool Access', price: 35 },
];

interface ExtrasSelectorProps {
  extras: Set<string>;
  onExtraToggle: (extras: Set<string>) => void;
}

const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({ extras: selectedExtras, onExtraToggle }) => {
  const handleExtraToggle = (extraId: string) => {
    const newExtras = new Set(selectedExtras);
    if (newExtras.has(extraId)) {
      newExtras.delete(extraId);
    } else {
      newExtras.add(extraId);
    }
    onExtraToggle(newExtras);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {extras.map(({ id, icon: Icon, label, price }) => (
        <div
          key={id}
          onClick={() => handleExtraToggle(id)}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedExtras.has(id) ? 'border-blue-600 bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon className={selectedExtras.has(id) ? 'text-blue-600' : 'text-gray-600'} />
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-sm text-gray-600">${price}/day</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExtrasSelector;