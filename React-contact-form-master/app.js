
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PrimaryButton from "./shared/button";
import firebase from "../firebase";
import GoogleLogin from "./google-login";

export default class PhoneLogin extends Component {
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  render() {
    return (
      <div>
        <Container fluid="sm" className="mt-3">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Login</h2>
              <Form className="form" onSubmit={this.onSignInSubmit}>
                <div id="recaptcha-container"></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </Form.Group>
                <PrimaryButton button="Submit" type="submit" />
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Enter OTP</h2>
              <Form className="form" onSubmit={this.onSubmitOtp}>
                <Form.Group>
                  <Form.Control
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
                <PrimaryButton button="Submit" type="submit" />
              </Form>
            </Col>
          </Row>
          <GoogleLogin />
        </Container>
      </div>
    );
  }
}