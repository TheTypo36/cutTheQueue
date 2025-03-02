import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_URLS } from "../api";
import axios from "axios";
const AdminDashboard = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "MAHAVEER",
    allDepartments: [
      {
        name: "Cardiology",
        allDoctors: [
          {
            name: "Dr. Ambhuj",
            allPatients: [{ DoctorName: "test 90" }, { DoctorName: "test 80" }],
          },
        ],
      },
      {
        name: "Cancer",
        allDoctors: [
          {
            name: "Dr. Anuj",
            allPatients: [
              { DoctorName: "Test 100" },
              { DoctorName: "test 101" },
            ],
          },
        ],
      },
    ],
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }

    axios
      .post(API_URLS.GET_ADMIN)
      .then((response) => setHospitalInfo(response));

    console.log("hospitalInfo", hospitalInfo);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="text-2xl font-bold mb-4">{hospitalInfo.name}</div>
        {hospitalInfo.allDepartments.map((department, index) => (
          <div key={index} className="mb-6">
            <div className="text-xl font-semibold mb-2">{department.name}</div>
            {department.allDoctors.map((doctor, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="text-lg font-medium">
                  Doctor's Name: {doctor.name}
                </div>

                {doctor.allPatients.map((patient, index) => (
                  <div className="text-lg" key={index}>
                    Patient's name: {patient.DoctorName}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
