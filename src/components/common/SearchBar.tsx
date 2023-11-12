import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar() {
  return (
    <div>
      {" "}
      <TextField
        sx={{
          m: 1,
          width: "100%",
          margin: 0,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#191357",
            },
          },
        }}
        placeholder="Search by name or location"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
