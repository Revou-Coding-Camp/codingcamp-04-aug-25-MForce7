class Task {
    constructor(id, title, date, status) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = status;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
}

let datas = [];
let baris = 0;

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const searchInput = document.getElementById("searchTask"); // input search

// Elemen untuk ringkasan jumlah
const doneCount = document.getElementById("doneCount");
const ongoingCount = document.getElementById("ongoingCount");
const pendingCount = document.getElementById("pendingCount");
const totalCount = document.getElementById("totalCount");

let emptyTask = `
<tr class="h-10 bg-white">
    <td colspan="4" class="text-center text-gray-300">no tasks found ...</td>
</tr>
`;

taskList.innerHTML = emptyTask;

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    baris += 1;
    const task = document.getElementById("taskTitle").value;
    const date = document.getElementById("taskDate").value;
    const newTask = new Task(baris, task, date, "Pending");
    datas.push(newTask);
    renderTasks(datas);
    taskForm.reset();
});

// Event untuk search realtime
searchInput.addEventListener("input", function() {
    const keyword = searchInput.value.trim().toLowerCase();
    searchTasks(keyword);
});

// Render daftar task
function renderTasks(dataArray) {
    if (dataArray.length === 0) {
        taskList.innerHTML = emptyTask;
        updateSummary();
        return;
    }
    let taskRow = "";
    for (const data of dataArray) {
        taskRow += `
            <tr class="text-center">
                <td class="text-justify px-4 py-2">${data.title}</td>
                <td>${data.date}</td>
                <td>${data.status}</td>
                <td>
                    <button type="button" onclick="setStatus(${data.id}, 'Done')" class="bg-green-400 actionButton"><i class="fa-solid fa-check fa-md"></i></button>
                    <button type="button" onclick="setStatus(${data.id}, 'On-Going')" class="bg-yellow-400 actionButton"><i class="fa-solid fa-rotate fa-md"></i></button>
                    <button type="button" onclick="removeTask(${data.id})" class="bg-red-400 actionButton"><i class="fa-solid fa-trash fa-md"></i></button>
                </td>
            </tr>
        `;
    }
    taskList.innerHTML = taskRow;
    updateSummary();
}

// Fitur Search
function searchTasks(keyword) {
    if (keyword === "") {
        renderTasks(datas);
        return;
    }
    const filtered = datas.filter(task =>
        task.title.toLowerCase().includes(keyword)
    );
    renderTasks(filtered);
}

// Ubah status task
function setStatus(id, status) {
    const task = datas.find(t => t.id === id);
    if (task) {
        task.setStatus(status);
        renderTasks(datas);
    }
}

// Hapus task
function removeTask(id) {
    datas = datas.filter(t => t.id !== id);
    renderTasks(datas);
}

// Hitung jumlah status + update chart
function updateSummary() {
    const doneTask = datas.filter(t => t.status === "Done").length;
    const ongoingTask = datas.filter(t => t.status === "On-Going").length;
    const pendingTask = datas.filter(t => t.status === "Pending").length;

    doneCount.textContent = doneTask;
    ongoingCount.textContent = ongoingTask;
    pendingCount.textContent = pendingTask;
    totalCount.textContent = datas.length;

    updateCharts(doneTask, ongoingTask, pendingTask, datas.length);
}

// CHART 
let charts = [];
updateCharts(0, 0, 0, 0)
function updateCharts(doneTask, ongoingTask, pendingTask, total) {
    const chartDataList = [
        { value: total ? (doneTask / total) * 100 : 0 },      
        { value: total ? (ongoingTask / total) * 100 : 0 },   
        { value: total ? (pendingTask / total) * 100 : 0 },   
        { value: total ? ((doneTask / total) * 100) + (((ongoingTask / total) * 100) / 2) : 0 }
    ];

    const colorBar = [
        'rgba(34, 197, 94, 0.8)',
        'rgba(229, 231, 235, 0.8)'
    ];

    charts.forEach(chart => chart.destroy());
    charts = [];

    chartDataList.forEach((item, index) => {
        const ctx = document.getElementById(`chart-${index}`).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [item.value, 100 - item.value],
                    backgroundColor: colorBar,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
        charts.push(chart);
    });
}

const showForm = document.getElementById("addItem")
const form = document.getElementById("addForm")

showForm.addEventListener("click", () => {
    form.classList.toggle("show");
    // form.classList.toggle("hidden");
})

function normFormattedDate() {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                   "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const today = new Date();

    const namaHari = hari[today.getDay()];
    const tanggal = today.getDate();
    const namaBulan = bulan[today.getMonth()];
    const tahun = today.getFullYear();

    return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
}

const dateToday = document.getElementById("dayNow")
dateToday.textContent = normFormattedDate();
