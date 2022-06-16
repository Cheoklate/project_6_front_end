import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

export default function AddFriend() {
  return (
    <Box>
      <TextField
        className="inputRounded"
        placeholder="Username"
        variant="outlined"
        size="small"
      />
      <Chip label="Add Friend" color="secondary" />
    </Box>
  );
}
