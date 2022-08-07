import React, { useState, setState } from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro/';
import AdapterDateFns from '@date-io/date-fns';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

//descriptive error messages

export default function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [yearsPlaying, setYearsPlaying] = useState("")
  const [dob, setDob] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [interests, setInterests] = useState([]);
  const [rating, setRating] = useState("");
  const [lichess, setLichess] = useState("");
  const [zoom, setZoom] = useState("");

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePhone = (phone) => {
    return phone.match(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    );
  };

  const handleSubmit = () => {
    if (
      !validateEmail(email) ||
      !validatePhone(phone)
    )
      setError(true);
    else
      axios
        .post("/api/user/ ", {
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
          email: email,
          phone: phone,
          dob: dob,
          years_playing: yearsPlaying,
          job: job,
          // photo: photo,
          // interests: interests,
          rating: rating,
          lichess: lichess,
          zoom: zoom,
        })
        .then((res) => {
          if (res.data === "error") setError(true);

        })
    // .then(handleClose);
  }

  const uploadedImage = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {

      setPhoto(file)
    }
  };

  const convertDate = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  const interest_list = ["finance", "gaming", "writing", "fitness"]

  return (
    <div>
      <Button class="register-button" onClick={handleClickOpen}>
        Register
      </Button>
      <Dialog open={open}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your information to register.
          </DialogContentText>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={error}
            required
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={error}
            required
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value.toLowerCase())}
            error={error}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
            error={error}
            required
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            variant="standard"
            onChange={(event) => setPhone(event.target.value)}
            error={error}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <br></br><br></br>
            <DatePicker
              label="Date of birth"
              value={dob}
              onChange={(newDate) => {
                setDob(convertDate(newDate));
              }}
              renderInput={(params) => <TextField {...params} />}
              required
            />
          </LocalizationProvider>
          <br></br>
          <TextField
            margin="dense"
            id="job"
            label="Occupation"
            fullWidth
            variant="standard"
            value={job}
            onChange={(event) =>  setJob(event.target.value) }
            error={error}
          />
          <br></br><br></br>
          <Typography>Years Playing</Typography>
          <input

            id="yearsPlaying"
            type="number"
            variant="standard"
            value={yearsPlaying}
            onChange={(event) => setYearsPlaying(event.target.value) }
            error={error}
            required
          />
          <br></br><br></br>
          <div>
            <Typography>Pick your interests from the list below.</Typography>
            {interest_list.map(i => <FormControlLabel control={<Checkbox />} label={i} onChange={() => { setInterests(oldList => [...oldList, i]) }} />)}
          </div>
          <br></br>
          <div>
            <Typography>Choose a profile picture.</Typography>
            <input type="file" accept="image/*" multiple={false} onChange={handleImageUpload} />
          </div>
          <br></br>

          <div>
            <Typography> Your highest rating (any format, online or over-the-board); 0 if unrated </Typography>
          </div>

          <input

            id="rating"
            type="number"
            variant="standard"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            error={error}
            required
          />

          <TextField
            margin="dense"
            id="lichess"
            value={lichess}
            label="Lichess username (if you have one)"
            fullWidth
            variant="standard"
            onChange={(event) => setLichess(event.target.value)}
            error={error}
          />

          <TextField
            margin="dense"
            id="zoom"
            value={zoom}
            label="Zoom username or email"
            fullWidth
            variant="standard"
            onChange={(event) => setZoom(event.target.value)}
            error={error}
            required
          />

          <TextField
            margin="dense"
            id="bio"
            value={bio}
            label="Please write a short bio about yourself and your chess journey/aspriations"
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 1000 }}
            variant="standard"
            onChange={(event) => setBio(event.target.value)}
            error={error}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}



// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       email: "",
//       phone: "",
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     const target = 

//     this.setState([name]: value);
//   }

//   handleSubmit(event) {
//     alert('A user was registered: ' + this.state.username);
//     event.preventDefault();
//     if (
//       this.state.username === "" ||
//       this.state.password === "" ||
//       !validateEmail(this.state.email) ||
//       !validatePhone(this.state.phone)
//     )
//       setError(true);
//     else {
//       if (item.id) {
//         axios
//           .put(`/api/todos/${item.id}/`, item)
//           .then((res) => this.refreshList());
//         return;
//       }
//       axios
//         .post("/api/todos/", item)
//         .then((res) => this.refreshList());
//     };
//   }

//   validateEmail(email) {
//     return email.match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
//   };

//   validatePhone(phone) {
//     return phone.match(
//       /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
//     );
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={this.state.username} onChange={this.handleChange} />
//       </label>
//       <label>
//         Password:
//         <input type="text" value={this.state.password} onChange={this.handleChange} />
//       </label>
//       <label>
//         Email:
//         <input type="text" value={this.state.email} onChange={this.handleChange} />
//       </label>
//       <label>
//         Phone:
//         <input type="text" value={this.state.phone} onChange={this.handleChange} />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );

// }
// }





