// import firebase from '../Firebase/firebase';
import React, { Component } from 'react';
import firebase from 'firebase';

import Logo from '../assets/WeExplore-logo.svg';
import Error from '../assets/error.svg';

import BottomNav from '../Components/Navigation';

let activityDescription;

let categoryTitle;
let array = [];
let currentActivity;

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = { activity: '' }
    }

    // DISPLAY MODAL & SHOW ACTIVITY 
    category = (event) => {
        let activityDescription;
        console.log("click")
        let modal = document.getElementById("modal")
        modal.style.display = "block";

        this.activities();

        var database = firebase.database();

        if (event.target.className === 'outdoors') {

            // console.log("outdoors clicked");

            categoryTitle = "Outdoors";

            array = [];
             // eslint-disable-next-line
            database.ref('categories/' + 'outdoors').on('value', function (snapshot) {
                array = snapshot.val();
                let randomNumber = Math.floor(Math.random() * array.length);
                activityDescription = array[randomNumber].description;
            });


        } else if (event.target.className === 'social') {

            // console.log('social was clicked');
            categoryTitle = "Friends";

            array = [];
             // eslint-disable-next-line
            database.ref('categories/' + 'friends').on('value', function (snapshot) {
                array = snapshot.val();
                let randomNumber = Math.floor(Math.random() * array.length);
                activityDescription = array[randomNumber].description;
            });

        } else if (event.target.className === 'bodyculture') {

            categoryTitle = "Body & Mind";

            array = [];
             // eslint-disable-next-line
            database.ref('categories/' + 'bodyculture').on('value', function (snapshot) {
                array = snapshot.val();
                let randomNumber = Math.floor(Math.random() * array.length);
                activityDescription = array[randomNumber].description;
            });
        } else if (event.target.className === 'culture') {

            categoryTitle = "Culture";

            array = [];
             // eslint-disable-next-line
            database.ref('categories/' + 'culture').on('value', function (snapshot) {
                 array = snapshot.val();
                let randomNumber = Math.floor(Math.random() * array.length);
                activityDescription = array[randomNumber].description;
            });
        }

        this.setState({ activity: activityDescription });
        console.log(this.state.activity)
    }

    // Set the state of activity to whatever t
    activities = () => {
        this.setState({ activity: activityDescription });
    }

    randomize = () => {
        console.log("click")
        let randomNumber = Math.floor(Math.random() * array.length);
        activityDescription = array[randomNumber].description;
        console.log(activityDescription)
        this.setState({ activity: activityDescription });
    }

    // close modal
    closeModal = () => {
        let modal = document.getElementById("modal")
        let errmodal = document.getElementById("errorModal")

        modal.style.display = "none";
        errmodal.style.display = "none";
    }

    acceptActivity = function () {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId +
            '/activeActivity').once('value', function (snapshot) {
                currentActivity = snapshot.val();
                if (currentActivity === null || currentActivity === ' ' ||
                    currentActivity.length <= 0) {
                    firebase.database().ref('users/' + userId).update({
                        activeActivity: activityDescription

                    });
                    console.log('the activeActivity changed');
                    let modal = document.getElementById("modal")
                    modal.style.display = "none";
                    console.log('Activity added to Firebase: ' +
                        currentActivity + ' ' + currentActivity.length);

                        window.location.reload(false);

                } else {

                    let modal = document.getElementById("modal")
                    modal.style.display = "none";
                    let errmodal = document.getElementById("errorModal")
                    errmodal.style.display = "block";
                    console.log("You have an activity");
                    console.log(currentActivity);


                }
            })        
            // window.location.assign("https://www.w3schools.com")
        }



    render() {
        return (
            <div>
                <div className="header" style={{ backgroundColor: '#fe4a49' }}>
                    <img id="logo" src={Logo} width="65" alt="WeExplore Logo" />
                    <h1>| Activities</h1>
                </div>


                <div className="content">

                    <div className="categorydiv">
                        <p style={{ backgroundColor: 'green' }} className="categoryTitleBlock">Outdoors</p>
                        <img className="outdoors" alt="outdoors background" src="https://images.unsplash.com/photo-1445217143695-467124038776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1133&q=80" onClick={this.category}></img>
                    </div>

                    <br />

                    <div className="categorydiv">
                        <p style={{ backgroundColor: 'tomato' }} className="categoryTitleBlock">Friends</p>
                        <img className="social" alt="social background" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" onClick={this.category}></img>
                    </div>

                    <br />

                    <div className="categorydiv">
                        <p style={{ backgroundColor: 'navy' }} className="categoryTitleBlock">Body & Mind</p>
                        <img className="bodyculture" alt="body and mind background" src="https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" onClick={this.category}></img>
                    </div>

                    <br />

                    <div className="categorydiv">
                        <p style={{ backgroundColor: 'purple' }} className="categoryTitleBlock"> Culture</p>
                        <img className="culture" alt="culture background" src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1115&q=80" onClick={this.category}></img>
                    </div>

                </div>






                <div className="modal-class" id="modal">

                    <div className="close" onClick={this.closeModal}>&times; </div>

                    <div className="modal-content">

                        <h2 className="categoryTitle">{categoryTitle}</h2>
                        <p><i>Activity: </i>{this.state.activity}</p>
                    </div>

                    <div className="buttons">
                        <button className="acceptbtn" onClick={this.acceptActivity}>Accept</button>
                        <button className="shufflebtn" onClick={this.randomize}>

                        </button>

                    </div>

                </div>


                <div className="modal-class" id="errorModal">

                    <div className="close" onClick={this.closeModal}>&times; </div>

                    <div className="modal-content">

                        <img src={Error} alt="error" height="50"></img>
                        <p>Sorry you must complete your chosen activity before starting a new one.</p>
                    </div>

                </div>




                <BottomNav></BottomNav>

            </div>

        )
    }

}

export default Categories