import emailjs from 'emailjs-com';
import { useState } from 'react';

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
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="to_name"
                onChange={(event) => {
                  setToName(event.target.value);
                }}
              ></input>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <textarea
                className="form-control"
                placeholder="Your message"
                name="message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></textarea>
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