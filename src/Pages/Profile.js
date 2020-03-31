import React, { Component } from 'react';
import firebase from 'firebase';
import BottomNav from '../Components/Navigation';
import ActiveModal from '../Components/ActiveModal';

import Logo from '../assets/WeExplore-logo.svg';

let information;
let imageUrL;
let name;

let array = [];


class Profile extends Component {

  constructor(props) {

    super(props);
    this.state = { bioDetails: '...', image: '', userName: "..." }
  }


  componentDidMount() {
    this.getData();
    this.run2();
  }

  getData = () => {

    this.getInfo();

    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' +
      userId).once('value').then(function (snapshot) {
        information = snapshot.val().biodetails || 'Anonymous';
        imageUrL = snapshot.val().profileImage
        name = snapshot.val().username
      })

  }

  getInfo = () => {
    setTimeout(() => {
      this.setState({
        bioDetails: information,
        image: imageUrL,
        userName: name,
      });

    }, 300)

  }


  run2 = () => {
    // watch this
    // https://www.youtube.com/watch?v=6Q55NlRwNnw&list=LLUlUvJCUCF1oZHvSGERhR4A&index=5&t=666s 
    // 6:46

    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/allposts/' + userId + '/userposts/').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var postObject = childSnapshot.val();
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

      });

    });

  }


  render() {
    return (
      <div>
        <div className="header" style={{ backgroundColor: '#2ab7ca' }}>
          <img id="logo" src={Logo} width="65" alt="WeExplore Logo" />
          <h1>| MyPage</h1>
        </div>

        <div className="content">

          {/* Profile Header Information - Picture, Username,Biography */}
          <div className="profileInformation">

            <img className="image2 profileImg" id="myimg"
              src={this.state.image} />
            <div className="bio-name">
              <h3>{this.state.userName}</h3>
              <p>{this.state.bioDetails}</p>
            </div>
          </div>

          {/* Users Posts will be shown in here */}
          <div id="usercontent" className="posts">




          </div>

          <ActiveModal></ActiveModal>



        </div>
        <div>

        </div>
        <BottomNav></BottomNav>

      </div>
    );
  }




}

export default Profile;