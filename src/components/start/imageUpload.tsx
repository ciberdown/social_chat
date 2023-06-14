import { Grid, Typography, Button, ButtonClasses } from "@mui/material";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { CircularProgress } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FormEventHandler, useState } from "react";
import { State } from "../../redux/userInterface";

export default function ImageUpload({
  setUploadImageURL,
  setSignUpStr,
}: {
  setUploadImageURL: Function;
  setSignUpStr: Function;
}) {
  const mode: "light" | "dark" = useSelector((state: State) => state.Mode.mode);
  const [progress, setProgress] = useState<number>(0);

  const handleAddProfileImage = (event: any) => {
    // console.log(event.target.files[0]);
    addFileToFirebase(event.target.files[0]);
  };
  const addFileToFirebase = (file: File) => {
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress === 100? setSignUpStr('Sign Up'):setSignUpStr('uploading image')
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploadImageURL(url);
        });
      }
    );
  };
  return (
    <>
      <Grid>
        <Button
          disableRipple
          sx={{
            m: 2,
            bgcolor: mode === "dark" ? "secondary.main" : "primary.main",
            color: mode === "dark" ? "black" : "white",
          }}
          onChange={handleAddProfileImage}
          variant="contained"
          component="label"
        >
          <input type="file" hidden onChange={handleAddProfileImage} />
          <Typography>Add profile image</Typography>
          <AddPhotoAlternateIcon
            sx={{ color: mode === "dark" ? "black" : "white", ml: 2 }}
            fontSize="large"
          />
        </Button>
      </Grid>
      {progress !== 100 ? (
        <CircularProgress
          thickness={3}
          sx={{
            mt: 3,
            ml: 2,
            color: mode === "dark" ? "secondary.main" : "primary.main",
          }}
          variant="determinate"
          value={progress}
        />
      ) : (
        <CloudDoneIcon
          fontSize="large"
          color={mode === "dark" ? "secondary" : "primary"}
          sx={{ mt: 3, ml: 2 }}
        />
      )}
    </>
  );
}
