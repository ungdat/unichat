import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../firebase";
import firebase from "firebase/app";

export default function Login() {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Unichat</h2>
      </div>
      <div
        className="login-button1 google"
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        }
      >
        <GoogleOutlined /> sign in with GG
      </div>
      <div
        className="login-button2 facebook"
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        }
      >
        <FacebookOutlined /> sign in with FB
      </div>
    </div>
  );
}

// export default Login;
