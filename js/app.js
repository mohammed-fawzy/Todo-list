let taskInput = document.getElementById('taskInput'); // the input
let liveText = document.getElementById('liveText'); // the live text
let allTasks = document.querySelector('#allTasks'); // the ul
var inputId = 0;
let todayDate = new Date().toISOString().split('T')[0];


let savedLocalData = localStorage.getItem('allTasks'); // get local storage data

// let taskDate = new Date ().toJSON().slice(0,10).replace(/-/g,'/');

function getTaskDate () {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var hours = today.getHours()
    var AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;

    var time = hours + ":" + today.getMinutes() + ":" + today.getSeconds() + " " + AmOrPm;
    var taskDate = date + ' ' + time;
    return taskDate ;
}



function inputValue (thisInputId) {
    if ( localStorage.getItem(thisInputId) === null ) { 
        //document.getElementById(thisInputId).value = taskInput.value ;
        return taskInput.value;
    }
    else {
        document.getElementById(thisInputId).value = localStorage.getItem(thisInputId) ;
        return localStorage.getItem(thisInputId);
    }
}



function saveToStorage () {
    localStorage.setItem('allTasks', allTasks.innerHTML); // save data
}
if (savedLocalData) { // save all html data
    allTasks.innerHTML = savedLocalData; // insert the saved data to the html
}



 function lastIdFun () { // last id or id 0 ;
    if ( allTasks.firstElementChild ) {
        var lastTaskId = document.querySelector('#allTasks').lastElementChild.firstElementChild.firstElementChild.id;
        return  parseInt(lastTaskId);
    }
    return inputId;
}

taskInput.addEventListener('keyup', function() {
    liveText.innerText = taskInput.value ;
    
    if (event.keyCode === 13 && taskInput.value != "" ) { // If enter pressed
        thisInputId = lastIdFun();
        thisInputId++;
        let  TaskText = taskInput.value;
        const liElement = `
        <li class="list-group-item">
            <div class="task-info">
                <input type="text "id="${thisInputId}" 
                value="${inputValue(thisInputId)}" 
                class="form-control task-text-value" disabled>
                
                <button onClick="deleteFunction()" class="btn btn-danger delete-btn">X</button>
                <div class="edit-select-div">
                    <select class="custom-select custom-select-sm" onchange="selectFunction(event)">
                        <option value="1">Incomplete</option>
                        <option value="2">Complete </option>
                    </select>
                    <button onClick="editFunction()" class="btn btn-secondary edit-btn">Edit</button>
                </div>
                <p class="task-date">${getTaskDate()}</p>
            </div>
            <div class="bottom-info">
                <div class="form-group form-end-data"> 
                    <label>The task end in</label>
                    <input id="endDate" type="date" name="endDateday" class="form-control" min="${todayDate}" onchange="endTimeFun(this, getTaskDate)">
                </div>
                <p class="d-none">You have <span id="timeLeft"></span> days left</p>
            </div>
        </li>`;
        allTasks.insertAdjacentHTML( 'beforeend', liElement )
        taskInput.value = "";   
        liveText.innerText = "";
        saveToStorage() // save data
    }
})

let allTaskInput =  Array.from(document.querySelectorAll('.list-group .task-text-value'));

function deleteFunction ()  {
    event.target.parentNode.parentNode.remove();
    localStorage.removeItem(event.target.parentNode.firstElementChild.id);
    saveToStorage() // save data
}

function selectFunction () {
    var selectElement = event.target;
    var value = selectElement.value;
    if (value == 2) {
        event.target.parentNode.parentNode.firstElementChild.classList.add('doneClass');
    }
    else if (value == 1){
        event.target.parentNode.parentNode.firstElementChild.classList.remove('doneClass');
    }
    saveToStorage() // save data
}

function editFunction () {
    if ( event.target.innerText === "Edit" ) {
        event.target.parentNode.parentNode.firstElementChild.removeAttribute("disabled");
        event.target.innerText = "Save" ;
    }
    else {
        event.target.parentNode.parentNode.firstElementChild.setAttribute("disabled", "disabled");
        event.target.innerText = "Edit" ;
        // saveInputValue(, );
        localStorage.setItem(event.target.parentNode.parentNode.firstElementChild.id, event.target.parentNode.parentNode.firstElementChild.value); // set data to input
    }
}


//loop thru all item and add the data from local storge 
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < allTaskInput.length; i++) {
        if (localStorage.getItem(allTaskInput[i].id) != null) {
            allTaskInput[i].value = localStorage.getItem(allTaskInput[i].id);
        }
    }
  });


  //end time
function endTimeFun (object,taskDate) {
    let result = taskDate();
    result  = result.substring(0,10).split('-')
    result  = result[0] + '-' + result[1] + '-' + result[2]

    const date1 = new Date(result);
    const date2 = new Date(object.value);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(object.parentNode.parentNode.querySelector('#timeLeft').innerText = diffDays );
    object.parentNode.parentNode.querySelector('#timeLeft').parentNode.classList.add('d-block')
    object.parentNode.parentNode.querySelector('#timeLeft').innerText = diffDays 
}


