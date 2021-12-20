import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import URL from "./Firebase";

function Contact() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    if (user.name === "" || user.email === "" || user.message === "") {
      alert("Please fill all the fields");
    } else {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // If submit button is pressed, clear the form and show a success message
      if (res) {
        setUser({
          name: "",
          email: "",
          message: "",
        });
        alert("Message sent successfully!");
      }
    }
  };

  return (
    <>
      <Container id="myContainer">
        <div className="container">
          <h3>Message</h3>
        </div>
        <Form action="/" method="POST">
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={user.name}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              id="text-area"
              rows="5"
              placeholder="Your message here..."
              name="message"
              value={user.message}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={postData}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Contact;
