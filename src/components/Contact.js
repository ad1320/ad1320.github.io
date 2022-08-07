import { TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, setState } from 'react';
import Button from "@mui/material/Button";

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        axios.post("/api/message", {
            name: name,
            email: email,
            subject: subject, 
            message: message,
        })
    }

    return (
        <div align="center">
            <div>
            <Typography>Feel free to contact us with any comments, questions, or concerns.</Typography>
            </div>
            <div>
            <Typography>Name:</Typography>
            <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
            </div>
            <div>
            <Typography>Email:</Typography>
            <TextField value={email} onChange={(event) => setEmail(event.target.value)}></TextField>
            </div>
            <div>
            <Typography>Subject:</Typography>
            <TextField value={subject} onChange={(event) => setSubject(event.target.value)}></TextField>
            </div>
            <div>
            <Typography>Message:</Typography>
            <TextField
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            multiline
            rows={3}></TextField>
            </div>
            <div>
            <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}