import "./App.css";
import Grid from "@mui/system/Unstable_Grid";
import DoctorCard from "./components/DoctorCard";
import Layout from "./layout/layout";
import SearchBar from "./components/SearchBar";
import { StyledLink } from "./components/StyledLink";
import {
  ApiResponse,
  Doctor,
  RequestType,
  mapDoctorIdToImage,
} from "./utils/constants";
import useFetch from "./hooks/useFetch";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { useEffect } from "react";

function App() {
  const {
    request: fetchDoctors,
    data: doctors,
    loading,
    error,
  }: ApiResponse<Doctor[]> = useFetch({
    endpoint: "doctor",
    requestType: RequestType.GET,
  });
  useEffect(() => {
    fetchDoctors();
  }, []);
  return (
    <>
      <Layout heading="Doctors">
        <div style={{ marginTop: "30px" }}>
          <SearchBar />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Grid container spacing={2}>
            {loading && <LoadingSkeleton />}
            {error && <p> Error {error}</p>}
            {doctors &&
              doctors.map((d) => (
                <Grid xs={6} md={4} lg={3} key={d.id}>
                  <StyledLink to={d.id + "/book"}>
                    <DoctorCard
                      doctor={d}
                      imageUrl={mapDoctorIdToImage[d.id]}
                    />
                  </StyledLink>
                </Grid>
              ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}

export default App;
