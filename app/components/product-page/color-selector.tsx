const ColorSelector = () => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-800">Select colour:</span>
      <div className="flex gap-1 rounded-full bg-neutral-light-gray/80 p-1">
        <div className="h-6 w-6 rounded-full bg-black" />
        <div className="h-6 w-6 rounded-full bg-red-500" />
        <div className="h-6 w-6 rounded-full bg-orange-500" />
        <div className="h-6 w-6 rounded-full bg-gray-500" />
      </div>
    </div>
  );
};

export default ColorSelector;
