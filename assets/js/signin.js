var firebaseConfig = {
    apiKey: "AIzaSyCxaSUyMpvAgCgLWqeQUPsin5WLVHa4DsU",
    authDomain: "new-year-new-me-6fa3e.firebaseapp.com",
    projectId: "new-year-new-me-6fa3e",
    storageBucket: "new-year-new-me-6fa3e.appspot.com",
    messagingSenderId: "292900120557",
    appId: "1:292900120557:web:dc65c63a8d0a586d7629e4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();


$('#sign-in-btn').click(function() {
    auth.signInWithPopup(provider).then(result => {
        console.log(result.user.uid);
        if(result.additionalUserInfo.isNewUser) {
            db.collection("users").doc(result.user.uid).set({
                username: result.user.displayName
            })
        }
    }).catch(err => {
        console.error(err);
    });
});
