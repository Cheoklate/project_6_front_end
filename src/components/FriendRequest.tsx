import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { red } from "@mui/material/colors";
import axios from "axios";


export default function FriendRequest() {
  const [friendRequest, setFriendRequest] = React.useState([])
    React.useEffect(()=>{
      const userId = "62aae68f0fc6103849280b25"
      axios
      .get('http://localhost:3004/friendrequest', {params: {userId}})
      .then(res =>{
        setFriendRequest(res.data)
        console.log(res.data, friendRequest, 'response')

      })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

function acceptRequest(friendUserName:any, friendUserId:any) :any {
  console.log(friendUserName, friendUserId)
  axios
  .post('http://localhost:3004/friendrequest', {friendUserName, friendUserId})
  .then(res=>{
    console.log(res.data)
  })
}
  

  return (
    <Box>
     
        {friendRequest?.map((request)=>{
          return (
            <>
            <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{request['userName'][0]}</Avatar>
            <Typography>{request['userName']}</Typography>

            <Chip label="Accept" color="success"  defaultValue={[request['userName'],request['userId']]} onClick={()=>acceptRequest(request['userName'],request['userId'])}/>
            <Chip label="Reject" sx={{ bgcolor: red[500] }} />
            </Stack>
            <Divider />
            
            </>
          )
        })}
        
        
 
    </Box>
  );
}
