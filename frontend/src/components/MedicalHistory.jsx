import { useEffect, useState } from "react";
import { API_URLS } from "../api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState("");
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("unauthorized: no token found");
          throw new Error(500, "not got the token");
        }
        console.log("token in medical history", token);
        const response = await axios.post(
          API_URLS.GET_PATIENTS_MEDICAL_HISTORY,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          toast.error("failed to fetch medicalRecords");
          throw new Error("failed to fetch medicalRecord in frontend");
        }
        console.log(response?.data);
        setMedicalHistory(response.data.data);
      } catch (error) {
        toast.error("failed in getting the medical history");
        throw new Error(500, "failed in getting the medical history");
      }
    };
    fetchMedicalRecord();
  }, []);
  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      {medicalHistory === "" ? (
        <div className="left-3 top-7">no records found</div>
      ) : (
        <img src={medicalHistory} />
      )}
    </div>
  );
};

export default MedicalHistory;
