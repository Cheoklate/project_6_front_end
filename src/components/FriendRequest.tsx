import * as React from "react";
import { useEffect, useState, Dispatch,SetStateAction } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { red } from "@mui/material/colors";


import axios from "axios";
import getCookieValue from "./global_components/Cookies";


export default function FriendRequest(props:{setRefresh: Dispatch<SetStateAction<boolean>>}) {
  const {userId, userName} = getCookieValue()
  const [friendRequest, setFriendRequest] = React.useState([])
  const [actionDone, setActionDone] = React.useState<boolean>(false)
    React.useEffect(()=>{
      
      axios
        .get(
          "http://ec2-3-1-220-238.ap-southeast-1.compute.amazonaws.com:3004/friendrequest",
          { params: { userId } }
        )
        .then((res) => {
          setFriendRequest(res.data);
          console.log(res.data, friendRequest, "response");
        });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[actionDone])

function requestAction(friendUserName:any, friendUserId:any, action: string) :any {
  const requestData = {userId, userName, friendUserId, friendUserName, action}
  axios
    .post(
      "http://ec2-3-1-220-238.ap-southeast-1.compute.amazonaws.com:3004/friendrequest",
      requestData
    )
    .then((res) => {
      console.log(res.data);
      setActionDone(!actionDone);
      props.setRefresh(!actionDone);
    });
}
  
  return (
    <Box>
     
        {friendRequest?.map((request)=>{
          return (
            <>
            
            <Stack direction="row" spacing={2} >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{request['userName'][0]}</Avatar>
            <Typography>{request['userName']}</Typography>

            <Chip label="Accept" color="success"  defaultValue={[request['userName'],request['_id']]} onClick={()=>requestAction(request['userName'],request['_id'], 'accept')}/>
            <Chip label="Reject" sx={{ bgcolor: red[500] }} defaultValue={[request['userName'],request['_id']]} onClick={()=>requestAction(request['userName'],request['_id'], 'reject')}/>
            </Stack>
            <Divider />
            
            </>
          )
        })}
        
        
 
    </Box>
  );
}
