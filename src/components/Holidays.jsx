import { Calendar } from 'lucide-react';

export default function Holidays() {
  const holidays = [
    { name: "Raksha Bandhan", date: "3 August, 2025", day: "Saturday" },
    { name: "Independence Day", date: "15 August, 2025", day: "Friday" },
    { name: "Parsi New Year", date: "16 August, 2025", day: "Saturday" },
    { name: "Janmashtami", date: "28 August, 2025", day: "Thursday" },
  ];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
          Holidays
        </h2>
      </div>
      
      <div className="space-y-3 max-h-64 lg:max-h-80 overflow-y-auto">
        {holidays.map((holiday, index) => (
          <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r-lg hover:bg-blue-100 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div>
                <p className="font-semibold text-gray-800 text-sm lg:text-base">
                  {holiday.name}
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  {holiday.date}
                </p>
              </div>
              <span className="text-xs lg:text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full self-start sm:self-center">
                {holiday.day}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
