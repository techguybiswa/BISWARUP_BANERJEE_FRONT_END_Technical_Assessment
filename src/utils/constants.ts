import DoctorRandomImage1 from "../assets/doc7.jpeg";
import DoctorRandomImage2 from "../assets/doc3.jpeg";
import DoctorRandomImage3 from "../assets/doc4.jpeg";
import DoctorRandomImage4 from "../assets/doc5.jpeg";
import DoctorRandomImage5 from "../assets/doc6.jpeg";

export const mapDoctorIdToImage: Record<string, string> = {
  M2159: DoctorRandomImage1,
  M2160: DoctorRandomImage2,
  M2161: DoctorRandomImage3,
  M2162: DoctorRandomImage4,
  M2163: DoctorRandomImage5,
};

export enum Steps {
  "DATE_SELECTION" = "DATE_SELECTION",
  "TIME_SELECTION" = "TIME_SELECTION",
  "BOOKING_CONFIRMATION" = "BOOKING_CONFIRMATION",
}

export interface Address {
  line_1: string;
  line_2: string;
  district: string;
}

export interface OpeningHours {
  start: string;
  end: string;
  isClosed: boolean;
  day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
}

export interface Doctor {
  id: string;
  name: string;
  description: string;
  address: Address;
  opening_hours: OpeningHours[];
}
export interface ApiResponse<T> {
  request : () => void;
  data: T | null;
  loading: boolean;
  error: string | null;
}

export enum RequestType {
'GET' = 'GET' ,
'POST' = 'POST',
'PATCH'  = 'PATCH'
} 

export interface BookingConfirmationResponse {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string;
  status: string; 
}

export interface BookingDetails {
  date: string;
  doctorId: string;
  id: string;
  name: string;
  start: number;
  status: string; 
}
