import { useState, useEffect } from "react";
import HospitalMap from "./HosiptalMap.jsx";
import useLiveLocation from "./useLiveLocation.js";
import { API_URLS } from "../../api.js";
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
    <div>
      <h2>Nearby Hospitals</h2>
      {!location && <p>Fetching location...</p>}
      {loading ? (
        <h1>Hospitals are loading...</h1>
      ) : hospitals.length > 0 ? (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.place_id}>
              <link to="/sign-in">
                {" "}
                {hospital.name} - {hospital.vicinity}
              </link>
            </li>
          ))}
          <HospitalMap hospitals={hospitals} />
        </ul>
      ) : (
        <p>No hospitals found nearby</p>
      )}
    </div>
  );
};

export default NearbyHospitals;
