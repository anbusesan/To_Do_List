document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("inputField");
    const addToDoButton = document.getElementById("addToDo");
    const toDoContainer = document.getElementById("toDoContainer");

    // Fireworks & Celebration Screen
    const fireworksContainer = document.createElement("div");
    fireworksContainer.classList.add("fireworks-container");
    document.body.appendChild(fireworksContainer);

    // Celebration Full-Screen Effect
    const celebrationScreen = document.createElement("div");
    celebrationScreen.id = "celebration-screen";
    celebrationScreen.innerHTML = '<h1 class="celebration-text">🎉 YOU DID IT! 🎉</h1>';
    document.body.appendChild(celebrationScreen);

    // Create an alert div for empty input
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert", "text-danger", "mt-2");
    alertMessage.innerText = "Please enter a task!";
    alertMessage.style.display = "none"; // Hidden by default
    inputField.parentElement.appendChild(alertMessage);

    addToDoButton.addEventListener("click", addItem);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });

    function addItem() {
        const taskText = inputField.value.trim();
        
        if (taskText === "") {
            alertMessage.style.display = "block"; // Show alert
            return;
        }
        
        alertMessage.style.display = "none"; // Hide alert if valid input

        // Create new task item
        const taskItem = document.createElement("div");
        taskItem.classList.add("item", "d-flex", "justify-content-between", "align-items-center", "p-2", "border", "rounded", "mb-2");

        // Create task text element (span)
        const taskSpan = document.createElement("span");
        taskSpan.innerText = taskText;
        taskSpan.classList.add("task-text", "flex-grow-1");

        // Click to toggle strike-through (task completed)
        taskSpan.addEventListener("click", () => {
            taskSpan.classList.toggle("text-decoration-line-through");
            checkAllCompleted(); // Check if all tasks are done
        });

        // Create edit button with 📝 (pencil icon like VS Code)
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa fa-pencil"></i>'; 
        editButton.classList.add("btn", "btn-warning", "btn-sm", "me-2");

        // Create delete button with 🗑️ (trash bin like WhatsApp delete)
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; 
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");

        // Append elements correctly inside a single item
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        toDoContainer.appendChild(taskItem);

        // Clear input field after adding task
        inputField.value = "";

        // Edit functionality
        editButton.addEventListener("click", () => {
            if (editButton.innerHTML.includes("pencil")) {
                editButton.innerHTML = '<i class="fa fa-check"></i>'; // Change to ✔️ checkmark
                const editInput = document.createElement("input");
                editInput.type = "text";
                editInput.classList.add("form-control", "me-2");
                editInput.value = taskSpan.innerText;
                taskItem.replaceChild(editInput, taskSpan);
                editInput.focus();
            } else {
                editButton.innerHTML = '<i class="fa fa-pencil"></i>'; // Change back to pencil 📝
                const newText = taskItem.querySelector("input").value.trim();
                taskSpan.innerText = newText || taskText; // Prevent empty value
                taskItem.replaceChild(taskSpan, taskItem.querySelector("input"));
            }
        });

        // Delete task on button click
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
            checkAllCompleted(); // Check again after deletion
        });
    }

    function checkAllCompleted() {
        const allTasks = document.querySelectorAll(".task-text");
        const allCompleted = Array.from(allTasks).every(task => task.classList.contains("text-decoration-line-through"));

        if (allCompleted && allTasks.length > 0) {
            showFireworks(); // Show fireworks animation
        }
    }

    function showFireworks() {
        // Black screen with celebration text
        celebrationScreen.style.display = "flex";
        celebrationScreen.classList.add("show");
        
        // Fireworks Effect
        fireworksContainer.innerHTML = '<h1 class="you-did-it">🎇 YOU DID IT! 🎇</h1>';
        fireworksContainer.classList.add("show");

        // Hide effect after 4 seconds
        setTimeout(() => {
            celebrationScreen.style.display = "none";
            fireworksContainer.classList.remove("show");
        }, 1000);
    }
});
