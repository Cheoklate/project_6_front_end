import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./styles.css"; 

export default function AddFriend() {
  return (
    <Box>
      <Stack spacing={1}>
        <TextField
          className="inputRounded"
          placeholder="Username"
          variant="outlined"
          size="small"
        />
        <Chip label="Add Friend" color="secondary" />
      </Stack>
    </Box>
  );
}
