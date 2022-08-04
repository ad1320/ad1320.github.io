import React, { useState, setState } from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { DialogTitle, Typography } from '@mui/material';
import Register from './Register';

//descriptive error messages

export default function BioDialog(props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState([]);

  const user = localStorage.getItem("user");


  const handleClickOpen = () => {

    axios.get("/api/user/".concat(props.id)).then((res) => setData(res.data));
    //fill in fields
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  return (
    (<div>
      <Button color="inherit" onClick={handleClickOpen}>
      <img src={data.pic} />
        Bio
      </Button>
      <Dialog open={open}>
        <DialogContent>
        <Box
        component="img"
        alt="Profile picture"
        src={data.pic}
      />
          <Typography>First Name: {data.first_name}</Typography>
          <Typography>Last Name: {data.last_name}</Typography>
          <Typography>Years Playing: {data.years_playing}</Typography>
          <Typography>Occupation: {data.job}</Typography>
          <Typography>Interests: {String(data.interests)}</Typography>
          <Typography>Rating: {data.rating}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>)
  );

}








