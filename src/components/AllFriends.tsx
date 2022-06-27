import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import { purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

import getCookieValue from './global_components/Cookies'
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export default function AllFriends(props:{refresh:boolean}) {
  const [allFriends, setAllFriends] = React.useState([])
  const {userId, userName} = getCookieValue()
  let navigate = useNavigate();
React.useEffect(()=>{
  axios
    .get(
      "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/friends",
      { params: { userId } }
    )
    .then((res) => {
      setAllFriends(res.data);
      console.log(res.data, allFriends, "response");
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[props.refresh])

  return (
    <Stack direction="row" spacing={1}>
      {allFriends.map(friend=>{
        return (
          <Chip
            key={friend["_id"]}
            variant="outlined"
            avatar={
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <Typography sx={{ color: purple[50] }}>
                  {friend["userName"][0]}
                </Typography>
              </Avatar>
            }
            label={friend["userName"]}
            onClick={()=>{
              navigate("/friendhabits", {state:{
                friendUserName: friend["userName"]}})}}
          />
        );
      })}
      
    </Stack>
  );
}
