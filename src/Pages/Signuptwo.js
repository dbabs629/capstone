import React, { useCallback} from 'react';
import { withRouter} from "react-router";
import firebase from "../Firebase/firebase";
import Upload from '../Components/Upload';
 
const SignUpTwo = ({ history }) => {
  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const { biodetails } = event.target.elements;
    console.log(biodetails.value);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref('users/' + user.uid).update({
          biodetails: biodetails.value,
          activeActivity: ''
        });
        console.log(user.uid);
      } else {
    
      }
    
    });
    history.push("/");
  }, [history]);

  

  return (
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

       
      <div className="content2">
        <div className="steps2">
          <li className="numbone2">1</li>
          <li className="ntwo2">2</li> 
        </div>

      <Upload></Upload>
      <p><small>upload your picture</small></p>
      <br/>
      <p>Tell us about yourself!</p>

      <form onSubmit={handleSubmit}>
          {/* <p style={{fontSize: '9pt'}}><i> * should not be longer than 80 characters *</i></p> */}
          <textarea className="text-description" name="biodetails" type="textarea" placeholder="Write here.."/>
          <br/>
          <input  id="nextbtn" type="submit" value="Submit" Link to= "/"/>
      </form>
      {/*<button><Link to="/">Done</Link></button>*/}
      </div>

    </div>
  );
};
export default withRouter(SignUpTwo);