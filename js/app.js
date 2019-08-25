let taskInput = document.getElementById('taskInput'); // the input
let liveText = document.getElementById('liveText'); // the live text
let allTasks = document.querySelector('#allTasks'); // the ul
let taskDate = new Date ().toJSON().slice(0,10).replace(/-/g,'/');
let savedLocalData = localStorage.getItem('allTasks'); // get local storage data
if (savedLocalData) {
    allTasks.innerHTML = savedLocalData; // insert the saved data to the html
}
taskInput.addEventListener('keyup', function() {
    liveText.innerText = taskInput.value ;
    let  TaskText = taskInput.value;
    const liElement = `
    <li class="list-group-item">
        <div class="task-info">
            <span>${TaskText}</span>
            <button onClick="deleteFunction()" class="btn btn-danger delete-btn">X</button>
            <p class="task-date">${taskDate}</p>
        </div>
        <div>
            <select class="custom-select custom-select-sm" onchange="selectFunction(event)">
                <option selected>Select</option>
                <option value="1">Done</option>
                <option value="2">In Progress</option>
            </select>
        </div>
    </li>
    `;
    
    if (event.keyCode === 13 && taskInput.value != "" ) { // If enter pressed
        allTasks.insertAdjacentHTML( 'beforeend', liElement )
        taskInput.value = "";   
        liveText.innerText = ""       ;
        saveToStorage() // save data
    }
})

function saveToStorage () {
    localStorage.setItem('allTasks', allTasks.innerHTML); // save data
}

function deleteFunction ()  {
    event.target.parentNode.parentNode.remove();
    saveToStorage() // save data
}

function selectFunction () {
    var selectElement = event.target;
    var value = selectElement.value;
    
    if (value == 1) {
        event.target.parentNode.previousElementSibling.classList.add('doneClass');
    }
    else if (value == 2){
        event.target.parentNode.previousElementSibling.classList.remove('doneClass');
    }
    saveToStorage() // save data
}