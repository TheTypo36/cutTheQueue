import { useState, useEffect } from "react";
import HospitalMap from "./HosiptalMap.jsx";
import useLiveLocation from "./useLiveLocation.js";
import { API_URLS } from "../../api.js";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const NearbyHospitals = () => {
  const { location, error } = useLiveLocation();
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();
  const fetchNearByHospital = async (latitude, longitude) => {
    console.log(API_URLS.DEV_SERVER);
    const url = `${API_URLS.DEV_SERVER}?lat=${latitude}&lng=${longitude}`;
    try {
      console.log("fetcing a url", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const data = await response.json();
      console.log("got the data", data);

      setLoading(false);
      return data.results;
    } catch (error) {
      console.error("error in fetching hospitals:", error);

      return [];
    }
  };

  const checkTheHospitalInDatabase = async (hospitalName) => {
    console.log(hospitalName);

    const url = `${
      API_URLS.GET_HOSPITAL_FROM_DATABASE
    }?name=${hospitalName.trim()}`;
    console.log(url);
    try {
      const response = await axios.get(url);

      console.log(response);

      const { data } = response;

      if (!data || !data.data.hospital) {
        toast.error("This hospital is not in our network yet");
        return;
      }

      toast.success("hospital found! redirecting to registration");

      setTimeout(() => {
        navigate("/register", {
          state: {
            hospitalId: response.data.data.hospital._id,
            hospitalName: response.data.data.hospital.name,
          },
        });
      }, 1000);
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        toast.error(`Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Error in setting up the request
        toast.error("Could not process your request");
      }
      console.error("Error checking hospital:", error);
    }
  };
  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        await fetchNearByHospital("28.5672", "77.2100").then((response) =>
          setHospitals(response)
        );
      };

      fetchData();
    }
  }, [location]);

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left pane: Scrollable hospital list */}
      <div className="w-full md:w-1/2 p-4 mt-16 overflow-y-auto">
        <h2 className="text-2xl text-blue-900 font-bold mb-4">
          Nearby Hospitals
        </h2>
        {!location && (
          <p className="mb-4 text-gray-600">Fetching location...</p>
        )}
        {loading ? (
          <h1 className="text-lg text-gray-900 font-medium">
            Hospitals are loading...
          </h1>
        ) : hospitals.length > 0 ? (
          <div className="flex flex-col gap-4">
            {hospitals.map((hospital) => (
              <div key={hospital.place_id}>
                <div
                  onClick={() => checkTheHospitalInDatabase(hospital.name)}
                  className="block p-4 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 active:scale-95 bg-white"
                >
                  <p className="text-xl font-semibold text-gray-800">
                    {hospital.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No hospitals found nearby</p>
        )}
      </div>
      {/* Right pane: Fixed map view */}
      <div className="hidden md:block md:w-1/2 p-4 mt-16 h-[100vh]">
        <HospitalMap hospitals={hospitals} />
      </div>
    </div>
  );
};

export default NearbyHospitals;
