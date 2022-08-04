import { Dialog, DialogContent, Typography } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import DialogActions from "@mui/material/DialogActions";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro/';
import AdapterDateFns from '@date-io/date-fns';
import axios from "axios";

export default function RequestButton(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [time, setTime] = React.useState("");
    const [message, setMessage] = React.useState("");

    const user = props.id;

    const handleClose = () => {
        setOpen(false);
        setError(false);
    };

    const handleSubmit = () => {
        console.log(user)
        axios.post("/api/meetingrequest/",
            {
                sender: localStorage.getItem('user'),
                recipient: user,
                time: time,
                message: message,
            }
        ).then((res) => {
            console.log(res);
            if (res.data === "error") setError(true);
          })};

    const handleOpen = () => {
        setOpen(true)
    }

    const convertDateTime = (dateTime) => {
        var dd = String(dateTime.getDate()).padStart(2, '0');
        var mm = String(dateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateTime.getFullYear();
        var hh = String(dateTime.getHours()).padStart(2, '0');
        var min = String(dateTime.getMinutes()).padStart(2, '0');
        var ss = String(dateTime.getSeconds()).padStart(2, '0');
        return yyyy + '-' + dd + '-' + mm + ' ' + hh + ':' + min + ':' + ss;
      }    

    return (
        <div>
            <Button onClick={handleOpen}>Request</Button>
            <Dialog open={open}>
                <DialogTitle>Request a Meeting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select a time for your meeting.
          </DialogContentText>
          <br></br>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            
                            label="DateTimePicker"
                            value={time}
                            onChange={(newTime) => {
                                setTime(convertDateTime(newTime));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            required
                        />
                    </LocalizationProvider>
                    <br></br><br></br>
                    <Typography>Message your potential pal about when to meet and what you want to do during your meeting.</Typography>
                    <TextField
            margin="dense"
            id="message"
            label="Message"
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 1000 }}
            variant="standard"
            onChange={(event) => setMessage(event.target.value)}
            error={error}
          />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Register</Button>
                </DialogActions>
            </Dialog>
        </div>

    )

}

