import * as React from "react";
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import RequestButton from "./RequestButton";

export default function PalsPage() {

    const[data, setData] = React.useState([])

    React.useEffect(() => {
        axios.get("/api/user").then((res) => setData((res.data).map((user) => {
            return {
            id: user.id,
            username: user.username,
            name: user.first_name,
            years_playing: user.years_playing,
            job: user.job,
            rating: user.rating,
            }
        }))); //add api route
    }, [])

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "years_playing", headerName: "Years Playing", flex: 1 },
        { field: "job", headerName: "Job", flex: 1 },
        { field: "rating", headerName: "Rating", flex: 1 },
        {
          field: "request",
          headerName: "Request a Meeting",
          flex: 1,
          renderCell: cell => <RequestButton id={cell.row.id}/>,
        },
       
      ];

    return (
        <div className="PalsPage">
            <title>Find a Pal</title>

            <Paper>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.username}
                    autoHeight
                />
            </Paper>
        </div>
    )
}