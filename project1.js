document.addEventListener("DOMContentLoaded", () => {
    const taskbutton = document.getElementById("tasksubmit");
    const todolist = document.getElementById("todolist");
    const addtask = document.getElementById("addTask");

    let task = JSON.parse(localStorage.getItem("task")) || [];

    // Render all saved tasks
    task.forEach(t => rendertask(t));

    // Add new task
    taskbutton.addEventListener("click", function () {
        const textaddtask = addtask.value.trim();
        if (textaddtask === "") return;

        const newtask = {
            id: Date.now(),
            completed: false,
            tasktext: textaddtask
        };

        task.push(newtask);
        savetask();
        rendertask(newtask);
        addtask.value = "";
    });

    function rendertask(taskObj) {
      const li =document.createElement('li');
      li.setAttribute("data-id", taskObj.id);
      li.innerHTML =`<span>${taskObj.tasktext}</span> <button>Delete</button>`;
      li.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON") return;
        taskObj.completed = !taskObj.completed;
        savetask();
      });
        const deleteBtn = li.querySelector('button');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            task = task.filter(t => t.id !== taskObj.id);
            li.remove();
            savetask();
        });

    todolist.appendChild(li);

    }

    function savetask() {
        localStorage.setItem("task", JSON.stringify(task));
    }
});
