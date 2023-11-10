import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/layout";
import useFetch from "../hooks/useFetch";
import {
  RequestType,
  BookingConfirmationResponse,
  ApiResponse,
  mapDoctorIdToImage,
} from "../utils/constants";
import LoadingSkeleton from "../components/LoadingSkeleton";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { formatTime, toCamelCase } from "../utils/utils";
import * as dayjs from "dayjs";

function BookingSuccess() {
  const { bookingId } = useParams();
  const {
    request: fetchBookingSuccessDetails,
    data: bookingSuccessData,
    loading,
    error,
  }: ApiResponse<BookingConfirmationResponse> = useFetch({
    endpoint: "booking/" + bookingId,
    requestType: RequestType.GET,
  });
  useEffect(() => {
    fetchBookingSuccessDetails();
  }, []);

  return (
    <div>
      <Layout heading="Booking Success">
        <div style={{ marginTop: "50px" }}>
          {loading && <LoadingSkeleton />}
          {error && <p>Error while loading booking details</p>}
          {bookingSuccessData && (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="340"
                  image={mapDoctorIdToImage[bookingSuccessData.doctorId]}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#30d158", fontWeight: "600" }}
                  >
                    Confirmed!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {toCamelCase(bookingSuccessData.name)}, is booked with the
                    doctor at{" "}
                    {dayjs(bookingSuccessData.date).format("DD MMM YYYY, dddd")}{" "}
                    at {formatTime(bookingSuccessData.start)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default BookingSuccess;
