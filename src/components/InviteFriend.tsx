import emailjs from 'emailjs-com';
import { useState } from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./styles.css";

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
    <div>
      <div className="container">
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <TextField
                className="inputRounded"
                placeholder="Name"
                name="to_name"
                onChange={(event) => {
                  setToName(event.target.value);
                }}
              ></TextField>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <TextField
                className="inputRounded"
                placeholder="Email Address"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></TextField>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <TextareaAutosize
                className="inputRounded"
                placeholder="Your message"
                name="message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></TextareaAutosize>
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input
                type="submit"
                className="btn btn-info"
                value="Invite Friend"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}