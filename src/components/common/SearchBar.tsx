import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
interface SearchBarProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
}
export default function SearchBar(props: SearchBarProps) {
  const { searchText, setSearchText } = props;
  return (
    <div>
      {" "}
      <TextField
        value={searchText}
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
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
