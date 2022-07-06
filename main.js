// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyARM-_wqVSKOLIq7-3BSAYiihh1T_rc1l4",
	authDomain: "todo-list-crud-2bc35.firebaseapp.com",
	databaseURL: "https://todo-list-crud-2bc35-default-rtdb.firebaseio.com",
	projectId: "todo-list-crud-2bc35",
	storageBucket: "todo-list-crud-2bc35.appspot.com",
	messagingSenderId: "486378149605",
	appId: "1:486378149605:web:6555abf82d4f135e15a60c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

// User Inputs
let userInput = document.querySelector("#task-name");
let addButton = document.querySelector("#add-task");
let tasksDiv = document.querySelector(".tasks");

// Focus On Input
window.onload = () => {
	userInput.focus();
};

// Tasks Array
let tasksArr = [];

addButton.addEventListener("click", () => {
	// Validate User Input
	if (userInput.value.trim() !== "") {
		// Use Add Tasks Function
		addTaskToTasks(userInput.value.trim());
		// Clear Input
		userInput.value = "";
		// Focus On Input
		userInput.focus();
	} else {
		userInput.focus();
	}
});

function addTaskToTasks(userTask) {
	// Create Task Object
	const task = {
		taskId: Date.now(),
		taskName: userTask,
		completed: false,
	};
	// Add Task Object To DB
	db.ref('tasks/' + `task${task.taskId}`).set({
		taskId: task.taskId,
		taskName: task.taskName,
		completed: task.completed,
	});
}

let tasksRef = db.ref('/tasks');

tasksRef.on('child_added', (data) => {
	// Add Task Object To Array
	tasksArr.push(data.val());
	// Add Task To Document
	createTaskElement(tasksArr);
});

function createTaskElement(tasksArr) {
	// Clear Tasks div
	tasksDiv.innerHTML = "";
	tasksArr.forEach((e) => {
		if (e.completed === false) {
			// Create Task Div
			let taskDiv = document.createElement("div");
			tasksDiv.append(taskDiv);
			taskDiv.classList.add("task");
			taskDiv.setAttribute("data-id", e.taskId);
			// Create Task p
			let taskName = document.createElement("p");
			taskDiv.append(taskName);
			taskName.textContent = e.taskName;
			// Make Tasks div display flex when not Empty
			if (tasksDiv.children.length !== 0) {
				tasksDiv.style.display = "flex";
			}
		}
	});
}