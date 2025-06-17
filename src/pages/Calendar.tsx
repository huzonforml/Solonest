
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarMonth } from "../components/calendar/CalendarMonth";
import { CalendarWeek } from "../components/calendar/CalendarWeek";
import { CalendarDay } from "../components/calendar/CalendarDay";
import { ActivityFilters } from "../components/calendar/ActivityFilters";

type CalendarView = 'month' | 'week' | 'day';

const Calendar = () => {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState({
    appointments: true,
    contracts: true,
    invoices: true,
    leads: true,
  });

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (currentView) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (currentView) {
      case 'month':
        options.year = 'numeric';
        options.month = 'long';
        break;
      case 'week':
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
        break;
      case 'day':
        options.weekday = 'long';
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        break;
    }
    
    return currentDate.toLocaleDateString('en-US', options);
  };

  const renderCalendarView = () => {
    switch (currentView) {
      case 'month':
        return <CalendarMonth currentDate={currentDate} activeFilters={activeFilters} />;
      case 'week':
        return <CalendarWeek currentDate={currentDate} activeFilters={activeFilters} />;
      case 'day':
        return <CalendarDay currentDate={currentDate} activeFilters={activeFilters} />;
      default:
        return <CalendarMonth currentDate={currentDate} activeFilters={activeFilters} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <CalendarDays className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-600">Calendar</h2>
          <p className="text-neo-500">View all your CRM activities in one place</p>
        </div>
      </div>

      <div className="neo-card p-6">
        {/* Calendar Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="neo-button"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('next')}
                className="neo-button"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="neo-button"
              >
                Today
              </Button>
            </div>
            <h3 className="text-xl font-semibold text-neo-600">{formatDateHeader()}</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex neo-card p-1">
              {(['month', 'week', 'day'] as CalendarView[]).map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(view)}
                  className={currentView === view ? "neo-card-pressed" : ""}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Filters */}
        <ActivityFilters 
          activeFilters={activeFilters} 
          onFiltersChange={setActiveFilters} 
        />

        {/* Calendar View */}
        <div className="mt-6">
          {renderCalendarView()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
