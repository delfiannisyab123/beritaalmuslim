
const studio = document.getElementById("studio");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const resetBtn = document.getElementById("resetBtn");

// =========================
// FUNGSI UNGGAH GAMBAR
// =========================

function tampilkanGambar(inputId, gambarId, teksId) {
    const input = document.getElementById(inputId);
    const gambar = document.getElementById(gambarId);
    const teks = document.getElementById(teksId);

    input.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Silakan pilih file gambar yang valid.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            gambar.src = event.target.result;
            gambar.hidden = false;
            teks.hidden = true;
        };

        reader.onerror = function () {
            alert("Gambar gagal dibaca. Silakan coba lagi.");
        };

        reader.readAsDataURL(file);
    });
}

// Unggah logo
tampilkanGambar(
    "inputLogo",
    "logoPreview",
    "logoText"
);

// Unggah foto landscape
tampilkanGambar(
    "inputFoto",
    "fotoPreview",
    "fotoText"
);

// =========================
// FUNGSI FULLSCREEN
// =========================

fullscreenBtn.addEventListener("click", async function () {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else if (studio.requestFullscreen) {
            await studio.requestFullscreen();
        } else {
            alert("Browser ini tidak mendukung fullscreen.");
        }
    } catch (error) {
        console.error("Fullscreen gagal:", error);
        alert(
            "Fullscreen tidak berhasil dibuka. " +
            "Coba jalankan halaman melalui browser Chrome."
        );
    }
});

// Update tulisan tombol fullscreen
function updateFullscreenButton() {
    if (document.fullscreenElement === studio) {
        fullscreenBtn.innerHTML =
            "<span>⛶</span><strong>Keluar Fullscreen</strong>";
    } else {
        fullscreenBtn.innerHTML =
            "<span>⛶</span><strong>Fullscreen</strong>";
    }
}

document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
);

// =========================
// FUNGSI RESET
// =========================

resetBtn.addEventListener("click", function () {
    const konfirmasi = confirm(
        "Yakin ingin menghapus logo dan foto yang dipilih?"
    );

    if (!konfirmasi) return;

    const daftarGambar = [
        {
            input: "inputLogo",
            gambar: "logoPreview",
            teks: "logoText"
        },
        {
            input: "inputFoto",
            gambar: "fotoPreview",
            teks: "fotoText"
        }
    ];

    daftarGambar.forEach(function (item) {
        const input = document.getElementById(item.input);
        const gambar = document.getElementById(item.gambar);
        const teks = document.getElementById(item.teks);

        input.value = "";
        gambar.removeAttribute("src");
        gambar.hidden = true;
        teks.hidden = false;
    });
});
