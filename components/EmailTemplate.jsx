import * as React from "react";

export const EmailTemplate = ({ firstName, message }) =>
(
  <div>
    {/* <h1>Welcome, {firstName}!</h1> */}
    {/* <p>Thank you for sending me a message. I will get back with you as soon as I can.</p> */}
    <h1>Contact message from {firstName}:</h1>
    <p>{message}</p>
  </div>
);

export default EmailTemplate;