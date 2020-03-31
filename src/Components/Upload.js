// HOW TO UPLOAD TO STORAGE 
//https://www.youtube.com/watch?v=4ZCy1AK7x4I
// https://firebase.google.com/docs/storage/web/start?authuser=0
import firebase from '../Firebase/firebase';
import React, { Component } from 'react';

let selectedFile;

class Upload extends Component {

    fileSelected = (event) => {
        //file name
        selectedFile = event.target.files[0]
        console.log(selectedFile.name)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                console.log(user.uid);
                let filename = selectedFile.name;
                const storageRef = firebase.storage().ref(user.uid + '/profileImage/' + filename)
                const uploadTask = storageRef.put(selectedFile)
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    storageRef.getDownloadURL().then(url => {
                        firebase.database().ref('users/' + user.uid).update({
                            profileImage: url
                        });
                        var img = document.getElementById('myimg');
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

    render() {
        return (
            <div className="uploading">
                <input type="file" id="file2" onChange={this.fileSelected}></input>
                <img className="image" id="myimg" />
            </div>
        )
    }
}
export default Upload; 