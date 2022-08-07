import * as React from "react";
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import RequestButton from "./RequestButton";
import BioDialog from "./BioDialog";
import Button from "@mui/material/Button"

export default function Meetings() {

    const user = localStorage.getItem('user');

    const clientID = "4KJSZCCRTgO1_2PsWxrkWg";
    const secret = "VMztzBcxbjRfa7903tNhJGDSs1zVkekB";          //hide these probably

    let btnRef = React.useRef();

    const [mreqData, setMreqData] = React.useState([]);
    const [meetingData, setMeetingData] = React.useState([]);
    const [lichessLink, setLichessLink] = React.useState("");
    const [startLink, setStartLink] = React.useState("");
    const [joinLink, setJoinLink] = React.useState("");
    const [userId, setUserId] = React.useState("");

    const acceptMeeting = (id, sender, time) => {
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
          }
        console.log("pass");
        axios.post("/api/meeting/", {
            player1: sender,
            player2: user,
            time: time,            
        });

        axios.delete("/api/meetingrequest/".concat(id))

    } 

    const startMeeting = (id) => {
        const res = axios.get("/api/meeting/".concat(id));
        console.log(res.url);
        if(res.url){
            window.open(res.data.lichess);
        }
        else{
            // axios.post("https://lichess.org/api/challenge/open").then((LCres) => setLichessLink(LCres.data.challenge.url));
            // console.log(lichessLink);
            // axios.post("/api/changemeeting/", {id: id, change: "lichess", lichess: lichessLink});
            // window.open(lichessLink);
            // setLichessLink("");
        }

        if(res.zoom){
            window.open(res.zoom);
        }
        else{
            axios.post('https://zoom.us/oauth/authorize?response_type=code&client_id=4KJSZCCRTgO1_2PsWxrkWg&redirect_uri=https%3A%2F%2Fwww.chesspal.org%2F');
            let code = window.location.pathname.substring(6);
            console.log(code);
            axios.post('https://zoom.us/oauth/token',
            {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://www.chesspal.org/'
            },
            {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(clientID + ':' + secret).toString('base64')
                }
            }).then(((res) => console.log(res)));

            axios.post("/api/createzoom/", {zoom: userId}).then((res) => setStartLink(res.data.start_url));
            console.log(startLink);
            axios.post("/api/changemeeting/", {id: id, change: "zoom", zoom: startLink});
            // window.open(startLink);
            setStartLink("");
        }
    }

    React.useEffect(() => {
        axios.post("/api/getmeetingreqs/", {id: user}).then((res) =>  setMreqData(JSON.parse(res.data).map((mreq) => {
            const output =  {
            id: mreq.pk,
            sender: mreq.fields.sender,
            time: mreq.fields.time,
            message: mreq.fields.message
            }
            // console.log(output)
            return output
        }))); 

        axios.post("/api/getmeetings/", {id: user}).then((res) => setMeetingData(JSON.parse(res.data).map((meeting) => {
            const output =  {
            id: meeting.pk,
            player1: meeting.fields.player1,
            player2: meeting.fields.player2,
            time: meeting.fields.time,
            }
            return output
        }))); 

        axios.get("/api/user/".concat(user)).then((res) => setUserId(res.data.zoom))
    }, [user])

    

    const req_columns = [
        { field: "player1", headerName: "Player 1", flex: 1},
        { field: "player2", headerName: "Player 2", flex: 1},
        { field: "profile", headerName: "Profile", flex: 1, renderCell: cell => <BioDialog id={cell.row.sender}>Bio</BioDialog>},
        { field: "time", headerName: "Time", flex: 1 },
        { field: "message", headerName: "Message", flex: 1 },
        {
          field: "accept", headerName: "",
          flex: 1,
          renderCell: cell => <Button id={cell.row.id} onClick={(e) => acceptMeeting(cell.row.id, cell.row.sender, cell.row.time)}>Accept</Button>,
        },
        {
            field: "new_req", headerName: "",
            flex: 1,
            renderCell: cell => <RequestButton id={cell.row.id}/>,
          },
       
      ];

    const meeting_columns = [
        {field: "time", headerName: "Time", flex: 1},
        {field: "player1", headerName: "Player 1", flex: 1},
        {field: "player2", headerName: "Player 2", flex: 1},
        {field: "start", headerName: "", flex: 1, renderCell: cell => <Button onClick={(e) => startMeeting(cell.row.id)}>Start</Button>},
        
    ]

    return (
        <div>
            <div className="IncomingMReqs">
            <title>Incoming Meeting Requests</title>
            <Paper>
                <DataGrid
                    rows={mreqData}
                    columns={req_columns}
                    getRowId={(row) => row.id}
                    autoHeight
                />
            </Paper>
        </div>
        <div className="Meetings">
        <title>Incoming Meeting Requests</title>
        <Paper>
            <DataGrid
                rows={meetingData}
                columns={meeting_columns}
                getRowId={(row) => row.id}
                autoHeight
            />
        </Paper>
    </div>
        </div>
        
    )
}