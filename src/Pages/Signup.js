// export default SignUp;

import React, {useCallback} from 'react';
import {withRouter} from "react-router";
import { Link } from 'react-router-dom';
import firebase from "../Firebase/firebase";
 
const SignUp = ({history}) => {
  const handleSignup = useCallback(async event => {
    event.preventDefault();
    const {email,password,username} = event.target.elements;
    console.log(username.value);
    
    try {
      await firebase 
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/signuptwo");
    } catch (error){
      alert(error);
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/'+ user.uid).set({
          username: username.value,
          email: email.value,
         });

        console.log(user.uid);
      } else {

      }
    });
  }, [history] );

  return(
    <div>

      <div className="top-columns">
          <div className="c1">.</div>
          <div className="c2"></div>
          <div className="c3"></div>
          <div className="c4"></div>
      </div>

      <div className="createAccount">
        <h1 className="create-title">Create an Account</h1>
      </div>

      <br/>

      <div className="steps">
        <li className="numbone">1</li>
        <li className="ntwo">2</li> 
      </div>

      {/* <p>Enter date of birth</p>
      <input type="text" name="month" placeholder="MM"/>
      <input type="text" name="day" placeholder="DD"/>
      <input type="text" name="year" placeholder="YYYY"/> */}
      <br/> 
    <div className="signUpTwo">

      <form onSubmit={handleSignup}>

      <div className="inputs">
          <label>Email </label>
          <input type="email" name="email" className="inputField" placeholder="myemail@live.ca"/>
      </div>

      <br/>

      <div className="inputs">
          <label>Username </label>
          <input type="text" name="username" className="inputField" placeholder="userballer23"/>
      </div>

      <br/>

      <div className="inputs">
          <label>Password</label>
          <input type="password" name="password" className="inputField" placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"/> 
        </div>
          
      <button id="nextbtn" type="submit">Next</button>
      </form>
      <br/>
      <p id="login-link"><Link id="go-to-login-link" to = "/login">Already have an account?</Link></p>
      </div>

    </div>
  );
};

export default withRouter(SignUp);