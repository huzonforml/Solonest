
import { useCRM } from "@/contexts/CRMContext";
import { getCalendarActivities } from "./calendarUtils";

interface CalendarMonthProps {
  currentDate: Date;
  activeFilters: {
    appointments: boolean;
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  };
}

export const CalendarMonth = ({ currentDate, activeFilters }: CalendarMonthProps) => {
  const { appointments, contracts, invoices, leads } = useCRM();
  
  const activities = getCalendarActivities(appointments, contracts, invoices, leads, activeFilters);

  // Get the first day of the month and the last day
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Get the starting date for the calendar grid (include previous month days)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // Generate 42 days (6 weeks) for the calendar grid
  const calendarDays = [];
  const currentDay = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getActivitiesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return activities.filter(activity => activity.date === dateStr);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="neo-card p-4">
      {/* Week headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-neo-500 p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => {
          const dayActivities = getActivitiesForDate(date);
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-neo-300 rounded-md ${
                isCurrentMonth(date) ? 'bg-neo-100' : 'bg-neo-50'
              } ${isToday(date) ? 'ring-2 ring-neo-600' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentMonth(date) ? 'text-neo-500' : 'text-neo-400'
              } ${isToday(date) ? 'text-neo-600 font-bold' : ''}`}>
                {date.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayActivities.slice(0, 3).map((activity, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-2 py-1 rounded truncate ${
                      activity.type === 'appointment' ? 'bg-blue-100 text-blue-800' :
                      activity.type === 'contract' ? 'bg-green-100 text-green-800' :
                      activity.type === 'invoice' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                    title={activity.title}
                  >
                    {activity.title}
                  </div>
                ))}
                {dayActivities.length > 3 && (
                  <div className="text-xs text-neo-400">
                    +{dayActivities.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
