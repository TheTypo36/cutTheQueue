import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { API_URLS } from "../../api.js";
import { Hospital } from "lucide-react";

const HospitalMap = ({ hospitals }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: hospitals.length > 0 ? hospitals[0].geometry.location.lat : 28.6139,
    lng: hospitals.length > 0 ? hospitals[0].geometry.location.lng : 77.209,
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
      <Marker position={defaultCenter} label="you">
        {hospitals.map((Hospital, index) => {
          <Marker
            key={index}
            position={{
              lat: Hospital.geometry.location.lat,
              lng: Hospital.geometry.location.lng,
            }}
            label="H"
          />;
        })}
      </Marker>
    </GoogleMap>
  );
};

export default HospitalMap;
