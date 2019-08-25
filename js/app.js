let taskInput = document.getElementById('taskInput'); // the input
let liveText = document.getElementById('liveText'); // the live text
let allTasks = document.querySelector('#allTasks'); // the ul
let getLocalData = localStorage.getItem('allTasks'); // get local storage data

allTasks.innerHTML = getLocalData; // insert the saved data to the html
taskInput.addEventListener('keyup', function() {
    liveText.innerText = taskInput.value ;
    let  TaskText = taskInput.value;
    const liElement = `
    <li class="list-group-item">
        ${TaskText} 
        <button onClick="deleteFunction()" class="btn btn-danger delete-btn">X</button>
    </li>`;
    
    if (event.keyCode === 13 && taskInput.value != "" ) { // If enter pressed
        allTasks.insertAdjacentHTML( 'beforeend', liElement )
        taskInput.value = "";          
        localStorage.setItem('allTasks', allTasks.innerHTML); // save data
    }
})

function deleteFunction ()  {
    event.target.parentNode.remove();
    localStorage.setItem('allTasks', allTasks.innerHTML);
}
