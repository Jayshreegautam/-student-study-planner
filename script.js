let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){

let taskInput=document.getElementById("taskInput").value;
let subjectInput=document.getElementById("subjectInput").value;
let dateInput=document.getElementById("dateInput").value;
let priorityInput=document.getElementById("priorityInput").value;

if(taskInput==="") return;

let task={
text:taskInput,
subject:subjectInput,
date:dateInput,
priority:priorityInput,
completed:false
};

tasks.push(task);

localStorage.setItem("tasks",JSON.stringify(tasks));

document.getElementById("taskInput").value="";
document.getElementById("subjectInput").value="";
document.getElementById("dateInput").value="";

showTasks();
updateSubjects();

}

function showTasks(){

let taskList=document.getElementById("taskList");
taskList.innerHTML="";

tasks.forEach((task,index)=>{

let li=document.createElement("li");

if(task.completed) li.classList.add("completed");

li.innerHTML=`

<div>
<b>${task.text}</b>  
(${task.subject}) - ${task.date}  
<span class="priority-${task.priority.toLowerCase()}">${task.priority}</span>
</div>

<div>
<button onclick="completeTask(${index})">✔</button>
<button onclick="deleteTask(${index})">❌</button>
</div>

`;

taskList.appendChild(li);

});

updateProgress();

}

function completeTask(index){

tasks[index].completed=!tasks[index].completed;

localStorage.setItem("tasks",JSON.stringify(tasks));

showTasks();

}

function deleteTask(index){

tasks.splice(index,1);

localStorage.setItem("tasks",JSON.stringify(tasks));

showTasks();
updateSubjects();

}

function updateProgress(){

let completed=tasks.filter(t=>t.completed).length;

let percent=tasks.length ? (completed/tasks.length)*100 : 0;

document.getElementById("progressFill").style.width=percent+"%";

document.getElementById("progressText").innerText=Math.round(percent)+"% Completed";

}

function updateSubjects(){

let filter=document.getElementById("subjectFilter");

let subjects=[...new Set(tasks.map(t=>t.subject))];

filter.innerHTML='<option value="all">All Subjects</option>';

subjects.forEach(sub=>{

let option=document.createElement("option");

option.value=sub;
option.textContent=sub;

filter.appendChild(option);

});

}

function filterTasks(){

let filter=document.getElementById("subjectFilter").value;

let taskList=document.getElementById("taskList");

taskList.innerHTML="";

tasks.forEach((task,index)=>{

if(filter==="all" || task.subject===filter){

let li=document.createElement("li");

if(task.completed) li.classList.add("completed");

li.innerHTML=`

<div>
<b>${task.text}</b>  
(${task.subject}) - ${task.date}  
<span class="priority-${task.priority.toLowerCase()}">${task.priority}</span>
</div>

<div>
<button onclick="completeTask(${index})">✔</button>
<button onclick="deleteTask(${index})">❌</button>
</div>

`;

taskList.appendChild(li);

}

});

}

showTasks();
updateSubjects();


// TIMER

let time=1500;
let timer;

function startTimer(){

timer=setInterval(()=>{

let minutes=Math.floor(time/60);
let seconds=time%60;

document.getElementById("time").innerText=
minutes+":"+(seconds<10?"0":"")+seconds;

time--;

if(time<0){

clearInterval(timer);
alert("Study Session Complete!");

}

},1000);

}

function resetTimer(){

clearInterval(timer);
time=1500;
document.getElementById("time").innerText="25:00";

}