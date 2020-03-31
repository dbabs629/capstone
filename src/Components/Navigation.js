import React, { Component, } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
 

 
let activityIsActive;

class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = { activityNotification: '' }
    }

    componentDidMount = () => {
         this.testAgain();
    }

    testAgain = () =>{
        this.test();
    let dot = document.getElementById("redDot")
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId +
        '/activeActivity').once('value', function (snapshot) {
            activityIsActive = snapshot.val();
            if (activityIsActive === null || activityIsActive === '' ||
                activityIsActive.length <= 0) {

                    // console.log("no activity")
                    dot.style.display = "none"

            } else {

                dot.style.display = "inline-block"


            }
        })

    }

    test = () => {
        setTimeout(() => {
            this.setState({ activityNotification: activityIsActive });
            // console.log("the state is: " + this.state.bioDetails)
          }, 300)
    }

    render() {
        return (
            <div>
                <ul className="navigationBar">

                    <li>
                        <NavLink to="/Leader" style={{ fill: "#B7B7B7" }}
                            activeStyle={{ fill: "#fed766" }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 149.88 155.06" className="leaderIcon">
                                <polygon className="cls-1" points="89.66 155.06
53.82 114.4 0 120.87 27.6 74.22 4.82 25.03 57.71 36.87 97.45 0 102.54
53.96 149.88 80.36 100.13 101.88 89.66 155.06"/>
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" style={{ fill: "#B7B7B7" }}
                            activeStyle={{ fill: "#ffa500" }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 136.67 191" className="discoverIcon">
                                <rect className="cls-1" x="21.22" y="93.38"
                                    width="71.31" height="95.08" rx="12" />
                                <ellipse className="cls-1" cx="109.93"
                                    cy="62.39" rx="26.74" ry="19.1" />
                                <rect className="cls-1" y="126.48"
                                    width="44.99" height="64.52" rx="12" />
                                <polygon className="cls-1" points="109.51 0
97.62 189.3 128.27 189.3 109.51 0"/>
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories"
                            style={{ fill: "#B7B7B7" }} activeStyle={{ fill: "#fe4a49" }}>
                            <svg viewBox="0 0 186.76 139.72"
                                className="categoriesIcon" id="test">

                                <rect className="prefix__cls-1"
                                    width={67} height={67} rx={12} />
                                <rect
                                    className="prefix__cls-1"
                                    y={72.72}
                                    width={67}
                                    height={67}
                                    rx={12}
                                />
                                <rect
                                    className="prefix__cls-1"
                                    x={73}
                                    y={1}
                                    width={67}
                                    height={67}
                                    rx={12}
                                />
                                <path
                                    className="prefix__cls-1"
                                    d="M108.9 105.84L81.42
89.3l26.93 48.67 78.41-99.47-77.86 67.34z"
                                />
                            </svg>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/profile"
                            style={{ fill: "#B7B7B7" }} activeStyle={{ fill: "#2ab7ca" }}>
                            
                            <div className="dotNotification" id="redDot">  </div>

                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="profileIcon" viewBox="0 0 121.98 166.04">
                                <rect className="cls-1" x="28.75" y="74.09"
                                    width="62.49" height="91.95" rx="12" />
                                <circle className="cls-1" cx="60.44"
                                    cy="32.58" r="32.58" />
                                <rect className="cls-1" x="14.13" y="70.75"
                                    width="17.85" height="84.85" rx="8.87" transform="matrix(0.91, 0.42, -0.42, 0.91, 49.82, 0.82)"/>
                                <rect className="cls-1" x="90.01" y="71.64"
                                    width="17.85" height="84.85" rx="8.87" transform="translate(236.71 175.85) rotate(155.09)"/>
                            </svg>
                         </NavLink>
                       
                       
                    </li>
                    
                </ul>
            </div>
        );
    }
}

export default BottomNav