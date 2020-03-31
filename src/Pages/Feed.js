import React, { Component } from "react";
import { withRouter } from "react-router";
// import firebase from "./Firebase/firebase";
import firebase from 'firebase';


// Components 
import BottomNav from '../Components/Navigation';
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        //   console.log(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});

class Feed extends Component {
    componentDidMount() {
        this.run2();
    }

    run2 = () => {
        console.log("get Array data clicked");
        firebase.database().ref('/allposts/').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (getSnapshot) {
                    getSnapshot.forEach(function (postSnapshot) {
                        var postObject = postSnapshot.val()
                        console.log(postObject);
                        var userPref = postObject.private;
                        if (userPref === false) {
                        var currentPosts;
                        currentPosts = document.createElement("div");
                        currentPosts.classList.add("postCards");
                        document.getElementById("usercontent").prepend(currentPosts);
                        var profileImage = document.createElement("img");
                        profileImage.src = postObject.profileImg;
                        var user = document.createElement("h3");
                        user.innerHTML = postObject.username;
                        var image = document.createElement("img");
                        image.src = postObject.postImage;
                        var caption = document.createElement("p");
                        caption.innerHTML = postObject.userCaption;
                        currentPosts.appendChild(profileImage);
                        currentPosts.appendChild(user);
                        currentPosts.appendChild(image);
                        currentPosts.appendChild(caption);
                        } else {
                            console.log('private');
                        }
                    });
                });
            });

        });
    }

    render() {
        return (
            <div>
                <h1>Feed</h1>
                <button onClick={() => firebase.auth().signOut()}> Sign Out </button>
                <div id="usercontent" className="posts"></div>
                <BottomNav></BottomNav>
            </div>
        )
    }
}
export default withRouter(Feed);