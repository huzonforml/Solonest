import { useState } from "react";
import { useCRM } from "@/contexts/CRMContext";
import { getCalendarActivities, CalendarActivity } from "./calendarUtils";
import { ActivityEditModal } from "./ActivityEditModal";

interface CalendarDayProps {
  currentDate: Date;
  activeFilters: {
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  };
}

export const CalendarDay = ({ currentDate, activeFilters }: CalendarDayProps) => {
  const { contracts, invoices, leads } = useCRM();
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const activities = getCalendarActivities(contracts, invoices, leads, activeFilters);

  const dateStr = currentDate.toISOString().split('T')[0];
  const dayActivities = activities.filter(activity => activity.date === dateStr);

  // Generate hourly time slots
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    timeSlots.push(time);
  }

  const getActivitiesForTime = (time: string) => {
    return dayActivities.filter(activity => 
      activity.time && activity.time.includes(time.split(':')[0])
    );
  };

  const getActivitiesWithoutTime = () => {
    return dayActivities.filter(activity => !activity.time);
  };

  const handleActivityClick = (activity: CalendarActivity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="neo-card p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* All-day activities */}
          {getActivitiesWithoutTime().length > 0 && (
            <div className="neo-card p-3">
              <h4 className="text-sm font-medium text-neo-600 mb-2">All Day</h4>
              <div className="space-y-2">
                {getActivitiesWithoutTime().map((activity, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleActivityClick(activity)}
                    className={`text-sm px-3 py-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
                      activity.type === 'contract' ? 'bg-green-100 text-green-800' :
                      activity.type === 'invoice' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    <div className="font-medium">{activity.title}</div>
                    {activity.description && (
                      <div className="text-xs opacity-75 mt-1">{activity.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hourly time slots */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {timeSlots.map((time) => {
              const timeActivities = getActivitiesForTime(time);
              
              return (
                <div key={time} className="flex border-b border-neo-200">
                  <div className="w-16 text-sm text-neo-500 p-2 text-right">
                    {time}
                  </div>
                  <div className="flex-1 p-2 min-h-[50px]">
                    {timeActivities.map((activity, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleActivityClick(activity)}
                        className={`text-sm px-3 py-2 rounded-md mb-1 cursor-pointer hover:opacity-80 transition-opacity ${
                          activity.type === 'contract' ? 'bg-green-100 text-green-800' :
                          activity.type === 'invoice' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        <div className="font-medium">{activity.title}</div>
                        {activity.description && (
                          <div className="text-xs opacity-75 mt-1">{activity.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
