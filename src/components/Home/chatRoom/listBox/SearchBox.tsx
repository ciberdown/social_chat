import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { collection, getDocs, query, startAt, where } from "firebase/firestore";
import { UserInterface, auth, db } from "../../../../app/firebase/config";
import SearchResults from "./searchResults";

export default function SearchBox({
  mode,
  sx,
}: {
  mode: "dark" | "light";
  sx: object;
}) {
  const [searchBar, setSearchBar] = useState([]);
  const [openResults, setOpenResults] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [progressbar, setProgressbar] = useState<
    "indeterminate" | "determinate"
  >("determinate");
  const searchUser = async (str: string) => {
    setProgressbar("indeterminate");
    setSearchBar([]);
    const q = query(
      collection(db, "users"),
      where("name", ">=", str),
      where("name", "<=", str + "\uf8ff")
    );
    try {
      const querySnapshot = await getDocs(q);
      let list: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        doc.data().name !== auth.currentUser?.displayName &&
          list.push(doc.data());
      });
      setProgressbar("determinate");
      if (list.length !== 0) {
        //users found
        setOpenResults(true);
        setSearchBar(list);
        // console.log(list);
      }
    } catch (err) {
      console.error(err);
      setProgressbar("determinate");
    }
  };
  const handleChange = (event: any) => {
    const str: string = event.target.value;
    setSearchTerm(str);
    searchUser(str);
  };
  const handleFocus = () => {};
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
        onFocus={handleFocus}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CircularProgress
                size={20}
                thickness={4}
                sx={{
                  mr: 2,
                  color: mode === "dark" ? "white" : "primary.main",
                }}
                variant={progressbar}
              />
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <SearchResults
        searchBar={searchBar}
        open={openResults}
        setOpen={setOpenResults}
        setValue={setSearchTerm}
      />
    </>
  );
}
