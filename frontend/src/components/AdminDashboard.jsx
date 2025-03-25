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
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "MAHAVEER",
    allDepartments: [
      {
        name: "Cardiology",
        allDoctors: [
          {
            name: "Dr. Ambhuj",
            allPatients: [
              {
                id: 1,
                name: "John Smith",
                age: 45,
                tokenNo: "C-101",
                status: "Waiting",
              },
              {
                id: 2,
                name: "Maria Garcia",
                age: 62,
                tokenNo: "C-102",
                status: "In Progress",
              },
            ],
          },
          {
            name: "Dr. Sharma",
            allPatients: [
              {
                id: 3,
                name: "Robert Chen",
                age: 58,
                tokenNo: "C-103",
                status: "Completed",
              },
              {
                id: 4,
                name: "Emily Johnson",
                age: 41,
                tokenNo: "C-104",
                status: "Waiting",
              },
            ],
          },
        ],
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [expandedDoctors, setExpandedDoctors] = useState({});
  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalDoctors: 0,
    totalPatients: 0,
    waitingPatients: 0,
    inProgressPatients: 0,
    completedPatients: 0,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // For demo purposes, we'll continue with the mock data
      // In a real app, you might redirect to login
    }

    const fetchHospitalData = async () => {
      setLoading(true);
      try {
        // In a real app, uncomment this to fetch from API
        // const response = await axios.post(API_URLS.GET_ADMIN);
        // setHospitalInfo(response.data);

        // For demo, we'll use the mock data and simulate a delay
        setTimeout(() => {
          // Initialize all departments as expanded
          const deptExpanded = {};
          hospitalInfo.allDepartments.forEach((dept) => {
            deptExpanded[dept.name] = true;
          });
          setExpandedDepartments(deptExpanded);

          // Calculate statistics
          calculateStats(hospitalInfo);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        toast.error("Failed to load hospital data");
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [hospitalInfo]);

  const calculateStats = (data) => {
    let totalDoctors = 0;
    let totalPatients = 0;
    let waitingPatients = 0;
    let inProgressPatients = 0;
    let completedPatients = 0;

    data.allDepartments.forEach((dept) => {
      totalDoctors += dept.allDoctors.length;

      dept.allDoctors.forEach((doctor) => {
        totalPatients += doctor.allPatients.length;

        doctor.allPatients.forEach((patient) => {
          if (patient.status === "Waiting") waitingPatients++;
          else if (patient.status === "In Progress") inProgressPatients++;
          else if (patient.status === "Completed") completedPatients++;
        });
      });
    });

    setStats({
      totalDepartments: data.allDepartments.length,
      totalDoctors,
      totalPatients,
      waitingPatients,
      inProgressPatients,
      completedPatients,
    });
  };

  const toggleDepartment = (deptName) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [deptName]: !prev[deptName],
    }));
  };

  const toggleDoctor = (doctorName) => {
    setExpandedDoctors((prev) => ({
      ...prev,
      [doctorName]: !prev[doctorName],
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const refreshData = () => {
    setLoading(true);
    // In a real app, this would fetch fresh data
    setTimeout(() => {
      toast.success("Data refreshed successfully");
      setLoading(false);
    }, 1000);
  };

  const exportData = () => {
    // In a real app, this would generate a CSV or PDF
    toast.info("Exporting data...");
    setTimeout(() => {
      toast.success("Data exported successfully");
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const filteredDepartments = hospitalInfo.allDepartments
    .map((dept) => {
      // Filter doctors based on search term
      const filteredDoctors = dept.allDoctors
        .map((doctor) => {
          // Filter patients based on search term and status
          const filteredPatients = doctor.allPatients.filter((patient) => {
            const matchesSearch =
              patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.tokenNo.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter =
              filterStatus === "All" || patient.status === filterStatus;

            return matchesSearch && matchesFilter;
          });

          return {
            ...doctor,
            allPatients: filteredPatients,
            hasMatchingPatients: filteredPatients.length > 0,
          };
        })
        .filter((doctor) => doctor.hasMatchingPatients);

      return {
        ...dept,
        allDoctors: filteredDoctors,
        hasMatchingDoctors: filteredDoctors.length > 0,
      };
    })
    .filter((dept) => dept.hasMatchingDoctors);

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50 dark:bg-gray-900/30">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto px-4">
        {/* Hospital Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {hospitalInfo.name} Hospital
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Admin Dashboard
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={refreshData}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {[
            {
              title: "Departments",
              value: stats.totalDepartments,
              icon: <Building className="w-5 h-5 text-purple-500" />,
              color: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              title: "Doctors",
              value: stats.totalDoctors,
              icon: <User className="w-5 h-5 text-blue-500" />,
              color: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              title: "Patients",
              value: stats.totalPatients,
              icon: <Users className="w-5 h-5 text-indigo-500" />,
              color: "bg-indigo-50 dark:bg-indigo-900/20",
            },
            {
              title: "Waiting",
              value: stats.waitingPatients,
              icon: <Clock className="w-5 h-5 text-yellow-500" />,
              color: "bg-yellow-50 dark:bg-yellow-900/20",
            },
            {
              title: "In Progress",
              value: stats.inProgressPatients,
              icon: <Activity className="w-5 h-5 text-blue-500" />,
              color: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              title: "Completed",
              value: stats.completedPatients,
              icon: <CheckCircle className="w-5 h-5 text-green-500" />,
              color: "bg-green-50 dark:bg-green-900/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} p-4 rounded-xl shadow-sm`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients by name or token..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Statuses</option>
                <option value="Waiting">Waiting</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading hospital data...
              </p>
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                No patients match your search criteria. Try adjusting your
                search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {filteredDepartments.map((department, deptIndex) => (
                  <div
                    key={deptIndex}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    {/* Department Header */}
                    <div
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleDepartment(department.name)}
                    >
                      <div
                        className={`mr-2 transition-transform duration-200 ${
                          expandedDepartments[department.name]
                            ? "rotate-90"
                            : ""
                        }`}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-primary mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {department.name} Department
                        </h2>
                      </div>
                      <div className="ml-auto flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                          {department.allDoctors.length} Doctors
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark">
                          {department.allDoctors.reduce(
                            (total, doctor) =>
                              total + doctor.allPatients.length,
                            0
                          )}{" "}
                          Patients
                        </span>
                      </div>
                    </div>

                    {/* Department Content */}
                    {expandedDepartments[department.name] && (
                      <div className="pl-6">
                        {department.allDoctors.map((doctor, docIndex) => (
                          <div
                            key={docIndex}
                            className="border-t border-gray-200 dark:border-gray-700 first:border-t-0"
                          >
                            {/* Doctor Header */}
                            <div
                              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                              onClick={() => toggleDoctor(doctor.name)}
                            >
                              <div
                                className={`mr-2 transition-transform duration-200 ${
                                  expandedDoctors[doctor.name]
                                    ? "rotate-90"
                                    : ""
                                }`}
                              >
                                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 text-blue-500 mr-2" />
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {doctor.name}
                                </h3>
                              </div>
                              <div className="ml-auto">
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                  {doctor.allPatients.length} Patients
                                </span>
                              </div>
                            </div>

                            {/* Doctor's Patients */}
                            {expandedDoctors[doctor.name] && (
                              <div className="pl-6 pr-4 pb-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                          Token
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                          Patient Name
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                          Age
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                          Status
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                      {doctor.allPatients.map(
                                        (patient, patIndex) => (
                                          <tr
                                            key={patIndex}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                          >
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                              {patient.tokenNo}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                              {patient.name}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                              {patient.age}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                              <span
                                                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                                  patient.status
                                                )}`}
                                              >
                                                {patient.status}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                              <div className="flex justify-end space-x-2">
                                                <button className="p-1 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                  <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                  </svg>
                                                </button>
                                                <button className="p-1 rounded-full text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                                                  <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                  </svg>
                                                </button>
                                                <button className="p-1 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                  <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Missing components for the icons
const Clock = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Activity = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const CheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default AdminDashboard;
