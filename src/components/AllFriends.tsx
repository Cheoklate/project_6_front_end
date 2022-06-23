import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import { purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

axios.defaults.withCredentials = true;

export default function AllFriends() {
  const [allFriends, setAllFriends] = React.useState([])
React.useEffect(()=>{
  axios
    .get("http://localhost:3004/friends", {
      params: { userId: "62aae7c2fd55155e96803269" },
    })
    .then((res) => {
      setAllFriends(res.data);
      console.log(res.data, allFriends, "response");
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

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
          />
        );
      })}
      
    </Stack>
  );
}
