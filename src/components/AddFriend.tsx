import * as React from 'react';
import { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./styles.css"; 
import axios from "axios";
axios.defaults.withCredentials = true;

export default function AddFriend() {
  const [findFriend, setFindFriend] = React.useState('')
  
  const [found, setFound] = React.useState<boolean | null>(null)

  React.useEffect(()=>{
    setFound(null)
  }, [])

  function addFriendClick(){
    const userId = "62aae7c2fd55155e96803269"
    
    axios
    .post('http://localhost:3004/friends', {userId, userName: findFriend})
    .then(res =>
      {console.log(res.data)
        res.data === null ? setFound(false) : setFound(true)
      })
  }
  return (
    <Box>
      <Stack spacing={3}>   
        {found === true && <h6>friend request sent to {findFriend}</h6>}
        {found === false && <h6>user does not exist, try again</h6>
        } 
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
