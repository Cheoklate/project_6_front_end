import * as React from "react";
import Typography from "@mui/material/Typography";
import InviteFriend from './InviteFriend';

export default function FriendList(): JSX.Element {
  
  return (
    <div>
      <Typography component="h1" variant="h5">
        Friend List
      </Typography>
      <Typography component="h1" variant="h5">
        Invite Friend
      </Typography>
      <InviteFriend />
    </div>
  );
}
