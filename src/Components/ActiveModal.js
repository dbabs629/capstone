import React, { Component } from 'react';
import firebase from 'firebase';

let currentActivity;
let activityIsActive;
let username;
let caption;
let userImg;
let selectedFile;
let newPostKey = firebase.database().ref().child('posts').push().key;


class ActiveModal extends Component {

  constructor(props) {
    super(props);
    this.state = { activity: '', inputValue: '', username: '', userImg: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.ShowModal();
  }

  ShowModal = () => {

    let profileModal = document.getElementById("thisisatest")
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId +
      '/activeActivity').once('value', function (snapshot) {
        activityIsActive = snapshot.val();
        if (activityIsActive === null || activityIsActive === '' ||
          activityIsActive.length <= 0) {
          // console.log("no activity")
          profileModal.style.display = "none"

        } else {
          profileModal.style.display = "block"
        }
      })

  }

  getData = () => {
    this.getActivity();
    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' +
      userId).once('value').then(function (snapshot) {
        currentActivity = snapshot.val().activeActivity;
        username = snapshot.val().username;
        userImg = snapshot.val().profileImage;
      })
  }

  getActivity = () => {
    setTimeout(() => {
      this.setState({
        activity: currentActivity,
        username: username,
        userImg: userImg
      });
    }, 300)
  }

  activityModal = () => {
    let modal = document.getElementById("modal")
    modal.style.display = "block";
  }

  closeModal = () => {
    let modal = document.getElementById("modal")
    modal.style.display = "none";
  }

  DeleteActivity() {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId +
      '/activeActivity').once('value', function (snapshot) {
        currentActivity = snapshot.val();
        firebase.database().ref('users/' + userId).update({
          activeActivity: ''
        });
        window.location.reload(false);
      })
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  };

  fileSelected = (event) => {
    //file name
    selectedFile = event.target.files[0]
    console.log(selectedFile.name)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let filename = selectedFile.name;
        const storageRef = firebase.storage().ref(user.uid +
          '/postImage/' + filename)
        const uploadTask = storageRef.put(selectedFile)
        uploadTask.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred /
            snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function (error) {
          // Handle unsuccessful uploads
        }, function () {
          storageRef.getDownloadURL().then(url => {
            firebase.database().ref('allposts/' + user.uid + '/userposts/' + newPostKey).update({
              postImage: url,
            });
            var img = document.getElementById('postImg');
            img.src = url;
            })
          },
        );
        // ADD EXTRA FUNCTION HERE
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  postData = (e) => {
    let userId = firebase.auth().currentUser.uid;
    let checkbox = document.getElementById('checkbox')
    caption = this.state.inputValue;

    if (caption === undefined || caption === null || caption === "" ||
      caption.length <= 0 || selectedFile === null || selectedFile ===
      undefined) {
      e.preventDefault();
      console.log("stopped");
    } else {
      firebase.database().ref('allposts/' + userId + '/userposts/' +
        newPostKey).update({
          userCaption: caption,
          username: username,
          profileImg: userImg
        });
    }


    if (checkbox.checked == false) {
      console.log("public")
      firebase.database().ref('allposts/' + userId + '/userposts/' +
        newPostKey).update({
          private: false
        });

    } else {
      console.log('Private')
      firebase.database().ref('allposts/' + userId + '/userposts/' +
        newPostKey).update({
          private: true
        });
    }

    this.DeleteActivity()
  }

  render() {
    return (
      <div>
        <button className="profileModal" id="thisisatest"
          onClick={this.activityModal}><b>Your Activity</b></button>
        <div className="modal-class" id="modal">
          <div className="close" onClick={this.closeModal}>&times; </div>
          <div className="modal-content">
            <p>Your Activity: <b>{this.state.activity}</b></p>
          </div>

          <form onSubmit={this.postData}>
            <div className="modal-post">
              <p id="space">Complete your activity by documenting your experience.</p>

              <img className="usersPostImg" id="postImg"></img>
              <input type="file" id="file" onChange={this.fileSelected}></input>
              <textarea value={this.state.value}
                onChange={this.handleChange} name="caption" required
                className="textarea-post" style={{ padding: '15px' }} placeholder="write your caption here"></textarea>

              {/* Maybe use onchange?  */}
              <label className="private-checkbox"><input
                id="checkbox" type="checkbox"></input>Keep Private</label>
            </div>

            <div className="post-buttons">
              <button className="delete-activitybtn"
                onClick={this.DeleteActivity}>Delete this activity</button>
              <button className="completebtn" type="submit">Done</button>
            </div>
          </form>
        </div>

      </div>

    );
  }

}

export default ActiveModal;