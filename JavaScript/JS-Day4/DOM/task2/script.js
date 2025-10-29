'use script'

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clear");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task === "") return;

    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });

    list.appendChild(li);
    input.value = "";
    input.focus();
});

clearBtn.addEventListener("click", () => {
    list.innerHTML = "";
});
