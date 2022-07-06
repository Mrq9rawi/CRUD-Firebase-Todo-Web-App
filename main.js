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
	// Add Task Object To Array
	tasksArr.push(task);
	// Add Task To Document
	createTaskElement(tasksArr);
}

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