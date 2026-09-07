
// Ambil elemen HTML
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const total = document.getElementById("total");
const selesai = document.getElementById("selesai");
const kosong = document.getElementById("kosong");

// Data tugas
let tugas = [];

// Tambah tugas
function tambahTugas() {
    const nama = taskInput.value.trim();

    if (nama === "") {
        alert("Masukkan tugas terlebih dahulu!");
        return;
    }

    tugas.push({
        nama: nama,
        selesai: false
    });

    taskInput.value = "";
    tampilkanTugas();
}

// Tampilkan tugas
function tampilkanTugas() {
    taskList.innerHTML = "";

    tugas.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "task";

        if (item.selesai) {
            li.classList.add("selesai");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.selesai;

        checkbox.onclick = () => {
            tugas[index].selesai = checkbox.checked;
            tampilkanTugas();
        };

        // Nama tugas
        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = item.nama;

        // Tombol edit
        const edit = document.createElement("button");
        edit.className = "edit";
        edit.textContent = "✏️";
        edit.onclick = () => editTugas(index);

        // Tombol hapus
        const hapus = document.createElement("button");
        hapus.className = "hapus";
        hapus.textContent = "🗑️";
        hapus.onclick = () => hapusTugas(index);

        // Masukkan ke li
        li.append(checkbox, text, edit, hapus);
        taskList.appendChild(li);
    });

    updateJumlah();
}

// Edit tugas
function editTugas(index) {
    const namaBaru = prompt("Masukkan tugas baru:", tugas[index].nama);

    if (namaBaru !== null && namaBaru.trim() !== "") {
        tugas[index].nama = namaBaru.trim();
        tampilkanTugas();
    }
}

// Hapus tugas
function hapusTugas(index) {
    if (confirm("Apakah kamu yakin ingin menghapus tugas ini?")) {
        tugas.splice(index, 1);
        tampilkanTugas();
    }
}

// Update jumlah tugas
function updateJumlah() {
    total.textContent = tugas.length;

    const jumlahSelesai = tugas.filter(item => item.selesai).length;
    selesai.textContent = jumlahSelesai;

    kosong.style.display = tugas.length === 0 ? "block" : "none";
}

// Tekan Enter untuk tambah tugas
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        tambahTugas();
    }
});

// Jalankan saat halaman dibuka
tampilkanTugas();

