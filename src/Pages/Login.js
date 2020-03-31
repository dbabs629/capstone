import React, {useCallback, useContext} from "react";
import { withRouter, Redirect} from "react-router";
import {Link} from 'react-router-dom';
import firebase from "../Firebase/firebase";
import { AuthContext } from "../Auth";

const Login =  ({history}) => {
    const handleLogin = useCallback(async event => {
      event.preventDefault();
      const {email,password} = event.target.elements;
      try {
        await firebase 
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
      } catch (error){
        alert(error);
      }
    }, [history] );

const { currentUser } = useContext(AuthContext);
if (currentUser){
    return <Redirect to="/" />;
}
return(
  <div className="login">

  <div className="top-columns">

    <div className="c1">.</div>
    <div className="c2"></div>
    <div className="c3"></div>
    <div className="c4"></div>

  </div>

    <div className="titleName">
      <h1 className="project-title">we explore</h1>
    </div>

  <div className="imagebk">
    <div className="transbox"> 
   
      <div className="positionedContent">

          <form onSubmit={handleLogin}>

    
        <div className="inputs">
          <label>Email </label>
          <input type="email" name="email" className="inputField" placeholder="myemail@live.ca"/>
          </div>

           <br/>

        <div className="inputs">
          <label>Password</label>
          <input type="password" name="password" className="inputField" placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"/> 
        </div>

          <br/>
          <button id="loginbtn" type="submit">Login</button>
 
          </form>

       </div> 

      <p id="create-acc-link"><Link id="create-account-link" to = "/signup">Create Account</Link></p>

      </div>
      
 </div>

</div>
  )
}

export default withRouter(Login);