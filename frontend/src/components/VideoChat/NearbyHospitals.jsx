import { useState, useEffect } from "react";
import HospitalMap from "./HosiptalMap.jsx";
import useLiveLocation from "./useLiveLocation.js";
import { API_URLS } from "../../api.js";
import { Link } from "react-router-dom";
const NearbyHospitals = () => {
  const { location, error } = useLiveLocation();
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);

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
  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        await fetchNearByHospital(location.latitude, location.longitude).then(
          (response) => setHospitals(response)
        );
      };

      fetchData();
    }
  }, [location]);

  return (
    <div className="flex h-screen">
      {/* Left pane: Scrollable hospital list */}
      <div className="w-full md:w-1/2 p-4 mt-16 overflow-y-auto">
        <h2 className="text-2xl text-blue-900 font-bold mb-4">
          Nearby Hospitals
        </h2>
        {!location && (
          <p className="mb-4 text-gray-600">Fetching location...</p>
        )}
        {loading ? (
          <h1 className="text-lg font-medium">Hospitals are loading...</h1>
        ) : hospitals.length > 0 ? (
          <div className="flex flex-col gap-4">
            {hospitals.map((hospital) => (
              <div key={hospital.place_id}>
                <Link
                  to="/signin"
                  className="block p-4 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 active:scale-95 bg-white"
                >
                  <p className="text-xl font-semibold text-gray-800">
                    {hospital.name}
                  </p>
                </Link>
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
