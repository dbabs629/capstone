import React from "react";
import { withRouter} from "react-router";
// import firebase from "./Firebase/firebase";
 
// Components 
import BottomNav from '../Components/Navigation';

import Logo from '../assets/WeExplore-logo.svg';

 
const Leader = () => {

    return(
        <div>

            <div className="header" style={{backgroundColor: '#fed766'}}>
                    <img id="logo" src={Logo} width="65" alt="WeExplore Logo" />
                    <h1>| LeaderBoard</h1>
            </div>
             
            
            <div className="notfeatured">
                <p style = {{fontSize: '16pt'}}>Sorry not available yet:(</p>
                <p><b>But will be soon!!!</b></p>
            </div>

          
             
             <BottomNav></BottomNav>
        </div>
    )
}

export default withRouter(Leader);