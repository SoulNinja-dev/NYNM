const currentUserID = sessionStorage.getItem('currentUser');
// Redirect to login page if no user is logged in
if(!currentUserID) {
    location.href='login.html';
}

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
const db = firebase.firestore();

/* Reference: Dev Ed: Beginner Vanilla Javascript Project Tutorial
   https://www.youtube.com/watch?v=Ttf3CEsEwMQ */

db.collection("users").doc(currentUserID).collection('tasks').get().then(tasks => {
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("item");
        if(task.data().completed) {
            div.classList.add("done");
        }
        const newItem = document.createElement("li");
        newItem.innerText= task.data().name;
        newItem.classList.add("item-do");
        div.appendChild(newItem);

        const done = document.createElement("button");
        done.innerHTML = '<i class="fas fa-check"></i>';
        done.classList.add("done-btn");
        div.appendChild(done);
        
        const deleted = document.createElement("button");
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn");
        div.appendChild(deleted);

        list.appendChild(div);
    })
    $('.spinner').addClass('hide');
}).catch(error => {
    console.error(error);
    $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Something went wrong while getting tasks<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    $('.spinner').addClass('hide');
});

   const list = document.querySelector('.res-list');
const input = document.querySelector('.res-input');
const button = document.querySelector('.res-btn');

button.addEventListener('click', addItem);
list.addEventListener('click', deleteItem);

function addItem(event){
    event.preventDefault();
    if(input.value) {
        const div = document.createElement("div");
        div.classList.add("item");

        db.collection("users").doc(currentUserID).collection('tasks').doc(input.value).set({
            name: input.value,
            completed: false
        }).then(result => {
            const newItem = document.createElement("li");
            newItem.innerText= input.value;
            newItem.classList.add("item-do");
            div.appendChild(newItem);

            const done = document.createElement("button");
            done.innerHTML = '<i class="fas fa-check"></i>';
            done.classList.add("done-btn");
            div.appendChild(done);
            
            const deleted = document.createElement("button");
            deleted.innerHTML = '<i class="fas fa-trash"></i>';
            deleted.classList.add("delete-btn");
            div.appendChild(deleted);

            list.appendChild(div);

            input.value = "";
        }).catch(error => {
            console.error(error);
            $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Something went wrong while adding task<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
        });
    } else {
        $('.alert-container').append('<div class="alert alert-warning alert-dismissible fade show" role="alert">Cannot add empty task<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    }
    
   
    
}

function deleteItem(event){
    const item = event.target;
    if(item.classList[0]==='delete-btn'){
        db.collection("users").doc(currentUserID).collection('tasks').doc(item.parentElement.innerText).delete().then(result => {
            const item2 = item.parentElement;
            item2.remove();
        }).catch(error => {
            console.error(error);
            $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Something went wrong while deleting task<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')

        })
    }

    if(item.classList[0] === 'done-btn'){
        $('.spinner').removeClass('hide');
        db.collection("users").doc(currentUserID).collection('tasks').doc(item.parentElement.innerText).get().then(taskDoc => {
            if(taskDoc.exists) {
                db.collection("users").doc(currentUserID).collection('tasks').doc(item.parentElement.innerText).update({
                    completed: !taskDoc.data().completed
                }, { merge: true }).then(result => {
                    const item2 = item.parentElement;
                    item2.classList.toggle('done');
                    $('.spinner').addClass('hide');
                }).catch(updateError => {
                    $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Something went wrong while updating task<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                    console.error(updateError);
                    $('.spinner').addClass('hide');
                });
            } else {
                $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Task does not exist in the database<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                console.error("Task does not exist in the database")
                $('.spinner').addClass('hide');
            }
        }).catch(error => {
            $('.alert-container').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Something went wrong while updating task<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            console.error(error);
            $('.spinner').addClass('hide');
        })
        
    }
}