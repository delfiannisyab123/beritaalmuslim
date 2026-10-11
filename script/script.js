
const studio = document.getElementById("studio");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const resetBtn = document.getElementById("resetBtn");

// =========================
// FUNGSI UNGGAH GAMBAR
// =========================



function hubungkanUpload(inputId, gambarId) {
    const input = document.getElementById(inputId);
    const gambar = document.getElementById(gambarId);

    if (!input || !gambar) {
        console.error("Elemen tidak ditemukan:", inputId, gambarId);
        return;
    }

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

            // Sembunyikan teks petunjuk jika tersedia
            if (gambarId === "logoPreview") {
                const teks = document.getElementById("logoText");
                if (teks) teks.hidden = true;
            }

            if (gambarId === "fotoPreview") {
                const teks = document.getElementById("fotoText");
                if (teks) teks.hidden = true;
            }
        };

        reader.readAsDataURL(file);
    });
}

// Hubungkan setiap tombol dengan gambar masing-masing
hubungkanUpload("inputLogo", "logoPreview");
hubungkanUpload("inputFoto", "fotoPreview");


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
