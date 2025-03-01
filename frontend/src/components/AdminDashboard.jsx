import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [hospital, setHospital] = useState("");
  const [departments, setDepartment] = useState([]);

  useEffect(() => {}, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="text-2xl font-bold mb-4">{hospital}</div>
        {departments.map((department, index) => (
          <div key={index} className="mb-6">
            <div className="text-xl font-semibold mb-2">{department.name}</div>
            {department.patients.map((patient, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="text-lg font-medium">
                  Patient's Name: {patient.name}
                </div>
                <div className="text-lg">
                  Patient's Doctor: {patient.DoctorName}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
