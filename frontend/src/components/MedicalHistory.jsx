import { useEffect, useState } from "react";
import { API_URLS } from "../api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "react-image-lightbox/style.css";

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
    <Container className="mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            {medicalHistory === "" ? (
              <div className="text-center text-muted">No records found</div>
            ) : (
              <Image
                src={medicalHistory}
                className="img-fluid"
                alt="Medical History"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                fluid
              />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicalHistory;
