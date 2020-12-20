import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.confiq';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import './Login.css'
import { UserContext } from '../../App';
import firebase from "firebase/app";


import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

const Login = () => {
    let history = useHistory();
    let location = useLocation();
     
    let { from } = location.state || { from: { pathname: "/" } };
  
      const [user, setUser] = useState({
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          password: ''
        })
  
        const [loggedInUser, setLoggedInUser] = useContext(UserContext)
        
  
  
        const handleGoogleSignIn = () => {
          const googleProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleProvider)
          .then((res) => {
            const {displayName, email, photoURL} = res.user
              const userSignIn ={
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL
              }
              setLoggedInUser(userSignIn)
              history.replace(from);
              console.log('email ok')
          })
      }
    return (
        <div id= "parent">
            
      
          <Form className="login-form" >
              <h4 style={{ textAlign: "left", paddingBottom: "20px", fontWeight: "bold" }}>Login</h4>
              <p style={{ color: "red" }}>  </p>


              <Button id="sigining-btn" variant="light" onClick={handleGoogleSignIn} >
                  <FcGoogle style={{ fontSize: "36px" }}/> 
                  Continue With Google
                </Button>
                

          </Form>

      </div>
    );
};

export default Login;