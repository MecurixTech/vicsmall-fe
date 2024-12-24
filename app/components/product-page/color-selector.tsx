import { FC } from "react";

interface ColorSelectorProps {
  onColorSelect: (color: 'black' | 'red' | 'orange' | 'gray') => void;
}

const ColorSelector: FC<ColorSelectorProps> = ({ onColorSelect }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-800">Select colour:</span>
      <div className="flex gap-1 rounded-full bg-neutral-light-gray/80 p-1">
      
        <button
          onClick={() => onColorSelect("black")}
          aria-label="Select black color"
          className="h-6 w-6 rounded-full bg-black transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12 hover:shadow-md"
        />

        
        <button
          onClick={() => onColorSelect("red")}
          aria-label="Select red color"
          className="h-6 w-6 rounded-full bg-red-500 transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12 hover:shadow-md"
        />

   
        <button
          onClick={() => onColorSelect("orange")}
          aria-label="Select orange color"
          className="h-6 w-6 rounded-full bg-orange-500 transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12 hover:shadow-md"
        />

        
        <button
          onClick={() => onColorSelect("gray")}
          aria-label="Select gray color"
          className="h-6 w-6 rounded-full bg-gray-500 transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-12 hover:shadow-md"
        />
      </div>
    </div>
  );
};

export default ColorSelector;
