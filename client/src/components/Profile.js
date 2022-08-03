import * as React from "react";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { UserContext } from "../App";
import { Button } from "@mui/material";
import Register from "./Register"


export default function Profile() {
    const user = localStorage.getItem('user');

    return (
        <Box>
            <div class="Profile">
                {user ? (
                    <Typography>{toString(user)}</Typography>
                ) : (<div>
                    <div>
                        <center>
                            <Register />
                        </center>
                    </div>
                </div>
                    )}
            </div>

        </Box>
    )
}

