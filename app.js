/* Reference: Dev Ed: Beginner Vanilla Javascript Project Tutorial
   https://www.youtube.com/watch?v=Ttf3CEsEwMQ */

const list = document.querySelector('.res-list');
const input = document.querySelector('.res-input');
const button = document.querySelector('.res-btn');

button.addEventListener('click', addItem);
list.addEventListener('click', deleteItem);

function addItem(event){
    event.preventDefault();
    const div = document.createElement("div");
    div.classList.add("item");
   
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
}

function deleteItem(event){
    const item = event.target;
    if(item.classList[0]==='delete-btn'){
        const item2 = item.parentElement;
        item2.remove();
    }

    if(item.classList[0] === 'done-btn'){
        const item2 = item.parentElement;
        item2.classList.toggle('done');
    }
}