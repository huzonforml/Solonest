
import { Calendar } from "lucide-react";

const appointments = [
  {
    id: 1,
    client: "John Smith",
    date: "2024-06-17",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Consultation"
  },
  {
    id: 2,
    client: "Sarah Johnson",
    date: "2024-06-17",
    time: "2:00 PM",
    status: "Pending",
    type: "Follow-up"
  },
  {
    id: 3,
    client: "Mike Davis",
    date: "2024-06-18",
    time: "11:30 AM",
    status: "Confirmed",
    type: "Consultation"
  }
];

const Appointments = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <Calendar className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Appointments</h2>
          <p className="text-neo-500">Manage your scheduled meetings</p>
        </div>
      </div>

      <div className="neo-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neo-700">Upcoming Appointments</h3>
          <button className="neo-button px-6 py-2 text-neo-700 font-medium">
            New Appointment
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="neo-card p-4 hover:shadow-neo-outset transition-all duration-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-neo-700 mb-1">{appointment.client}</h4>
                  <p className="text-neo-500 text-sm">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-neo-700">{appointment.date}</p>
                  <p className="text-neo-500 text-sm">{appointment.time}</p>
                </div>
                <div className="ml-4">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
