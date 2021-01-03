var firebaseConfig = {
    apiKey: "AIzaSyCxaSUyMpvAgCgLWqeQUPsin5WLVHa4DsU",
    authDomain: "new-year-new-me-6fa3e.firebaseapp.com",
    projectId: "new-year-new-me-6fa3e",
    storageBucket: "new-year-new-me-6fa3e.appspot.com",
    messagingSenderId: "292900120557",
    appId: "1:292900120557:web:dc65c63a8d0a586d7629e4"
};
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const database = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

$('#sign-in-btn').click(function() {
    auth.signInWithPopup(provider).then(result => {
        console.log(result.user.uid);
        sessionStorage.setItem('currentUser', result.user.uid);
        if(result.additionalUserInfo.isNewUser) {
            database.collection("users").doc(result.user.uid).set({
                username: result.user.displayName
            })
        }
        location.href='tracker.html';
    }).catch(err => {
        console.error(err);
    });
});

$('.sign-out-btn').click(function() {
    auth.signOut();
    sessionStorage.removeItem('currentUser');
    location.href='index.html';
});
