// function addTask() {
//   const taskList = document.getElementById("task-list");

//   const task = document.createElement("div");
//   task.className = "grid grid-cols-4 px-4 py-2 border-b text-gray-700";
//   task.innerHTML = `
//     <div>Contoh Task</div>
//     <div>08/08/2025</div>
//     <div>10:00</div>
//     <div>Completed</div>
//   `;
//   taskList.appendChild(task);
// }

// document.addEventListener("click", function() {
//             const addButton = document.getElementById("addItem");
//             icon.addEventListener("click", function() {
//                 alert("Icon ditekan!");
//             });
//         });

document.getElementById("addItem").addEventListener("click", ()=> {
    alert("sdsdfsefseff")
})

document.getElementById("taskForm").addEventListener("submit", function(event) {
            event.preventDefault(); // mencegah reload halaman
            const nama = document.getElementById("taskTitle").value;
            alert("Halo, " + nama);
        });