import emailjs from 'emailjs-com';
import { useState } from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./styles.css";
import getCookieValue from './global_components/Cookies';
import Button from "@mui/material/Button";

export default function InviteFriend() {
  
  const [to_name, setToName] = useState('');
  // const [from_name, setFromName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function sendEmail(e: any) {
    e.preventDefault();

    console.log(to_name);
    console.log(email);
    console.log(message);

    const emailData: any = {
      to_name: to_name,
      email: email,
      message: message,
    }

    emailjs
      .send(
        "service_d3nlbfl",
        "template_pcjcfcf",
        emailData,
        "f6P-iyJnUgH5Dv6NH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
      e.target.reset();
  }

  return (
    <Box>
      <Stack spacing={12}>
        <form onSubmit={sendEmail}>
          <Box>
            <TextField
              className="inputRounded"
              placeholder="Name"
              name="to_name"
              onChange={(event) => {
                setToName(event.target.value);
              }}
            ></TextField>
          </Box>

          <Box sx={{ mt: 3 }}>
            <TextField
              className="inputRounded"
              placeholder="Email Address"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></TextField>
          </Box>

          <Box sx={{ mt: 3 }}>
            <TextField
              className="inputRounded"
              placeholder="Your message"
              name="message"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            ></TextField>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "secondary.main", borderRadius: 25 }}
          >
            Send Invite
          </Button>
        </form>
      </Stack>
    </Box>
  );
}