import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function AllFriends() {
  const [allFriends, setAllFriends] = React.useState([])
React.useEffect(()=>{
  axios
  .get('http://localhost:3004/friends', {params: {userId:"62aae7c2fd55155e96803269"}})
  .then(res =>{
    setAllFriends(res.data)
    console.log(res.data, allFriends, 'response')

  })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <Stack direction="row" spacing={1}>
      {allFriends.map(friend=>{
        return (
          <Chip 
           variant="outlined"
           avatar={<Avatar>{friend['userName'][0]}</Avatar>} label={friend['userName']} />
        )
      })}
      
    </Stack>
  );
}
