import { useState } from "react";
import { useCRM } from "@/contexts/CRMContext";
import { getCalendarActivities, CalendarActivity } from "./calendarUtils";
import { ActivityEditModal } from "./ActivityEditModal";

interface CalendarWeekProps {
  currentDate: Date;
  activeFilters: {
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  };
}

export const CalendarWeek = ({ currentDate, activeFilters }: CalendarWeekProps) => {
  const { contracts, invoices, leads } = useCRM();
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const activities = getCalendarActivities(contracts, invoices, leads, activeFilters);

  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  // Generate 7 days for the week
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getActivitiesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return activities.filter(activity => activity.date === dateStr);
  };

  const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleActivityClick = (activity: CalendarActivity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="neo-card p-4">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((date, index) => {
            const dayActivities = getActivitiesForDate(date);
            
            return (
              <div
                key={index}
                className={`min-h-[400px] p-3 border border-neo-300 rounded-md bg-neo-100 ${
                  isToday(date) ? 'ring-2 ring-neo-600' : ''
                }`}
              >
                <div className="text-center mb-3">
                  <div className="text-sm text-neo-500 font-medium">
                    {weekDayNames[index].slice(0, 3)}
                  </div>
                  <div className={`text-lg font-bold ${
                    isToday(date) ? 'text-neo-600' : 'text-neo-500'
                  }`}>
                    {date.getDate()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {dayActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleActivityClick(activity)}
                      className={`text-xs px-2 py-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
                        activity.type === 'contract' ? 'bg-green-100 text-green-800' :
                        activity.type === 'invoice' ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}
                    >
                      <div className="font-medium truncate">{activity.title}</div>
                      {activity.time && (
                        <div className="text-xs opacity-75">{activity.time}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ActivityEditModal 
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
