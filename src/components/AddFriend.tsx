import * as React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./styles.css"; 
import axios from "axios";
import getCookieValue from './global_components/Cookies'
axios.defaults.withCredentials = true;

export default function AddFriend() {
  const {userId, userName} = getCookieValue()
  const [findFriend, setFindFriend] = React.useState('')
  const [found, setFound] = React.useState<boolean | null>(null)
  const [ message, setMessage] = React.useState('')


  React.useEffect(()=>{
    setFound(null)
  }, [])

  function addFriendClick(){
    
    axios
      .post(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/friends",
        { userId, userName, friendUserName: findFriend }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "no such user") {
          setMessage("No user found, please try again");
        }
        if (res.data.message === "alr friends") {
          setMessage("You are already friends!");
        }
        if (res.data.message === "request alr sent") {
          setMessage("Your request was previously sent");
        }
        if (res.data.userName) {
          setMessage(`Your request has been sent to ${res.data.userName}`);
        }
      });
  }
  return (
    
    <Box>
      <Stack spacing={3}>   
        {message !== '' && <h6>{message}</h6>}
        
        <TextField
          className="inputRounded"
          placeholder="Username"
          variant="outlined"
          size="small"
          onChange={(event)=>setFindFriend(event.target.value)}
        />
        <Chip onClick={addFriendClick} label="Add Friend" color="secondary" />
      </Stack>
    </Box>
  );
}
