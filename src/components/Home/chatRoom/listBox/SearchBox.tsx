import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({mode, sx}:{mode:'dark'|'light', sx:object}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        sx={sx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
