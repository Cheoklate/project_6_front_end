import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { red } from "@mui/material/colors";


export default function FriendRequest() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Typography>Username1</Typography>
        <Chip label="Accept" color="success" />
        <Chip label="Reject" sx={{ bgcolor: red[500] }} />
      </Stack>
      <Divider />
      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Typography>Username2</Typography>
        <Chip label="Accept" color="success" />
        <Chip label="Reject" sx={{ bgcolor: red[500] }} />
      </Stack>
      <Divider />
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <Typography>Username3</Typography>
        <Chip label="Accept" color="success" />
        <Chip label="Reject" sx={{ bgcolor: red[500] }} />
      </Stack>
      <Divider />
    </Box>
  );
}
