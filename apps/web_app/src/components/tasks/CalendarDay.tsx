import React from "react";

const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM

export const CalendarDay: React.FC = () => {
  return (
    <div className="bg-white text-black rounded-xl overflow-hidden shadow-md border border-gray-200 w-full">
      <div className="p-4 border-b border-gray-200">
        <div className="text-xs uppercase text-gray-500">Mon</div>
        <div className="text-4xl font-bold">2</div>
        <div className="text-xs text-gray-500 mt-1">GMT-04</div>
      </div>

      <div className="h-[calc(100vh-120px)] overflow-y-auto">
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-t border-gray-200 h-16 px-4 flex items-start"
          >
            <div className="text-sm text-gray-500 w-14 shrink-0">
              {formatHour(hour)}
            </div>
            <div className="flex-1 border-l border-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour > 12 ? hour - 12 : hour;
  return `${normalized} ${suffix}`;
}
