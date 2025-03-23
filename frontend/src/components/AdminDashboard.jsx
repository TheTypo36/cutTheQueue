"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Building,
  Users,
  User,
  Search,
  ChevronRight,
  RefreshCw,
  Filter,
  Download,
  Plus,
  Loader2,
  Bell,
  Calendar,
  Activity,
  Sun,
  Moon,
  ChevronDown,
  Home,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NewsSection from "./NewsSection";

const AdminDashboard = ({ isDark, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { admin, adminSignOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    offlineWork: 27,
    onlineConsultations: 9,
    laboratoryWork: 19,
  });

  const [appointments] = useState([
    { time: "2:00 pm", title: "Meeting with chief physician Dr. Williams" },
    { time: "2:30 pm", title: "Consultation with Mr. White" },
    { time: "3:00 pm", title: "Consultation with Mrs. Mary" },
    { time: "3:30 pm", title: "Examination of Mrs. Lara Newman" },
    { time: "4:00 pm", title: "Meeting with administrative staff" },
  ]);

  useEffect(() => {
    // Check if user is authenticated
    if (!admin) {
      navigate("/adminLogin");
      return;
    }
  }, [admin, navigate]);

  const handleSignOut = async () => {
    await adminSignOut();
    navigate("/adminLogin");
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1a1f2d]' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Top Navigation */}
      <div className="bg-[#242a38] p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for events, patients..."
                className="w-96 bg-[#2a3241] border-none rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-[#2a3241] transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Dr. Alisha Nicholls"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-white">Dr. Alisha Nicholls</h3>
                <p className="text-sm text-gray-400">Dermatologist</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-2 bg-[#242a38] rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">M</span>
              </div>
              <span className="font-semibold text-white">MedCare</span>
            </div>
            
            <nav className="space-y-2">
              {[
                { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
                { icon: <Calendar className="w-5 h-5" />, label: "Calendar" },
                { icon: <FileText className="w-5 h-5" />, label: "Documents" },
                { icon: <Settings className="w-5 h-5" />, label: "Settings" },
                { icon: <LogOut className="w-5 h-5" />, label: "Logout", onClick: handleSignOut },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    item.active
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:bg-[#2a3241] transition-colors"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-7 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-[#242a38] rounded-xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-2xl font-semibold mb-2 text-white">Good Day, Dr. Nicholls!</h1>
                <p className="text-gray-400">Have a Nice Monday!</p>
              </div>
              <img
                src="/doctor-illustration.png"
                alt="Doctor"
                className="absolute right-0 top-0 h-full object-contain"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  label: "Offline Work",
                  value: stats.offlineWork,
                  icon: <Activity className="w-6 h-6" />,
                  trend: -15,
                  color: "text-rose-500",
                },
                {
                  label: "Online Consultations",
                  value: stats.onlineConsultations,
                  icon: <Users className="w-6 h-6" />,
                  trend: 20,
                  color: "text-emerald-500",
                },
                {
                  label: "Laboratory Work",
                  value: stats.laboratoryWork,
                  icon: <FileText className="w-6 h-6" />,
                  trend: -8,
                  color: "text-rose-500",
                },
              ].map((stat, index) => (
                <div key={index} className="bg-[#242a38] rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#2a3241] p-3 rounded-lg">
                      {stat.icon}
                    </div>
                    <div className="flex items-center space-x-1">
                      {stat.trend > 0 ? (
                        <TrendingUp className={`w-4 h-4 ${stat.color}`} />
                      ) : (
                        <TrendingDown className={`w-4 h-4 ${stat.color}`} />
                      )}
                      <span className={stat.color}>{Math.abs(stat.trend)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-1 text-white">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tasks Section */}
            <div className="bg-[#242a38] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">My Plans Done</h2>
                <select className="bg-[#2a3241] border-none rounded-lg px-4 py-2 text-gray-400">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Laboratory Analysis", progress: 95 },
                  { label: "Patient Reports", progress: 80 },
                  { label: "Team Meetings", progress: 60 },
                ].map((task, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{task.label}</span>
                      <span className="text-gray-400">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#2a3241] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News Section */}
            <NewsSection />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Calendar */}
            <div className="bg-[#242a38] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">My Calendar</h2>
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-gray-400 py-2">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg ${
                      i + 1 === 13
                        ? "bg-blue-500 text-white"
                        : "hover:bg-[#2a3241] cursor-pointer text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-[#242a38] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Appointments</h2>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-sm text-gray-400 w-16">{appointment.time}</div>
                    <div className="flex-1 text-sm text-white">{appointment.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme={isDark ? 'dark' : 'light'} 
      />
    </div>
  );
};

export default AdminDashboard;
