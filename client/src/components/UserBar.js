import * as React from "react";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { NavLink, useNavigate } from "react-router-dom"
import BioDialog from "./BioDialog";

//different views from logged in or out
export default function Bar() {

    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('user', '');
        navigate('/');

        window.location.reload();
    }

    const navToPals = () => {
        navigate('/pals')
    }

    const navToMeetings = () => {
        navigate('/meetings')
    }

    const navToContact = () => {
        navigate('/contact')
    }

    const navToTeachers = () => {

    }

    const navToTourneys = () => {
        
    }



    if (user) {
        return (
            <Box className="NavBar" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div class="flex-containter">
                            <div class="nav-button">
                                <Button onClick={navToPals}>
                                    <Typography variant="h5" color="black" style={{ color: "black", textDecoration: "black" }} >

                                        Find a Pal

                                    </Typography>
                                </Button>

                            </div>
                            <div class="nav-button">
                                <Button onClick={navToMeetings}>
                                <Typography variant="h5" color="black" style={{ color: "black", textDecoration: "black" }} >

                                        My Meetings

                                    </Typography>
                                </Button>
                            </div>
                            <div class="nav-button">
                            <Button onClick={navToTeachers}>
                                <Typography variant="h5" color="black" style={{ color: "black", textDecoration: "black" }} >
                                        Find a Teacher
                                    
                                </Typography>
                                </Button>
                            </div>
                            <div class="nav-button">
                            <Button onClick={navToTourneys}>
                                <Typography variant="h5" color="black" style={{ color: "black", textDecoration: "black" }} >
                                    Find a Tournament

                                </Typography>
                                </Button>
                            </div>
                            <div class="nav-button">
                                <Button onClick={navToContact}>
                                    <Typography variant="h4" color="black" style={{ color: "inherit", textDecoration: "inherit" }}>
                                        Contact Us

                                    </Typography>
                                </Button>
                            </div>
                            <div>
                                <BioDialog id={localStorage.getItem('user')} />


                            </div>
                            <div>
                                <Button onClick={logout}>
                                    <Typography variant="h4" color="black">

                                        Log Out

                                    </Typography>
                                </Button>

                            </div>






                        </div>
                    </Toolbar>

                </AppBar>
            </Box>
        )
    }
    else {
        return (
            <Box className="NavBar" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div class="flex-containter">
                            <div class="nav-button">
                            </div>
                            <div class="nav-button">
                                <Typography variant="h4" color="black">
                                    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
                                        Find a Teacher
                                    </a>
                                </Typography>
                            </div>
                            <div class="nav-button">
                                <Typography variant="h4" color="black">
                                    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
                                        Find a Tournament
                                    </a>
                                </Typography>
                            </div>
                            <div class="nav-button">
                                <Typography variant="h4" color="black">
                                    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
                                        Contact Us
                                    </a>
                                </Typography>
                            </div>





                        </div>
                    </Toolbar>

                </AppBar>
            </Box>
        )
    }

}

