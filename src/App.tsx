import "./App.css";
import Grid from "@mui/system/Unstable_Grid";
import DoctorCard from "./components/doctor/DoctorCard";
import Layout from "./layout/layout";
import SearchBar from "./components/common/SearchBar";
import { StyledLink } from "./components/common/StyledLink";
import {
  ApiResponse,
  Doctor,
  RequestType,
  mapDoctorIdToImage,
} from "./utils/constants";
import useFetch from "./hooks/useFetch";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import { useEffect, useState } from "react";
import { searchInObjectByKeys } from "./utils/utils";

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
  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      <Layout heading="Doctors">
        <div style={{ marginTop: "30px" }}>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Grid container spacing={2}>
            {loading && <LoadingSkeleton />}
            {error && <p> {error}</p>}
            {doctors &&
              doctors
                .filter((d) =>
                  searchInObjectByKeys(searchText, d, [
                    "address",
                    "description",
                    "name",
                  ])
                )
                .map((d) => (
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
