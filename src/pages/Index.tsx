
import { Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neo-600 mb-2">Welcome to solonest</h2>
        <p className="text-neo-500">Manage your business relationships efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link to="/leads" className="neo-card border border-gray-300 p-6 hover:shadow-neo-outset transition-all duration-200 group">
          <div className="flex items-center gap-4 mb-4">
            <div className="neo-card p-3 group-hover:shadow-neo-pressed transition-all duration-200">
              <Users className="w-8 h-8 text-neo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neo-800">Leads</h3>
              <p className="text-neo-600">Track prospects</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neo-700">12</p>
            <p className="text-neo-600 text-sm">Active</p>
          </div>
        </Link>

        <Link to="/contracts" className="neo-card p-6 hover:shadow-neo-outset transition-all duration-200 group">
          <div className="flex items-center gap-4 mb-4">
            <div className="neo-card p-3 group-hover:shadow-neo-pressed transition-all duration-200">
              <FileText className="w-8 h-8 text-neo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neo-800">Contracts</h3>
              <p className="text-neo-600">Manage agreements</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neo-700">8</p>
            <p className="text-neo-600 text-sm">Total</p>
          </div>
        </Link>
      </div>

      <div className="neo-card p-6">
        <h3 className="text-xl font-semibold text-neo-600">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 neo-card">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-neo-700">New appointment scheduled with John Smith</p>
            <span className="text-neo-600 text-sm ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 neo-card">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-neo-700">Lead Alice Cooper marked as hot</p>
            <span className="text-neo-600 text-sm ml-auto">15 min ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 neo-card">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-neo-700">Contract with TechCorp activated</p>
            <span className="text-neo-600 text-sm ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
