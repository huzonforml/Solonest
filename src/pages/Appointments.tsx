
import { Calendar } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import AddAppointmentForm from "../components/AddAppointmentForm";

const Appointments = () => {
  const { appointments, leads, addAppointment } = useCRM();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="neo-card p-3">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neo-600">Appointments</h2>
          <p className="text-sm sm:text-base text-neo-500">Manage your scheduled meetings</p>
        </div>
      </div>

      <div className="neo-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-neo-600">Upcoming Appointments</h3>
          <AddAppointmentForm leads={leads} onAddAppointment={addAppointment} />
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="neo-card p-4 hover:shadow-neo-outset transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-neo-500 mb-1">{appointment.client}</h4>
                  <p className="text-neo-400 text-sm">{appointment.type}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="text-left sm:text-right">
                    <p className="font-medium text-neo-500">{appointment.date}</p>
                    <p className="text-neo-400 text-sm">{appointment.time}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
