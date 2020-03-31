// export default SignUp;

import React, {useCallback} from 'react';
import {withRouter } from "react-router";
import firebase from "./Firebase/firebase";

const ForgotPassword = () => {

  return(
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={sendLink}>

        <label>Email <input type="email" name="email" placeholder="email"/> </label>
        <button type="submit">Send Link</button>
      </form>
    </div>
  );

};

export default withRouter(ForgotPassword);